import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function CTASection() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-hero p-12 text-center text-primary-foreground md:p-16"
        >
          <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-primary-foreground/10 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-primary-foreground/10 blur-3xl" />

          <div className="relative">
            <h2 className="mb-4 font-heading text-3xl font-bold md:text-4xl">
              Start Your Health Journey Today
            </h2>
            <p className="mx-auto mb-8 max-w-lg text-primary-foreground/80">
              Join thousands who are taking control of their health story.
              Your first HealthBook is free forever.
            </p>
            <Link to="/login">
              <Button
                size="lg"
                variant="secondary"
                className="gap-2 font-semibold shadow-soft"
              >
                Create Free HealthBook <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
