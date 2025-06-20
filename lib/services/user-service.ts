import { sql, type User } from "@/lib/database"
import bcrypt from "bcryptjs"

export class UserService {
  static async create(userData: {
    name: string
    email: string
    phone: string
    password: string
  }): Promise<string | null> {
    try {
      // Check if user already exists
      const existingUser = await sql`SELECT id FROM users WHERE email = ${userData.email}`

      if (Array.isArray(existingUser) && existingUser.length > 0) {
        throw new Error("User with this email already exists")
      }

      // Hash password
      const passwordHash = await bcrypt.hash(userData.password, 12)

      // Create user
      const result = await sql`
        INSERT INTO users (name, email, phone, password_hash)
        VALUES (${userData.name}, ${userData.email}, ${userData.phone}, ${passwordHash})
        RETURNING id
      `

      return Array.isArray(result) && result.length > 0 ? result[0].id : null
    } catch (error) {
      console.error("Error creating user:", error)
      throw error
    }
  }

  static async findByEmail(email: string): Promise<User | null> {
    try {
      const result = await sql`SELECT * FROM users WHERE email = ${email}`
      return Array.isArray(result) && result.length > 0 ? result[0] : null
    } catch (error) {
      console.error("Error finding user by email:", error)
      return null
    }
  }

  static async findById(id: string): Promise<User | null> {
    try {
      const result = await sql`SELECT * FROM users WHERE id = ${id}`
      return Array.isArray(result) && result.length > 0 ? result[0] : null
    } catch (error) {
      console.error("Error finding user by ID:", error)
      return null
    }
  }

  static async verifyPassword(password: string, hash: string): Promise<boolean> {
    try {
      return await bcrypt.compare(password, hash)
    } catch (error) {
      console.error("Error verifying password:", error)
      return false
    }
  }

  static async updateLastLogin(id: string): Promise<void> {
    try {
      await sql`UPDATE users SET updated_at = NOW() WHERE id = ${id}`
    } catch (error) {
      console.error("Error updating last login:", error)
    }
  }

  static async getAll(filters?: {
    limit?: number
    offset?: number
  }): Promise<User[]> {
    try {
      let query = "SELECT id, name, email, phone, is_admin, created_at, updated_at FROM users ORDER BY created_at DESC"

      if (filters?.limit) {
        query += ` LIMIT ${filters.limit}`

        if (filters?.offset) {
          query += ` OFFSET ${filters.offset}`
        }
      }

      const result = await sql`${query}`
      return Array.isArray(result) ? result : []
    } catch (error) {
      console.error("Error fetching users:", error)
      return []
    }
  }

  static async updateProfile(
    id: string,
    updates: {
      name?: string
      phone?: string
    },
  ): Promise<boolean> {
    try {
      const setParts: string[] = []

      if (updates.name) {
        setParts.push(`name = '${updates.name.replace(/'/g, "''")}'`)
      }

      if (updates.phone) {
        setParts.push(`phone = '${updates.phone.replace(/'/g, "''")}'`)
      }

      if (setParts.length === 0) {
        return false
      }

      const query = `UPDATE users SET ${setParts.join(", ")}, updated_at = NOW() WHERE id = '${id}'`
      const result = await sql`${query}`
      return Array.isArray(result)
    } catch (error) {
      console.error("Error updating user profile:", error)
      return false
    }
  }

  static async delete(id: string): Promise<boolean> {
    try {
      const result = await sql`DELETE FROM users WHERE id = ${id}`
      return Array.isArray(result)
    } catch (error) {
      console.error("Error deleting user:", error)
      return false
    }
  }

  static async getStats(): Promise<{
    total: number
    thisMonth: number
    admins: number
  }> {
    try {
      const totalResult = await sql`SELECT COUNT(*) as count FROM users`
      const thisMonthResult =
        await sql`SELECT COUNT(*) as count FROM users WHERE created_at >= NOW() - INTERVAL '1 month'`
      const adminsResult = await sql`SELECT COUNT(*) as count FROM users WHERE is_admin = true`

      return {
        total: Number(totalResult[0]?.count || "0"),
        thisMonth: Number(thisMonthResult[0]?.count || "0"),
        admins: Number(adminsResult[0]?.count || "0"),
      }
    } catch (error) {
      console.error("Error fetching user stats:", error)
      return {
        total: 0,
        thisMonth: 0,
        admins: 0,
      }
    }
  }
}
