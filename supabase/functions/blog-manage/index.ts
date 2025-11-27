import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const HARDCODED_SESSION_SECRET = "replace_with_a_long_random_secret_for_production_use_at_least_32_characters";

interface BlogPost {
  title: string;
  slug: string;
  featured_image?: string;
  short_description: string;
  content: string;
  author_name: string;
  published_date: string;
  is_published: boolean;
}

interface TokenPayload {
  email: string;
  exp: number;
}

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
    const url = new URL(req.url);
    const path = url.pathname.split('/').filter(Boolean);
    const authHeader = req.headers.get('Authorization');

    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Missing authorization header' }),
        {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const token = authHeader.replace('Bearer ', '');
    const verification = await verifyToken(token);
    
    if (!verification.valid) {
      return new Response(
        JSON.stringify({ error: 'Invalid or expired token' }),
        {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    const lastSegment = path[path.length - 1];

    if (lastSegment === 'all' && req.method === 'GET') {
      const response = await fetch(
        `${supabaseUrl}/rest/v1/blog_posts?select=*&order=created_at.desc`,
        {
          headers: {
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`,
          },
        }
      );

      const posts = await response.json();

      return new Response(
        JSON.stringify({ posts }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    if (lastSegment === 'create' && req.method === 'POST') {
      const body: BlogPost = await req.json();

      const response = await fetch(
        `${supabaseUrl}/rest/v1/blog_posts`,
        {
          method: 'POST',
          headers: {
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=representation',
          },
          body: JSON.stringify({
            title: body.title,
            slug: body.slug,
            featured_image: body.featured_image || null,
            short_description: body.short_description,
            content: body.content,
            author_name: body.author_name,
            published_date: body.published_date,
            is_published: body.is_published,
          }),
        }
      );

      if (!response.ok) {
        const error = await response.text();
        return new Response(
          JSON.stringify({ error: 'Failed to create post', details: error }),
          {
            status: response.status,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      const post = await response.json();

      return new Response(
        JSON.stringify({ post }),
        {
          status: 201,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    if (path.includes('update') && req.method === 'PUT') {
      const postId = path[path.length - 1];
      const body: BlogPost = await req.json();

      const response = await fetch(
        `${supabaseUrl}/rest/v1/blog_posts?id=eq.${postId}`,
        {
          method: 'PATCH',
          headers: {
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=representation',
          },
          body: JSON.stringify({
            title: body.title,
            slug: body.slug,
            featured_image: body.featured_image || null,
            short_description: body.short_description,
            content: body.content,
            author_name: body.author_name,
            published_date: body.published_date,
            is_published: body.is_published,
            updated_at: new Date().toISOString(),
          }),
        }
      );

      if (!response.ok) {
        const error = await response.text();
        return new Response(
          JSON.stringify({ error: 'Failed to update post', details: error }),
          {
            status: response.status,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      const post = await response.json();

      return new Response(
        JSON.stringify({ post }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    if (path.includes('delete') && req.method === 'DELETE') {
      const postId = path[path.length - 1];

      const response = await fetch(
        `${supabaseUrl}/rest/v1/blog_posts?id=eq.${postId}`,
        {
          method: 'DELETE',
          headers: {
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`,
          },
        }
      );

      if (!response.ok) {
        const error = await response.text();
        return new Response(
          JSON.stringify({ error: 'Failed to delete post', details: error }),
          {
            status: response.status,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      return new Response(
        JSON.stringify({ success: true }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Not found' }),
      {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});