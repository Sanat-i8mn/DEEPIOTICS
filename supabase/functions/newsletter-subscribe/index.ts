import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.39.3";
import nodemailer from "npm:nodemailer@6.9.7";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const SMTP_CONFIG = {
  email: "av457508@gmail.com",
  password: "lwhnqwbvfrwlehwh",
  host: "smtp.gmail.com",
  port: 587,
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { email } = await req.json();

    if (!email) {
      return new Response(
        JSON.stringify({ error: "Email is required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const { data, error } = await supabaseClient
      .from("newsletter_subscribers")
      .insert([{ email }])
      .select();

    if (error) {
      console.error("Database error:", error);
      return new Response(
        JSON.stringify({ error: "Failed to subscribe" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    try {
      await sendEmail(email);
      console.log("Newsletter subscription email sent successfully");
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
    }

    return new Response(
      JSON.stringify({ success: true, data }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});

async function sendEmail(subscriberEmail: string) {
  const transporter = nodemailer.createTransport({
    host: SMTP_CONFIG.host,
    port: SMTP_CONFIG.port,
    secure: false,
    auth: {
      user: SMTP_CONFIG.email,
      pass: SMTP_CONFIG.password,
    },
  });

  const emailBody = `
New Newsletter Subscription

═══════════════════════════════════════

A new user has subscribed to your newsletter!

Email: ${subscriberEmail}

═══════════════════════════════════════

Subscribed at: ${new Date().toLocaleString()}
  `;

  const mailOptions = {
    from: SMTP_CONFIG.email,
    to: SMTP_CONFIG.email,
    subject: `New Newsletter Subscriber: ${subscriberEmail}`,
    text: emailBody,
  };

  await transporter.sendMail(mailOptions);
}
