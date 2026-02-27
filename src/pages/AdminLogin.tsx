import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, Mail, Lock, ArrowRight, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      toast({ title: "Login failed", description: error.message, variant: "destructive" });
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left panel */}
      <div className="hidden w-1/2 bg-gradient-to-br from-muted-foreground to-secondary p-12 lg:flex lg:flex-col lg:justify-between">
        <Link to="/" className="flex items-center gap-2 font-heading text-xl font-bold text-primary-foreground">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-foreground/20">
            <Heart className="h-4 w-4 text-primary-foreground" />
          </div>
          HealthBook
        </Link>
        <div>
          <div className="mb-4 flex items-center gap-3">
            <ShieldCheck className="h-10 w-10 text-primary-foreground/80" />
            <h2 className="font-heading text-3xl font-bold text-primary-foreground">Admin Portal</h2>
          </div>
          <p className="text-primary-foreground/70">
            Manage platform operations, verify content, and oversee user activity.
          </p>
        </div>
        <p className="text-sm text-primary-foreground/50">© {new Date().getFullYear()} HealthBook</p>
      </div>

      {/* Right panel */}
      <div className="flex flex-1 items-center justify-center p-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <Link to="/" className="mb-8 flex items-center gap-2 font-heading text-xl font-bold lg:hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-hero">
              <Heart className="h-4 w-4 text-primary-foreground" />
            </div>
            HealthBook
          </Link>

          <div className="mb-2 flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Admin Login</span>
          </div>
          <h1 className="mb-2 font-heading text-2xl font-bold">Admin Access</h1>
          <p className="mb-6 text-sm text-muted-foreground">
            Sign in with your admin credentials to manage the platform.
          </p>

          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <Label htmlFor="email">Email</Label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="email" type="email" placeholder="admin@gmail.com" className="pl-10" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="password" type="password" placeholder="••••••••" className="pl-10" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
            </div>
            <Button type="submit" className="w-full gap-2" disabled={loading}>
              {loading ? "Logging in..." : "Log In"} <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Are you a patient?{" "}
            <Link to="/login" className="text-primary hover:underline">Patient Login</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
