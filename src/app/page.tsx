import { FaqSection } from "@/components/FaqSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { HeroSection } from "@/components/HeroSection";
import { HowItWorks } from "@/components/HowItWorks";
import { PrivacySection } from "@/components/PrivacySection";
import { SeoArticle } from "@/components/SeoArticle";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorks />
        <SeoArticle />
        <FaqSection />
        <PrivacySection />
      </main>
      <SiteFooter />
    </>
  );
}
