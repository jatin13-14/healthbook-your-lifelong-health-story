import { motion } from "framer-motion";
import {
  FileText, Brain, BookOpen, Users, QrCode, Bell,
  Activity, ShieldCheck
} from "lucide-react";

const features = [
  { icon: FileText, title: "Complete Health Records", desc: "Doctor visits, prescriptions, lab reports, surgeries — all in one timeline." },
  { icon: Brain, title: "AI Health Insights", desc: "Get intelligent summaries and risk alerts based on your health patterns." },
  { icon: BookOpen, title: "Health Awareness", desc: "Verified articles, seasonal alerts, and preventive care education." },
  { icon: Users, title: "Family Health Hub", desc: "Manage health records for parents, children, and loved ones." },
  { icon: QrCode, title: "Emergency QR Profile", desc: "Instant access to critical health info during emergencies." },
  { icon: Bell, title: "Smart Reminders", desc: "Never miss medicines, vaccinations, or follow-up appointments." },
  { icon: Activity, title: "Vitals Tracking", desc: "Monitor BP, blood sugar, weight, and more over time." },
  { icon: ShieldCheck, title: "Privacy First", desc: "HIPAA-compliant, end-to-end encrypted, you own your data." },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function FeaturesSection() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="mb-4 font-heading text-3xl font-bold md:text-4xl">
            Everything Your Health Needs
          </h2>
          <p className="text-muted-foreground">
            A complete platform to track, understand, and prevent — built around you.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={item}
              className="group rounded-xl border bg-gradient-card p-6 transition-all hover:shadow-card"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-accent text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mb-2 font-heading text-base font-semibold">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
