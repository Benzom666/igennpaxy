import { Navigation } from "@/components/navigation";
import { UpgradedHero } from "@/components/upgraded-hero";
import { BentoServices } from "@/components/bento-services";
import { ProcessSection } from "@/components/process-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import { EnhancedCursor } from "@/components/enhanced-cursor";
import { FluidBackground } from "@/components/fluid-background";
import { GrainOverlay } from "@/components/grain-overlay";
import { SmoothScrollProvider } from "@/components/lenis-provider";

export default function Home() {
  return (
    <SmoothScrollProvider>
      <EnhancedCursor />
      <FluidBackground />
      <GrainOverlay />
      <main className="min-h-screen overflow-x-hidden">
        <Navigation />
        <UpgradedHero />
        <BentoServices />
        <ProcessSection />
        <ContactSection />
        <Footer />
      </main>
    </SmoothScrollProvider>
  );
}
