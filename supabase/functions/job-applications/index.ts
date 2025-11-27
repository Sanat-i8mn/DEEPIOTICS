import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const url = new URL(req.url);
    const method = req.method;

    if (method === "GET") {
      const jobId = url.searchParams.get("job_id");

      if (!jobId) {
        return new Response(
          JSON.stringify({ error: "Job ID is required" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      const { data: applications, error } = await supabase
        .from("job_applications")
        .select("*, jobs(title)")
        .eq("job_id", jobId)
        .order("created_at", { ascending: false });

      if (error) throw error;

      return new Response(
        JSON.stringify(applications),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    if (method === "POST") {
      const applicationData = await req.json();

      const { data, error } = await supabase
        .from("job_applications")
        .insert([{
          job_id: applicationData.job_id,
          full_name: applicationData.full_name,
          email: applicationData.email,
          phone: applicationData.phone,
          resume_url: applicationData.resume_url || "",
          cover_letter: applicationData.cover_letter || "",
          linkedin_url: applicationData.linkedin_url || "",
          status: "new",
        }])
        .select()
        .single();

      if (error) throw error;

      return new Response(
        JSON.stringify(data),
        {
          status: 201,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    if (method === "PUT") {
      const { id, status } = await req.json();

      if (!id || !status) {
        return new Response(
          JSON.stringify({ error: "Application ID and status are required" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      const { data, error } = await supabase
        .from("job_applications")
        .update({ status })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;

      return new Response(
        JSON.stringify(data),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      {
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Job applications error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal server error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
