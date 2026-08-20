import { HomeHero } from "@/components/site/HomeHero";
import { HighlightsBand } from "@/components/site/HighlightsBand";
import { AboutTeaser } from "@/components/site/AboutTeaser";
import { ServicesSection } from "@/components/site/ServicesSection";
import { BrazilMapSection } from "@/components/site/BrazilMapSection";
import { PartnersSection } from "@/components/site/PartnersSection";
import { ClosingArgumentSection } from "@/components/site/ClosingArgumentSection";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HighlightsBand />
      <AboutTeaser />
      <ServicesSection />
      <BrazilMapSection />
      <PartnersSection />
      <ClosingArgumentSection />
    </>
  );
}
