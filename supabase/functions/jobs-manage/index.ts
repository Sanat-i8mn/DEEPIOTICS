import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
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
      const includeInactive = url.searchParams.get("admin") === "true";
      
      let query = supabase
        .from("jobs")
        .select("*, job_applications(id)")
        .order("created_at", { ascending: false });

      if (!includeInactive) {
        query = query.eq("status", "active");
      }

      const { data: jobs, error } = await query;

      if (error) throw error;

      const jobsWithCount = jobs.map(job => ({
        ...job,
        applicant_count: job.job_applications?.length || 0,
        job_applications: undefined,
      }));

      return new Response(
        JSON.stringify(jobsWithCount),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    if (method === "POST") {
      const jobData = await req.json();

      const { data, error } = await supabase
        .from("jobs")
        .insert([{
          title: jobData.title,
          department: jobData.department,
          location: jobData.location,
          type: jobData.type,
          description: jobData.description,
          requirements: jobData.requirements,
          salary_range: jobData.salary_range || "",
          status: jobData.status || "active",
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
      const jobData = await req.json();
      const jobId = url.searchParams.get("id");

      if (!jobId) {
        return new Response(
          JSON.stringify({ error: "Job ID is required" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      const { data, error } = await supabase
        .from("jobs")
        .update({
          title: jobData.title,
          department: jobData.department,
          location: jobData.location,
          type: jobData.type,
          description: jobData.description,
          requirements: jobData.requirements,
          salary_range: jobData.salary_range || "",
          status: jobData.status,
          updated_at: new Date().toISOString(),
        })
        .eq("id", jobId)
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

    if (method === "DELETE") {
      const jobId = url.searchParams.get("id");

      if (!jobId) {
        return new Response(
          JSON.stringify({ error: "Job ID is required" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      const { error } = await supabase
        .from("jobs")
        .delete()
        .eq("id", jobId);

      if (error) throw error;

      return new Response(
        JSON.stringify({ success: true }),
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
    console.error("Jobs manage error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal server error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
