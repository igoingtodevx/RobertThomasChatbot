import { HeroSection } from '@/components/hero-section'
import { ModeSelector } from '@/components/mode-selector'
import { TrustSection } from '@/components/trust-section'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <ModeSelector />
      <TrustSection />
    </div>
  )
}
