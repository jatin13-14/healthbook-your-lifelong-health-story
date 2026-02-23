import { motion } from "framer-motion";
import { Lock, Server, Eye, Fingerprint } from "lucide-react";

const points = [
  { icon: Lock, title: "End-to-End Encryption", desc: "Your health data is encrypted at rest and in transit." },
  { icon: Server, title: "HIPAA Compliant", desc: "Meets the highest healthcare data protection standards." },
  { icon: Eye, title: "You Control Access", desc: "Choose exactly who can see your records and for how long." },
  { icon: Fingerprint, title: "Biometric Auth", desc: "Secure login with fingerprint or face recognition." },
];

export default function SecuritySection() {
  return (
    <section className="bg-gradient-subtle py-20 lg:py-28">
      <div className="container">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="mb-4 font-heading text-3xl font-bold md:text-4xl">
            Your Data, Fully Protected
          </h2>
          <p className="text-muted-foreground">
            We take security seriously. Your health records are protected by enterprise-grade security.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {points.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="rounded-xl border bg-card p-6 text-center shadow-card"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-primary">
                <p.icon className="h-5 w-5" />
              </div>
              <h3 className="mb-2 font-heading text-sm font-bold">{p.title}</h3>
              <p className="text-xs text-muted-foreground">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
