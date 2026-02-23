import { motion } from "framer-motion";
import { UserPlus, Upload, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    step: "01",
    title: "Create Your HealthBook",
    desc: "Sign up and set up your health profile with basic details, allergies, and emergency contacts.",
  },
  {
    icon: Upload,
    step: "02",
    title: "Add Your Records",
    desc: "Upload past reports, log doctor visits, medications, vaccinations, and more — building your health timeline.",
  },
  {
    icon: TrendingUp,
    step: "03",
    title: "Track & Prevent",
    desc: "Get AI insights, risk alerts, and health summaries. Stay ahead of potential health issues.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-gradient-subtle py-20 lg:py-28">
      <div className="container">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="mb-4 font-heading text-3xl font-bold md:text-4xl">
            How It Works
          </h2>
          <p className="text-muted-foreground">
            Getting started takes just minutes. Your health memory lasts a lifetime.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="relative rounded-xl border bg-card p-8 text-center shadow-card"
            >
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <s.icon className="h-6 w-6" />
              </div>
              <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-primary">
                Step {s.step}
              </span>
              <h3 className="mb-2 font-heading text-lg font-bold">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
