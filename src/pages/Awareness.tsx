import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  Sun, Thermometer, Heart, Brain, ShieldCheck, AlertCircle,
  BookOpen, Video, Newspaper
} from "lucide-react";


const articles = [
  {
    type: "article",
    icon: Sun,
    category: "Daily Tips",
    title: "5 Morning Habits That Improve Heart Health",
    desc: "Simple changes to your morning routine that can significantly reduce cardiovascular risk over time.",
    tag: "Heart Health",
    readTime: "4 min read",
  },
  {
    type: "video",
    icon: Thermometer,
    category: "Seasonal Alerts",
    title: "Monsoon Season: Diseases to Watch For",
    desc: "Dengue, malaria, and waterborne diseases peak during monsoon. Here's how to protect your family.",
    tag: "Seasonal",
    readTime: "Video · 6 min",
  },
  {
    type: "article",
    icon: Heart,
    category: "Prevention",
    title: "Understanding Your Blood Pressure Numbers",
    desc: "Learn what systolic and diastolic readings mean and when to be concerned.",
    tag: "Vitals",
    readTime: "3 min read",
  },
  {
    type: "article",
    icon: Brain,
    category: "AI Insights",
    title: "How AI Detects Early Signs of Diabetes",
    desc: "HealthBook's AI analyzes your vitals over time to flag pre-diabetic patterns before symptoms appear.",
    tag: "AI Health",
    readTime: "5 min read",
  },
  {
    type: "article",
    icon: AlertCircle,
    category: "Emergency",
    title: "CPR: A Step-by-Step Guide That Saves Lives",
    desc: "Learn the correct technique for performing CPR on adults and children in emergency situations.",
    tag: "Emergency",
    readTime: "3 min read",
  },
  {
    type: "article",
    icon: ShieldCheck,
    category: "Government Schemes",
    title: "Ayushman Bharat: Are You Eligible?",
    desc: "Everything you need to know about India's largest health insurance scheme and how to enroll.",
    tag: "Schemes",
    readTime: "4 min read",
  },
];

const typeIcon = { article: BookOpen, video: Video, news: Newspaper };

export default function Awareness() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <section className="bg-gradient-subtle py-20">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mx-auto max-w-3xl text-center"
            >
              <h1 className="mb-4 font-heading text-4xl font-extrabold md:text-5xl">
                Health <span className="text-gradient">Awareness</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Stay informed with verified health tips, seasonal alerts, emergency guides,
                and preventive care education.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-12">
          <div className="container">

            {/* Articles grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((a, i) => {
                const TypeIcon = typeIcon[a.type as keyof typeof typeIcon] || BookOpen;
                return (
                  <motion.article
                    key={a.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="group cursor-pointer rounded-xl border bg-card p-6 transition-all hover:shadow-card"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <Badge variant="secondary" className="gap-1.5">
                        <TypeIcon className="h-3 w-3" />
                        {a.type === "video" ? "Video" : "Article"}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{a.readTime}</span>
                    </div>
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-primary">
                      <a.icon className="h-5 w-5" />
                    </div>
                    <h3 className="mb-2 font-heading text-base font-bold group-hover:text-primary transition-colors">
                      {a.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{a.desc}</p>
                    <div className="mt-4">
                      <Badge variant="outline" className="text-xs">{a.tag}</Badge>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
