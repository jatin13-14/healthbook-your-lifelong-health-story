import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Video } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Article {
  type: string;
  icon: LucideIcon;
  category: string;
  title: string;
  desc: string;
  tag: string;
  readTime: string;
}

// Extended content for detail views
const articleContent: Record<string, string> = {
  "5 Morning Habits That Improve Heart Health":
    "Starting your day right can significantly impact your cardiovascular health. Here are five habits backed by research:\n\n1. **Hydrate First** — Drink a glass of water within 30 minutes of waking. Dehydration raises blood viscosity, increasing heart strain.\n\n2. **Move for 10 Minutes** — A short walk or stretching session boosts circulation and lowers resting heart rate over time.\n\n3. **Eat a Fiber-Rich Breakfast** — Oats, fruits, and nuts reduce LDL cholesterol levels by up to 10%.\n\n4. **Practice Deep Breathing** — 5 minutes of box breathing (4-4-4-4) lowers cortisol and blood pressure.\n\n5. **Avoid Screens for 30 Minutes** — Reducing morning stress response helps maintain healthy heart rhythms.\n\nConsistency is key — even 3 out of 5 practiced daily can show measurable improvements within 8 weeks.",

  "Monsoon Season: Diseases to Watch For":
    "Monsoon brings relief from heat but also a spike in waterborne and vector-borne diseases.\n\n**Top Diseases to Watch:**\n\n🦟 **Dengue** — Spread by Aedes mosquitoes. Symptoms: high fever, severe headache, joint pain. Use mosquito nets and repellents.\n\n🦟 **Malaria** — Caused by Plasmodium parasites. Early detection with rapid diagnostic tests is critical.\n\n💧 **Cholera & Typhoid** — Contaminated water sources. Always boil or filter drinking water.\n\n🤧 **Leptospirosis** — From contact with flood water. Avoid wading through stagnant water.\n\n**Prevention Tips:**\n- Keep surroundings dry, no stagnant water\n- Use ORS for any sign of dehydration\n- Get vaccinated (Typhoid, Hepatitis A)\n- Wash hands frequently with soap",

  "Understanding Your Blood Pressure Numbers":
    "Blood pressure is measured in two numbers:\n\n**Systolic (top number)** — Pressure when your heart beats\n**Diastolic (bottom number)** — Pressure when your heart rests\n\n**Ranges:**\n- Normal: Below 120/80 mmHg\n- Elevated: 120-129 / below 80\n- High (Stage 1): 130-139 / 80-89\n- High (Stage 2): 140+ / 90+\n- Crisis: Above 180/120 — seek emergency care\n\n**When to Worry:**\n- Consistent readings above 130/80\n- Headaches, dizziness, or blurred vision\n- Family history of hypertension\n\nMeasure at the same time daily, sitting quietly for 5 minutes before reading.",

  "How AI Detects Early Signs of Diabetes":
    "HealthBook's AI engine analyzes your health timeline data to identify pre-diabetic patterns:\n\n**Data Points Analyzed:**\n- Fasting blood sugar trends over months\n- HbA1c progression\n- Weight changes correlated with glucose levels\n- Family history risk factors\n- Dietary patterns from food logs\n\n**How It Works:**\n1. Your vitals are tracked over time, building a personal baseline\n2. AI compares your trends against clinical thresholds\n3. When patterns match pre-diabetic indicators, you get an alert\n4. Actionable recommendations are provided\n\n**Early Signs the AI Flags:**\n- Gradual fasting sugar increase (even within 'normal' range)\n- Post-meal glucose spikes\n- Unexplained fatigue patterns\n- Increased thirst/urination frequency logged in symptoms diary",

  "CPR: A Step-by-Step Guide That Saves Lives":
    "**CPR can double or triple survival chances.** Here's the correct technique:\n\n**For Adults:**\n1. **Check responsiveness** — Tap shoulders, shout 'Are you okay?'\n2. **Call emergency services** — Dial 112 (India) or local emergency number\n3. **Position** — Place person on firm, flat surface\n4. **Hand placement** — Heel of one hand on center of chest, other hand on top\n5. **Compress** — Push hard and fast, 2 inches deep, 100-120 compressions/minute\n6. **Rescue breaths** (if trained) — 30 compressions, then 2 breaths\n7. **Continue** until help arrives or person responds\n\n**For Children (1-8 years):**\n- Use one hand for compressions\n- Depth: about 1.5 inches\n- Same rate: 100-120/minute\n\n**Important:** Hands-only CPR (no breaths) is effective and better than no CPR at all.",

  "Ayushman Bharat: Are You Eligible?":
    "**Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (AB PM-JAY)** is the world's largest health insurance scheme.\n\n**Coverage:** ₹5 lakh per family per year for secondary and tertiary care hospitalization.\n\n**Who's Eligible:**\n- Families identified in SECC 2011 database\n- Rural: based on deprivation categories (no adult member, female-headed, disabled member, SC/ST, landless, etc.)\n- Urban: based on occupation (ragpicker, street vendor, domestic worker, construction worker, etc.)\n\n**How to Check:**\n1. Visit pmjay.gov.in\n2. Enter your mobile number or ration card number\n3. Or call the helpline: 14555\n\n**How to Enroll:**\n- Visit nearest Ayushman Bharat Kendra or empaneled hospital\n- Carry Aadhaar card, ration card, or SECC list printout\n- Enrollment is free\n\n**What's Covered:** 1,350+ medical packages including surgery, medical treatment, and diagnostics.",
};

export default function ArticleDetailDialog({
  article,
  open,
  onOpenChange,
}: {
  article: Article | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  if (!article) return null;

  const content = articleContent[article.title] || article.desc;
  const Icon = article.icon;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary" className="gap-1.5">
              {article.type === "video" ? <Video className="h-3 w-3" /> : <BookOpen className="h-3 w-3" />}
              {article.type === "video" ? "Video" : "Article"}
            </Badge>
            <span className="text-xs text-muted-foreground">{article.readTime}</span>
          </div>
          <DialogTitle className="font-heading text-xl">{article.title}</DialogTitle>
        </DialogHeader>
        <div className="mt-2 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-primary">
            <Icon className="h-5 w-5" />
          </div>
          <Badge variant="outline">{article.category}</Badge>
          <Badge variant="outline">{article.tag}</Badge>
        </div>
        {article.type === "video" ? (
          <div className="mt-4 flex aspect-video items-center justify-center rounded-xl bg-muted border">
            <div className="text-center">
              <Video className="mx-auto h-12 w-12 text-muted-foreground/50" />
              <p className="mt-2 text-sm text-muted-foreground">Video content coming soon</p>
            </div>
          </div>
        ) : null}
        <div className="mt-4 prose prose-sm max-w-none text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
          {content.split("\n").map((line, i) => {
            const bold = line.replace(/\*\*(.*?)\*\*/g, "");
            if (line.startsWith("**") && line.endsWith("**")) {
              return <h3 key={i} className="mt-4 mb-1 font-heading text-base font-bold text-foreground">{line.replace(/\*\*/g, "")}</h3>;
            }
            if (line.match(/^\d+\.\s/)) {
              return <p key={i} className="ml-4 mb-1">{line}</p>;
            }
            if (line.startsWith("- ") || line.startsWith("🦟") || line.startsWith("💧") || line.startsWith("🤧")) {
              return <p key={i} className="ml-4 mb-1">{line}</p>;
            }
            if (line.trim() === "") return <br key={i} />;
            return <p key={i} className="mb-2">{line.replace(/\*\*(.*?)\*\*/g, "$1")}</p>;
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
