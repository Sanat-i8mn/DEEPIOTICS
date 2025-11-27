import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.39.3";
import nodemailer from "npm:nodemailer@6.9.7";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface ContactFormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  subject: string;
  message: string;
}

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

    const formData: ContactFormData = await req.json();

    const { name, email, company, phone, subject, message } = formData;

    if (!name || !email || !subject || !message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const { data, error } = await supabaseClient
      .from("contact_submissions")
      .insert([
        {
          name,
          email,
          company_name: company,
          phone,
          subject,
          message,
        },
      ])
      .select();

    if (error) {
      console.error("Database error:", error);
      return new Response(
        JSON.stringify({ error: "Failed to save submission", details: error.message }),
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
        company,
        phone,
        subject,
        message,
      });
      console.log("Email sent successfully");
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
    }

    try {
      await sendToGoogleSheets({
        name,
        email,
        company,
        phone,
        subject,
        message,
      });
      console.log("Data sent to Google Sheets successfully");
    } catch (sheetsError) {
      console.error("Google Sheets submission failed:", sheetsError);
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

async function sendEmail(data: ContactFormData) {
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
New Contact Form Submission

═══════════════════════════════════════

Name: ${data.name}
Email: ${data.email}
Company: ${data.company || "Not specified"}
Phone: ${data.phone || "Not specified"}
Subject: ${data.subject}

Message:
${data.message}

═══════════════════════════════════════

Submitted at: ${new Date().toLocaleString()}
  `;

  const mailOptions = {
    from: SMTP_CONFIG.email,
    to: SMTP_CONFIG.email,
    subject: `New Contact Form Submission from ${data.name}`,
    text: emailBody,
  };

  await transporter.sendMail(mailOptions);
}

async function sendToGoogleSheets(data: ContactFormData) {
  const GOOGLE_SHEETS_URL = "https://script.google.com/macros/s/AKfycbwF64LxEQZ7qdsb-DxeGfR3MVPqEoowpXU5ZcVjAKwWX2ja2zTCvT2qoxKx2QM2NC4/exec";

  const payload = {
    fullname: data.name,
    email: data.email,
    company: data.company,
    phone: data.phone,
    subject: data.subject,
    message: data.message,
  };

  const response = await fetch(GOOGLE_SHEETS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Google Sheets API returned ${response.status}`);
  }

  return await response.json();
}
