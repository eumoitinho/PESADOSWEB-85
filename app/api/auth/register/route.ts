import { type NextRequest, NextResponse } from "next/server"
import { UserService } from "@/lib/services/user-service"
import { generateAuthToken } from "@/lib/jwt"

export async function POST(request: NextRequest) {
  try {
    const { email, password, name, phone, location } = await request.json()

    if (!email || !password || !name) {
      return NextResponse.json({ error: "Email, password and name are required" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = await UserService.findByEmail(email)
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 })
    }

    // Create user
    const userId = await UserService.create({
      email,
      password,
      name,
      phone,
      location,
    })

    if (!userId) {
      return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
    }

    const user = await UserService.findById(userId)
    if (!user) {
      return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
    }

    // Create JWT token
    const token = generateAuthToken(user.id, user.email, user.role)

    const response = NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        location: user.location,
        phone: user.phone,
      },
    })

    // Set HTTP-only cookie
    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    })

    return response
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
