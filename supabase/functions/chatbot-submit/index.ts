import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.39.3";
import nodemailer from "npm:nodemailer@6.9.7";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface ChatbotUserData {
  name: string;
  email: string;
  phone: string;
}

const SMTP_CONFIG = {
  email: "av457508@gmail.com",
  password: "lwhnqwbvfrwlehwh",
  host: "smtp.gmail.com",
  port: 587,
};

const GOOGLE_SHEETS_URL = "https://script.google.com/macros/s/AKfycbx8XGivwZHI96UX1Gl07yxLHVyr2_kX38ofPIthQa5wDi6KR-kZkAIPvWudz_-WmiHE/exec";

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

    const userData: ChatbotUserData = await req.json();

    const { name, email, phone } = userData;

    if (!name || !email || !phone) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    try {
      const payload = {
        fullname: name,
        email: email,
        phone: phone,
      };

      console.log('Sending to Google Sheets with POST:', payload);
      
      const sheetsResponse = await fetch(GOOGLE_SHEETS_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        redirect: 'follow'
      });
      
      console.log('Google Sheets response status:', sheetsResponse.status);
      const responseText = await sheetsResponse.text();
      console.log('Google Sheets response:', responseText);
      
      if (sheetsResponse.ok) {
        console.log('Successfully saved to Google Sheets - Chatbot Leads');
      } else {
        console.error('Google Sheets returned error:', responseText);
      }
    } catch (sheetsError) {
      console.error("Google Sheets error:", sheetsError);
    }

    const { data, error } = await supabaseClient
      .from("chatbot_users")
      .insert([
        {
          name,
          email,
          phone,
        },
      ])
      .select();

    if (error) {
      console.error("Database error:", error);
      return new Response(
        JSON.stringify({ error: "Failed to save user data", details: error.message }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    try {
      await sendEmail({
        name,
        email,
        phone,
      });
      console.log("Chatbot user email sent successfully");
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
      JSON.stringify({ error: "Internal server error", details: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});

async function sendEmail(data: ChatbotUserData) {
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
New Chatbot User

════════════════════════════════════════

A new user has started a conversation with your AI chatbot!

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}

════════════════════════════════════════

Started at: ${new Date().toLocaleString()}
  `;

  const mailOptions = {
    from: SMTP_CONFIG.email,
    to: SMTP_CONFIG.email,
    subject: `New Chatbot User: ${data.name}`,
    text: emailBody,
  };

  await transporter.sendMail(mailOptions);
}
