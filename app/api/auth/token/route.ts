import { type NextRequest, NextResponse } from "next/server"
import { generateAuthToken } from "@/lib/jwt"

export async function POST(request: NextRequest) {
  try {
    const { userId, email, role } = await request.json()

    if (!userId || !email || !role) {
      return NextResponse.json({ error: "userId, email and role are required" }, { status: 400 })
    }

    // Gerar token JWT
    const token = generateAuthToken(userId, email, role)

    return NextResponse.json({
      token,
      expiresIn: "7 days",
      message: "Token gerado com sucesso. Copie este token e use-o para autenticação.",
    })
  } catch (error) {
    console.error("Token generation error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
