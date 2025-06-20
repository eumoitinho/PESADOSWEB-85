import { type NextRequest, NextResponse } from "next/server"
import { VehicleService } from "@/lib/services/vehicle-service"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const filters = {
      category: searchParams.get("category") || undefined,
      brand: searchParams.get("brand") || undefined,
      condition: searchParams.get("condition") || undefined,
      location: searchParams.get("location") || undefined,
      minPrice: searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined,
      maxPrice: searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined,
      search: searchParams.get("search") || undefined,
      limit: searchParams.get("limit") ? Number(searchParams.get("limit")) : undefined,
      offset: searchParams.get("offset") ? Number(searchParams.get("offset")) : undefined,
    }

    const vehicles = await VehicleService.getAll(filters)

    // Ensure we always return an array
    const safeVehicles = Array.isArray(vehicles) ? vehicles : []

    return NextResponse.json(safeVehicles)
  } catch (error) {
    console.error("Error fetching vehicles:", error)
    return NextResponse.json([], { status: 200 }) // Return empty array instead of error
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const vehicleId = await VehicleService.create(body)
    return NextResponse.json({ id: vehicleId }, { status: 201 })
  } catch (error) {
    console.error("Error creating vehicle:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
