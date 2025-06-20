"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import Image from "next/image"

interface BannerAdProps {
  placement: "header" | "sidebar" | "footer" | "in-feed"
  userLocation?: string
}

interface Ad {
  id: string
  image_url: string
  link_url?: string
  company_name: string
  location_target?: string
  placement: string
}

export function BannerAd({ placement, userLocation = "Curitiba" }: BannerAdProps) {
  const [ad, setAd] = useState<Ad | null>(null)
  const [isVisible, setIsVisible] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const fetchAd = async () => {
      try {
        setHasError(false)
        const response = await fetch(`/api/banner-ads?placement=${placement}&location=${userLocation}`)

        if (response.ok) {
          const adData = await response.json()

          // Check if adData is not null and has the expected structure
          if (adData && typeof adData === "object" && adData.id) {
            setAd(adData)

            // Track impression
            try {
              await fetch(`/api/banner-ads/${adData.id}/impression`, { method: "POST" })
            } catch (impressionError) {
              console.error("Error tracking impression:", impressionError)
            }
          } else {
            // No ad available for this placement/location
            setAd(null)
          }
        } else {
          console.error("Failed to fetch banner ad:", response.status, response.statusText)
          setAd(null)
          setHasError(true)
        }
      } catch (error) {
        console.error("Error fetching banner ad:", error)
        setAd(null)
        setHasError(true)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAd()
  }, [placement, userLocation])

  const handleClick = async () => {
    if (ad?.id) {
      // Track click
      try {
        await fetch(`/api/banner-ads/${ad.id}/click`, { method: "POST" })
      } catch (error) {
        console.error("Error tracking click:", error)
      }
    }
  }

  // Don't render anything if loading, no ad, not visible, or has error
  if (isLoading || !ad || !isVisible || hasError) return null

  const getDimensions = () => {
    switch (placement) {
      case "header":
        return { width: 1200, height: 300 }
      case "sidebar":
        return { width: 300, height: 600 }
      case "footer":
        return { width: 728, height: 90 }
      case "in-feed":
        return { width: 400, height: 200 }
      default:
        return { width: 728, height: 120 }
    }
  }

  const getContainerClasses = () => {
    const base = "relative group"
    switch (placement) {
      case "header":
        return `${base} w-full h-[300px] -mx-4 lg:-mx-0`
      case "sidebar":
        return `${base} w-full max-w-xs`
      case "footer":
        return `${base} w-full max-w-4xl mx-auto mt-4`
      case "in-feed":
        return `${base} w-full max-w-md mx-auto my-4`
      default:
        return base
    }
  }

  const dimensions = getDimensions()

  return (
    <div className={getContainerClasses()}>
      <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300">
        <div className="relative">
          <a
            href={ad.link_url || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
            onClick={handleClick}
          >
            <Image
              src={ad.image_url || "/placeholder.svg"}
              alt={`Anúncio ${ad.company_name}`}
              width={dimensions.width}
              height={dimensions.height}
              className={`w-full object-cover hover:scale-105 transition-transform duration-300 ${
                placement === "header" ? "h-[300px]" : "h-auto"
              }`}
            />
          </a>

          <button
            onClick={() => setIsVisible(false)}
            className="absolute top-2 right-2 p-1 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-black/70"
          >
            <X className="h-3 w-3" />
          </button>
        </div>

        <div className="p-2 bg-gray-100">
          <div className="flex justify-between items-center text-xs text-gray-600">
            <span>Anúncio - {ad.company_name}</span>
            <span>{ad.location_target || "Nacional"}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
