import { HeroSection } from "@/components/hero-section"
import { FeaturedListings } from "@/components/featured-listings"
import { MissionSection } from "@/components/mission-section"
import { AppDownload } from "@/components/app-download"
import { BannerAd } from "@/components/banner-ad"
import { CookieConsent } from "@/components/cookie-consent"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="w-full">
        <BannerAd placement="header" />
      </div>
      <HeroSection />
      <FeaturedListings />
      <MissionSection />
      <AppDownload />
      <CookieConsent />
    </main>
  )
}
