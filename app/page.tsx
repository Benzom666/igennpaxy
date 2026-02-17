import { Navigation } from "@/components/navigation";
import { UpgradedHero } from "@/components/upgraded-hero";
import { BentoServices } from "@/components/bento-services";
import { ProcessSection } from "@/components/process-section";
import { Footer } from "@/components/footer";
import { EnhancedCursor } from "@/components/enhanced-cursor";
import { FluidBackground } from "@/components/fluid-background";
import { GrainOverlay } from "@/components/grain-overlay";
import { SmoothScrollProvider } from "@/components/lenis-provider";
import { CaseStudyPreview } from "@/components/case-study-card";
import { StickyCTA } from "@/components/sticky-cta";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Digital Marketing Agency | Revenue-Focused Growth",
  description:
    "IGEN & PAXY is a premium digital marketing agency. We've generated $50M+ in revenue for 200+ clients through data-driven strategies and conversion optimization.",
});

export default function Home() {
  return (
    <SmoothScrollProvider>
      <EnhancedCursor />
      <FluidBackground />
      <GrainOverlay />
      <StickyCTA />
      <main className="min-h-screen overflow-x-hidden">
        <Navigation />
        <UpgradedHero />
        <CaseStudyPreview />
        <BentoServices />
        <ProcessSection />
        <Footer />
      </main>
    </SmoothScrollProvider>
  );
}
