import { type NextRequest, NextResponse } from "next/server"
import { BannerService } from "@/lib/services/banner-service"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await BannerService.incrementClicks(params.id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error tracking click:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
