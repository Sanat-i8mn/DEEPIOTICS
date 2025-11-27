import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface LoginRequest {
  email: string;
  password: string;
}

const HARDCODED_ADMIN_EMAIL = "av457508@gmail.com";
const HARDCODED_ADMIN_PASSWORD = "1234";
const HARDCODED_SESSION_SECRET = "replace_with_a_long_random_secret_for_production_use_at_least_32_characters";

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimitMap.get(ip);

  if (!limit || now > limit.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 60000 });
    return true;
  }

  if (limit.count >= 5) {
    return false;
  }

  limit.count++;
  return true;
}

async function generateToken(email: string): Promise<string> {
  const secret = Deno.env.get("SESSION_SECRET") || HARDCODED_SESSION_SECRET;
  const payload = JSON.stringify({
    email,
    exp: Date.now() + 24 * 60 * 60 * 1000,
  });
  
  const encoder = new TextEncoder();
  const keyData = encoder.encode(secret);
  const key = await crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  
  const signatureBuffer = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(payload)
  );
  
  const signatureArray = Array.from(new Uint8Array(signatureBuffer));
  const signature = btoa(String.fromCharCode(...signatureArray));
  
  const tokenData = JSON.stringify({ payload, signature });
  return btoa(tokenData);
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const clientIp = req.headers.get("x-forwarded-for") || req.headers.get("cf-connecting-ip") || "unknown";

    if (!checkRateLimit(clientIp)) {
      return new Response(
        JSON.stringify({ error: "Too many login attempts. Please try again later." }),
        {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const { email, password }: LoginRequest = await req.json();

    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: "Email and password are required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const adminEmail = Deno.env.get("ADMIN_EMAIL") || HARDCODED_ADMIN_EMAIL;
    const adminPassword = Deno.env.get("ADMIN_PASSWORD") || HARDCODED_ADMIN_PASSWORD;

    if (email === adminEmail && password === adminPassword) {
      const token = await generateToken(email);

      return new Response(
        JSON.stringify({
          success: true,
          token,
          message: "Login successful",
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    } else {
      return new Response(
        JSON.stringify({ error: "Invalid email or password" }),
        {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }
  } catch (error) {
    console.error("Login error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
