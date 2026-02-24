import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, Mail, Lock, User, ArrowRight, KeyRound } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type AuthMode = "login" | "signup" | "otp-request" | "otp-verify";

export default function Login() {
  const [mode, setMode] = useState<AuthMode>("login");
  const [role, setRole] = useState<"patient" | "doctor" | "admin">("patient");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [otpToken, setOtpToken] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleEmailLogin = async (e: React.FormEvent) => {
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

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin,
        data: { full_name: fullName, role },
      },
    });
    setLoading(false);
    if (error) {
      toast({ title: "Signup failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Check your email", description: "We've sent a verification link to confirm your account." });
    }
  };

  const handleOtpRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ email });
    setLoading(false);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "OTP sent", description: "Check your email for a magic link or enter the OTP code." });
      setMode("otp-verify");
    }
  };

  const handleOtpVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.verifyOtp({ email, token: otpToken, type: "email" });
    setLoading(false);
    if (error) {
      toast({ title: "Invalid OTP", description: error.message, variant: "destructive" });
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left panel */}
      <div className="hidden w-1/2 bg-gradient-hero p-12 lg:flex lg:flex-col lg:justify-between">
        <Link to="/" className="flex items-center gap-2 font-heading text-xl font-bold text-primary-foreground">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-foreground/20">
            <Heart className="h-4 w-4 text-primary-foreground" />
          </div>
          HealthBook
        </Link>
        <div>
          <h2 className="mb-4 font-heading text-3xl font-bold text-primary-foreground">
            Your Health Story,<br />Always With You
          </h2>
          <p className="text-primary-foreground/70">
            Track. Understand. Prevent. Join thousands who have taken control of their health journey.
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

          {/* Mode tabs */}
          <div className="mb-6 flex rounded-lg border bg-muted/50 p-1">
            <button
              onClick={() => setMode("login")}
              className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                mode === "login" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground"
              }`}
            >
              Email Login
            </button>
            <button
              onClick={() => setMode("otp-request")}
              className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                mode === "otp-request" || mode === "otp-verify" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground"
              }`}
            >
              OTP Login
            </button>
            <button
              onClick={() => setMode("signup")}
              className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                mode === "signup" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground"
              }`}
            >
              Sign Up
            </button>
          </div>

          <h1 className="mb-2 font-heading text-2xl font-bold">
            {mode === "signup" ? "Create Your HealthBook" : mode === "otp-verify" ? "Enter OTP" : "Welcome Back"}
          </h1>
          <p className="mb-6 text-sm text-muted-foreground">
            {mode === "signup"
              ? "Start your health journey today"
              : mode === "otp-request"
              ? "We'll send a one-time code to your email"
              : mode === "otp-verify"
              ? `Enter the 6-digit code sent to ${email}`
              : "Log in to access your health timeline"}
          </p>

          {/* Signup form */}
          {mode === "signup" && (
            <form className="space-y-4" onSubmit={handleSignup}>
              <div className="mb-4">
                <Label className="mb-2 block text-sm font-medium">I am a</Label>
                <div className="flex gap-2">
                  {(["patient", "doctor", "admin"] as const).map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRole(r)}
                      className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium capitalize transition-colors ${
                        role === r ? "border-primary bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <Label htmlFor="name">Full Name</Label>
                <div className="relative mt-1">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="name" placeholder="Dr. Jane Smith" className="pl-10" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                </div>
              </div>
              <div>
                <Label htmlFor="s-email">Email</Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="s-email" type="email" placeholder="you@example.com" className="pl-10" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
              </div>
              <div>
                <Label htmlFor="s-password">Password</Label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="s-password" type="password" placeholder="••••••••" className="pl-10" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
              </div>
              <Button type="submit" className="w-full gap-2" disabled={loading}>
                {loading ? "Creating..." : "Create Account"} <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
          )}

          {/* Email login form */}
          {mode === "login" && (
            <form className="space-y-4" onSubmit={handleEmailLogin}>
              <div>
                <Label htmlFor="email">Email</Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="email" type="email" placeholder="you@example.com" className="pl-10" value={email} onChange={(e) => setEmail(e.target.value)} />
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
          )}

          {/* OTP request form */}
          {mode === "otp-request" && (
            <form className="space-y-4" onSubmit={handleOtpRequest}>
              <div>
                <Label htmlFor="otp-email">Email</Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="otp-email" type="email" placeholder="you@example.com" className="pl-10" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
              </div>
              <Button type="submit" className="w-full gap-2" disabled={loading}>
                {loading ? "Sending..." : "Send OTP"} <KeyRound className="h-4 w-4" />
              </Button>
            </form>
          )}

          {/* OTP verify form */}
          {mode === "otp-verify" && (
            <form className="space-y-4" onSubmit={handleOtpVerify}>
              <div>
                <Label htmlFor="otp-code">6-digit OTP Code</Label>
                <div className="relative mt-1">
                  <KeyRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="otp-code"
                    placeholder="123456"
                    className="pl-10 text-center tracking-widest text-lg"
                    maxLength={6}
                    value={otpToken}
                    onChange={(e) => setOtpToken(e.target.value.replace(/\D/g, ""))}
                  />
                </div>
              </div>
              <Button type="submit" className="w-full gap-2" disabled={loading}>
                {loading ? "Verifying..." : "Verify & Login"} <ArrowRight className="h-4 w-4" />
              </Button>
              <button type="button" onClick={() => setMode("otp-request")} className="w-full text-center text-sm text-muted-foreground hover:text-primary">
                Didn't receive? Send again
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}
