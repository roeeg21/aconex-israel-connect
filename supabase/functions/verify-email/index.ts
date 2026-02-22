import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const token = url.searchParams.get("token");

    if (!token) {
      return new Response(
        JSON.stringify({ error: "Missing verification token." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Find demo request by token
    const { data: request, error: findError } = await supabase
      .from("demo_requests")
      .select("*")
      .eq("verification_token", token)
      .single();

    if (findError || !request) {
      return new Response(
        JSON.stringify({ error: "Invalid or expired verification token." }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Check if already verified
    if (request.email_verified) {
      return new Response(
        JSON.stringify({ message: "Email already verified." }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Check 48-hour expiry
    const submissionDate = new Date(request.submission_date);
    const now = new Date();
    const hoursDiff = (now.getTime() - submissionDate.getTime()) / (1000 * 60 * 60);

    if (hoursDiff > 48) {
      return new Response(
        JSON.stringify({ error: "Verification token has expired (48-hour limit)." }),
        { status: 410, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Mark as verified
    const { error: updateError } = await supabase
      .from("demo_requests")
      .update({
        email_verified: true,
        verification_date: new Date().toISOString(),
      })
      .eq("id", request.id);

    if (updateError) {
      console.error("Update error:", updateError);
      return new Response(
        JSON.stringify({ error: "Failed to verify email." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // TODO: Send admin notification email when Resend is configured

    return new Response(
      JSON.stringify({ success: true, message: "Email verified successfully." }),
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
