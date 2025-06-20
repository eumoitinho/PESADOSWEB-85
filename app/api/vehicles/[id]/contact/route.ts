import { type NextRequest, NextResponse } from "next/server"
import { VehicleService } from "@/lib/services/vehicle-service"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await VehicleService.incrementContacts(params.id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error tracking contact:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
