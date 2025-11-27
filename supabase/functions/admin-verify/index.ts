import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface VerifyRequest {
  token: string;
}

interface TokenPayload {
  email: string;
  exp: number;
}

const HARDCODED_SESSION_SECRET = "replace_with_a_long_random_secret_for_production_use_at_least_32_characters";

async function verifyToken(token: string): Promise<{ valid: boolean; email?: string }> {
  try {
    const secret = Deno.env.get("SESSION_SECRET") || HARDCODED_SESSION_SECRET;
    const decoded = JSON.parse(atob(token));
    const { payload, signature } = decoded;

    const encoder = new TextEncoder();
    const keyData = encoder.encode(secret);
    const key = await crypto.subtle.importKey(
      "raw",
      keyData,
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );
    
    const signatureBytes = Uint8Array.from(atob(signature), c => c.charCodeAt(0));
    
    const isValid = await crypto.subtle.verify(
      "HMAC",
      key,
      signatureBytes,
      encoder.encode(payload)
    );

    if (!isValid) {
      return { valid: false };
    }

    const payloadData: TokenPayload = JSON.parse(payload);

    if (Date.now() > payloadData.exp) {
      return { valid: false };
    }

    return { valid: true, email: payloadData.email };
  } catch (error) {
    console.error("Token verification error:", error);
    return { valid: false };
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { token }: VerifyRequest = await req.json();

    if (!token) {
      return new Response(
        JSON.stringify({ valid: false, error: "Token is required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const result = await verifyToken(token);

    if (result.valid) {
      return new Response(
        JSON.stringify({
          valid: true,
          email: result.email,
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    } else {
      return new Response(
        JSON.stringify({ valid: false, error: "Invalid or expired token" }),
        {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }
  } catch (error) {
    console.error("Verify error:", error);
    return new Response(
      JSON.stringify({ valid: false, error: "Internal server error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
