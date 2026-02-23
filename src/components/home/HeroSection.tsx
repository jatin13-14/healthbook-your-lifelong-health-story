import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Brain, Users } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-timeline.png";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-subtle py-20 lg:py-28">
      {/* Decorative blobs */}
      <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />

      <div className="container relative">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-sm font-medium text-accent-foreground">
              <Shield className="h-3.5 w-3.5" />
              Your Health, Your Memory
            </div>
            <h1 className="mb-6 font-heading text-4xl font-extrabold leading-tight tracking-tight md:text-5xl lg:text-6xl">
              Your Lifelong{" "}
              <span className="text-gradient">Digital Health</span>{" "}
              Memory
            </h1>
            <p className="mb-8 max-w-lg text-lg text-muted-foreground">
              Track. Understand. Prevent. HealthBook keeps your complete medical timeline 
              accessible anywhere — so your health story is never lost.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/login">
                <Button size="lg" className="gap-2 shadow-soft">
                  Create Your HealthBook <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </Link>
            </div>

            <div className="mt-10 flex gap-6">
              {[
                { icon: Shield, label: "End-to-end encrypted" },
                { icon: Brain, label: "AI-powered insights" },
                { icon: Users, label: "Family accounts" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <item.icon className="h-4 w-4 text-primary" />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="overflow-hidden rounded-2xl border bg-card shadow-card">
              <img
                src={heroImage}
                alt="HealthBook timeline showing medical events like doctor visits, prescriptions, and vaccinations arranged chronologically"
                className="w-full object-cover"
                loading="eager"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 animate-float rounded-xl border bg-card p-3 shadow-card">
              <div className="flex items-center gap-2 text-sm font-medium">
                <div className="h-2.5 w-2.5 rounded-full bg-primary animate-pulse_glow" />
                Health Score: Excellent
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
