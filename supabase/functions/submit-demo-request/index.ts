import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const FREE_MAIL_DOMAINS = [
  "gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "aol.com",
  "icloud.com", "mail.com", "protonmail.com", "yandex.com", "live.com",
  "msn.com", "zoho.com", "gmx.com", "fastmail.com",
];

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const body = await req.json();
    const { fullName, organization, email, phone, role, projectSize, notes } = body;

    // Validate required fields
    if (!fullName || !organization || !email) {
      return new Response(
        JSON.stringify({ error: "Full name, organization, and email are required." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email format." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Check corporate email
    const domain = email.split("@")[1]?.toLowerCase();
    if (!domain || FREE_MAIL_DOMAINS.includes(domain)) {
      return new Response(
        JSON.stringify({ error: "Corporate email required. Free email providers are not accepted." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Input length validation
    if (fullName.length > 200 || organization.length > 200 || email.length > 255) {
      return new Response(
        JSON.stringify({ error: "Input exceeds maximum length." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Generate verification token
    const verificationToken = crypto.randomUUID();

    // Get IP and user agent
    const ipAddress = req.headers.get("x-forwarded-for") || req.headers.get("cf-connecting-ip") || "unknown";
    const userAgent = req.headers.get("user-agent") || "unknown";

    const { data, error } = await supabase.from("demo_requests").insert({
      full_name: fullName.trim().slice(0, 200),
      organization: organization.trim().slice(0, 200),
      email: email.trim().toLowerCase().slice(0, 255),
      phone: phone?.trim().slice(0, 50) || null,
      role: role?.trim().slice(0, 100) || null,
      project_size: projectSize?.trim().slice(0, 100) || null,
      notes: notes?.trim().slice(0, 2000) || null,
      verification_token: verificationToken,
      ip_address: ipAddress,
      user_agent: userAgent,
    }).select("id").single();

    if (error) {
      console.error("DB insert error:", error);
      return new Response(
        JSON.stringify({ error: "Failed to submit request." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // TODO: Send verification email via Resend when configured
    // For now, auto-verify for development
    console.log(`Demo request ${data.id} created with verification token: ${verificationToken}`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Demo request submitted successfully.",
        requestId: data.id,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
