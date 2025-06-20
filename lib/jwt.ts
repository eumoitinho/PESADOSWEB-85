import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret"
const JWT_EXPIRES_IN = "7d" // 7 dias

export function generateToken(payload: any): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
}

export function verifyToken<T = any>(token: string): T | null {
  try {
    return jwt.verify(token, JWT_SECRET) as T
  } catch (error) {
    console.error("JWT verification error:", error)
    return null
  }
}

export function generateAuthToken(userId: string, email: string, role: string): string {
  return generateToken({ userId, email, role })
}
