import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import HowItWorks from "@/components/home/HowItWorks";
import BenefitsSection from "@/components/home/BenefitsSection";
import SecuritySection from "@/components/home/SecuritySection";
import CTASection from "@/components/home/CTASection";

const Index = () => (
  <div className="min-h-screen">
    <Navbar />
    <main>
      <HeroSection />
      <FeaturesSection />
      <HowItWorks />
      <BenefitsSection />
      <SecuritySection />
      <CTASection />
    </main>
    <Footer />
  </div>
);

export default Index;
