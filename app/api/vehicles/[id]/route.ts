import { type NextRequest, NextResponse } from "next/server"
import { VehicleService } from "@/lib/services/vehicle-service"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const vehicle = await VehicleService.getById(params.id)

    if (!vehicle) {
      return NextResponse.json({ error: "Vehicle not found" }, { status: 404 })
    }

    // Increment view count
    await VehicleService.incrementViews(params.id)

    return NextResponse.json(vehicle)
  } catch (error) {
    console.error("Error fetching vehicle:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { status } = body

    if (status) {
      const success = await VehicleService.updateStatus(params.id, status)
      if (!success) {
        return NextResponse.json({ error: "Vehicle not found" }, { status: 404 })
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating vehicle:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const success = await VehicleService.delete(params.id)

    if (!success) {
      return NextResponse.json({ error: "Vehicle not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting vehicle:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
