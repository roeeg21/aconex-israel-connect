import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Lock, UserPlus } from "lucide-react";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSetup, setIsSetup] = useState(false);
  const [checkingAdmin, setCheckingAdmin] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if already logged in as admin
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data: roles } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", session.user.id)
          .eq("role", "admin");
        if (roles && roles.length > 0) {
          navigate("/admin/dashboard");
          return;
        }
      }
      setCheckingAdmin(false);
    };
    checkSession();
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;

      // Check admin role
      const { data: roles, error: roleError } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", data.user.id)
        .eq("role", "admin");

      if (roleError || !roles || roles.length === 0) {
        await supabase.auth.signOut();
        toast({ title: "Access Denied", description: "You do not have admin privileges.", variant: "destructive" });
        return;
      }

      navigate("/admin/dashboard");
    } catch (err: any) {
      toast({ title: "Login Failed", description: err.message || "Invalid credentials.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("admin-setup", {
        body: { email, password },
      });

      if (error) throw error;
      if (data?.error) {
        toast({ title: "Setup Failed", description: data.error, variant: "destructive" });
        return;
      }

      toast({ title: "Admin Created", description: "Admin account created. Logging in..." });

      // Auto login
      const { error: loginError } = await supabase.auth.signInWithPassword({ email, password });
      if (loginError) throw loginError;

      navigate("/admin/dashboard");
    } catch (err: any) {
      toast({ title: "Setup Failed", description: err.message || "Failed to create admin.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  if (checkingAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <meta name="robots" content="noindex, nofollow" />
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="w-full max-w-sm">
          <div className="bg-card rounded-xl p-8 border border-border shadow-lg space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Lock size={24} className="text-primary" />
              </div>
              <h1 className="text-xl font-display font-bold text-foreground">
                {isSetup ? "Admin Setup" : "Admin Portal"}
              </h1>
              <p className="text-sm text-muted-foreground">
                {isSetup ? "Create the first admin account" : "Sign in to manage demo requests"}
              </p>
            </div>

            <form onSubmit={isSetup ? handleSetup : handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@megatec.co.il"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </div>
              <Button type="submit" disabled={loading} className="w-full bg-primary text-primary-foreground">
                {loading ? "Please wait..." : isSetup ? (
                  <><UserPlus size={16} className="mr-2" /> Create Admin</>
                ) : (
                  <><Lock size={16} className="mr-2" /> Sign In</>
                )}
              </Button>
            </form>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsSetup(!isSetup)}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                {isSetup ? "Already have an account? Sign in" : "First time? Set up admin account"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
