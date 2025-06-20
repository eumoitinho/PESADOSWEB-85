import { NextResponse } from "next/server"
import { query } from "@/lib/database"

export async function GET() {
  try {
    console.log("Testing database connection...")
    console.log("DATABASE_URL exists:", !!process.env.DATABASE_URL)

    // Simple test query
    const result = await query("SELECT 1 as test")
    console.log("Database test result:", result)

    return NextResponse.json({
      success: true,
      result,
      hasDbUrl: !!process.env.DATABASE_URL,
      message: "Database connection successful",
    })
  } catch (error) {
    console.error("Database test failed:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        hasDbUrl: !!process.env.DATABASE_URL,
        message: "Database connection failed",
      },
      { status: 500 },
    )
  }
}
