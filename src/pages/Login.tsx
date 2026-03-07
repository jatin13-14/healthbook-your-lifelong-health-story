import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, Mail, Lock, User, ArrowRight, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { createPatientAccount, login, setAuthToken, type ApiError } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";

type AuthMode = "signup" | "signin";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 6;

function validateSignup(
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  contact: string
): string | null {
  if (!email.trim()) return "Email is required.";
  if (!EMAIL_REGEX.test(email.trim())) return "Enter a valid email address.";
  if (!password) return "Password is required.";
  if (password.length < MIN_PASSWORD_LENGTH) return `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`;
  if (!firstName.trim() && !lastName.trim()) return "First name or last name is required.";
  if (!contact.trim()) return "Contact is required.";
  return null;
}

export default function Login() {
  const [mode, setMode] = useState<AuthMode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, loading: authLoading, setUserFromLogin } = useAuth();

  // If already logged in, redirect to dashboard
  useEffect(() => {
    if (!authLoading && user) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, authLoading, navigate]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateSignup(email, password, firstName, lastName, contact);
    if (validationError) {
      toast({ title: "Validation failed", description: validationError, variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      await createPatientAccount({
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        contact: contact.trim(),
        email: email.trim(),
        password,
      });
      const result = await login(email.trim(), password);
      setAuthToken(result.token);
      setUserFromLogin(result);
      navigate("/dashboard", { replace: true });
    } catch (err: unknown) {
      const body = (err as { body?: ApiError }).body;
      const errDetail = body?.detail || (body?.errors ? JSON.stringify(body.errors) : undefined) || (err instanceof Error ? err.message : "Something went wrong.");
      toast({ title: "Sign up failed", description: errDetail, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    if (!trimmedEmail || !password) {
      toast({ title: "Required", description: "Enter email and password.", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const result = await login(trimmedEmail, password);
      setAuthToken(result.token);
      setUserFromLogin(result);
      navigate("/dashboard", { replace: true });
    } catch (err: unknown) {
      const body = (err as { body?: ApiError }).body;
      const errDetail = body?.detail || (err instanceof Error ? err.message : "Invalid email or password.");
      toast({ title: "Sign in failed", description: errDetail, variant: "destructive" });
    } finally {
      setLoading(false);
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
              onClick={() => setMode("signin")}
              className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                mode === "signin" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground"
              }`}
            >
              Sign In
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
            {mode === "signup" ? "Create Your HealthBook" : "Welcome Back"}
          </h1>
          <p className="mb-6 text-sm text-muted-foreground">
            {mode === "signup" ? "Start your health journey today" : "Sign in to access your health timeline"}
          </p>

          {/* Signup form */}
          {mode === "signup" && (
            <form className="space-y-4" onSubmit={handleSignup}>
              <div>
                <Label htmlFor="first-name">First Name</Label>
                <div className="relative mt-1">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="first-name" placeholder="Jane" className="pl-10" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </div>
              </div>
              <div>
                <Label htmlFor="last-name">Last Name</Label>
                <div className="relative mt-1">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="last-name" placeholder="Smith" className="pl-10" value={lastName} onChange={(e) => setLastName(e.target.value)} />
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
                <Label htmlFor="contact">Contact</Label>
                <div className="relative mt-1">
                  <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="contact" type="tel" placeholder="+1 234 567 8900" className="pl-10" value={contact} onChange={(e) => setContact(e.target.value)} />
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

          {/* Sign In form */}
          {mode === "signin" && (
            <form className="space-y-4" onSubmit={handleSignIn}>
              <div>
                <Label htmlFor="signin-email">Email</Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="signin-email" type="email" placeholder="you@example.com" className="pl-10" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
              </div>
              <div>
                <Label htmlFor="signin-password">Password</Label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="signin-password" type="password" placeholder="••••••••" className="pl-10" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
              </div>
              <Button type="submit" className="w-full gap-2" disabled={loading}>
                {loading ? "Signing in..." : "Sign In"} <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
          )}

          <div className="mt-6 flex justify-center gap-4 text-sm text-muted-foreground">
            <Link to="/doctor-login" className="hover:text-primary hover:underline">Doctor Login</Link>
            <span>•</span>
            <Link to="/admin-login" className="hover:text-primary hover:underline">Admin Login</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
