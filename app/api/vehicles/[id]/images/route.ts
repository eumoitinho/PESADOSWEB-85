import { type NextRequest, NextResponse } from "next/server"
import { VehicleService } from "@/lib/services/vehicle-service"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const images = await VehicleService.getImages(params.id)
    return NextResponse.json(images)
  } catch (error) {
    console.error("Error fetching vehicle images:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
