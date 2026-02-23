import { motion } from "framer-motion";
import { Heart, Stethoscope, CheckCircle } from "lucide-react";

const patientBenefits = [
  "Never lose a medical report again",
  "See your complete health story in one view",
  "Get AI-powered risk alerts",
  "Share records securely with any doctor",
  "Family health management",
  "Emergency QR access card",
];

const doctorBenefits = [
  "Instant access to patient history",
  "Better-informed diagnoses",
  "Track treatment outcomes over time",
  "Write prescriptions digitally",
  "Contribute awareness content",
  "Reduce redundant tests",
];

export default function BenefitsSection() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="mb-4 font-heading text-3xl font-bold md:text-4xl">
            Built for Patients & Doctors
          </h2>
          <p className="text-muted-foreground">
            Prevention starts with a complete picture. HealthBook benefits everyone in the care circle.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-xl border bg-gradient-card p-8 shadow-card"
          >
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Heart className="h-5 w-5" />
              </div>
              <h3 className="font-heading text-xl font-bold">For Patients</h3>
            </div>
            <ul className="space-y-3">
              {patientBenefits.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span className="text-muted-foreground">{b}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-xl border bg-gradient-card p-8 shadow-card"
          >
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Stethoscope className="h-5 w-5" />
              </div>
              <h3 className="font-heading text-xl font-bold">For Doctors</h3>
            </div>
            <ul className="space-y-3">
              {doctorBenefits.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span className="text-muted-foreground">{b}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
