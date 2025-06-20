import { type NextRequest, NextResponse } from "next/server"
import { BannerService } from "@/lib/services/banner-service"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const placement = searchParams.get("placement")
    const location = searchParams.get("location")

    if (!placement) {
      return NextResponse.json({ error: "Placement is required" }, { status: 400 })
    }

    const ad = await BannerService.getActive(placement, location || undefined)

    // Return null if no ad found (this is expected behavior)
    return NextResponse.json(ad)
  } catch (error) {
    console.error("Error fetching banner ad:", error)
    return NextResponse.json(null)
  }
}
