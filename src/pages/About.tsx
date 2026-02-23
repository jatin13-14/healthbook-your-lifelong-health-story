import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Target, AlertTriangle, Lightbulb, Globe, Heart, Clock } from "lucide-react";

const values = [
  { icon: Heart, title: "Patient First", desc: "Everything we build starts with the patient's wellbeing in mind." },
  { icon: Globe, title: "Accessible Anywhere", desc: "Your health records travel with you, across borders and providers." },
  { icon: Clock, title: "Lifelong Continuity", desc: "From birth to old age, your health story stays complete." },
];

export default function About() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-gradient-subtle py-20 lg:py-28">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mx-auto max-w-3xl text-center"
            >
              <h1 className="mb-6 font-heading text-4xl font-extrabold md:text-5xl">
                Healthcare Should Never{" "}
                <span className="text-gradient">Forget</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                We believe every patient deserves a complete, accessible health story —
                one that follows them through every doctor, every city, every stage of life.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Problem / Solution */}
        <section className="py-20">
          <div className="container grid gap-12 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-xl border bg-destructive/5 p-8"
            >
              <div className="mb-4 flex items-center gap-3">
                <AlertTriangle className="h-6 w-6 text-destructive" />
                <h2 className="font-heading text-2xl font-bold">The Problem</h2>
              </div>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>• Patients change doctors and cities — records get lost</li>
                <li>• Paper files deteriorate, digital records are scattered</li>
                <li>• Medicines get repeated, allergies are forgotten</li>
                <li>• No single source of truth for your health journey</li>
                <li>• Critical history is missing when it matters most</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-xl border bg-accent p-8"
            >
              <div className="mb-4 flex items-center gap-3">
                <Lightbulb className="h-6 w-6 text-primary" />
                <h2 className="font-heading text-2xl font-bold">The Solution</h2>
              </div>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>• One structured timeline for all your health events</li>
                <li>• Accessible from anywhere in the world</li>
                <li>• AI-powered insights to catch patterns early</li>
                <li>• Share with any doctor in seconds</li>
                <li>• Family accounts to care for loved ones</li>
              </ul>
            </motion.div>
          </div>
        </section>

        {/* Mission */}
        <section className="bg-gradient-subtle py-20">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mx-auto max-w-3xl text-center"
            >
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Target className="h-6 w-6" />
              </div>
              <h2 className="mb-4 font-heading text-3xl font-bold">Our Mission</h2>
              <p className="text-muted-foreground">
                To empower every individual with a complete, structured, and intelligent 
                health record that promotes prevention over treatment — making healthcare 
                truly continuous and patient-centered.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20">
          <div className="container">
            <h2 className="mb-12 text-center font-heading text-3xl font-bold">Our Values</h2>
            <div className="grid gap-8 md:grid-cols-3">
              {values.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-xl border bg-card p-8 text-center shadow-card"
                >
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-primary">
                    <v.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mb-2 font-heading text-lg font-bold">{v.title}</h3>
                  <p className="text-sm text-muted-foreground">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
