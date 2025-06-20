import { type NextRequest, NextResponse } from "next/server"
import { UserService } from "@/lib/services/user-service"
import { verifyToken } from "@/lib/jwt"

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value

    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 })
    }

    const decoded = verifyToken<{ userId: string }>(token)

    if (!decoded || !decoded.userId) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const user = await UserService.findById(decoded.userId)

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        location: user.location,
        phone: user.phone,
      },
    })
  } catch (error) {
    console.error("Auth verification failed:", error)
    return NextResponse.json({ error: "Invalid token" }, { status: 401 })
  }
}
