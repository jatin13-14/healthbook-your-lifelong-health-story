import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, Mail, Lock, User, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [role, setRole] = useState<"patient" | "doctor" | "admin">("patient");

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
        <p className="text-sm text-primary-foreground/50">
          © {new Date().getFullYear()} HealthBook
        </p>
      </div>

      {/* Right panel */}
      <div className="flex flex-1 items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <Link to="/" className="mb-8 flex items-center gap-2 font-heading text-xl font-bold lg:hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-hero">
              <Heart className="h-4 w-4 text-primary-foreground" />
            </div>
            HealthBook
          </Link>

          <h1 className="mb-2 font-heading text-2xl font-bold">
            {isSignUp ? "Create Your HealthBook" : "Welcome Back"}
          </h1>
          <p className="mb-8 text-sm text-muted-foreground">
            {isSignUp ? "Start your health journey today" : "Log in to access your health timeline"}
          </p>

          {isSignUp && (
            <div className="mb-6">
              <Label className="mb-2 block text-sm font-medium">I am a</Label>
              <div className="flex gap-2">
                {(["patient", "doctor", "admin"] as const).map((r) => (
                  <button
                    key={r}
                    onClick={() => setRole(r)}
                    className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium capitalize transition-colors ${
                      role === r
                        ? "border-primary bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
          )}

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            {isSignUp && (
              <div>
                <Label htmlFor="name">Full Name</Label>
                <div className="relative mt-1">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="name" placeholder="Dr. Jane Smith" className="pl-10" />
                </div>
              </div>
            )}
            <div>
              <Label htmlFor="email">Email</Label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="email" type="email" placeholder="you@example.com" className="pl-10" />
              </div>
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="password" type="password" placeholder="••••••••" className="pl-10" />
              </div>
            </div>
            <Button type="submit" className="w-full gap-2">
              {isSignUp ? "Create Account" : "Log In"} <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="font-medium text-primary hover:underline"
            >
              {isSignUp ? "Log in" : "Sign up"}
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
