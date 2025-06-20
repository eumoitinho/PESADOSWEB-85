import { sql, type Vehicle, type VehicleImage } from "@/lib/database"

export class VehicleService {
  static async getAll(filters?: {
    category?: string
    brand?: string
    condition?: string
    location?: string
    minPrice?: number
    maxPrice?: number
    search?: string
    status?: string
    limit?: number
    offset?: number
  }): Promise<Vehicle[]> {
    try {
      console.log("VehicleService.getAll called with filters:", filters)

      if (!process.env.DATABASE_URL) {
        console.error("DATABASE_URL environment variable is not set")
        return []
      }

      const status = filters?.status || "approved"
      const limit = filters?.limit || 50
      const offset = filters?.offset || 0

      let vehicles: any

      // Simple query without complex filters
      if (!filters || Object.keys(filters).length === 0 || (Object.keys(filters).length === 1 && filters.limit)) {
        vehicles = await sql`
          SELECT v.*, c.name as category_name, b.name as brand_name, u.name as user_name,
                 vi.image_url as primary_image
          FROM vehicles v
          LEFT JOIN categories c ON v.category_id = c.id
          LEFT JOIN brands b ON v.brand_id = b.id
          LEFT JOIN users u ON v.user_id = u.id
          LEFT JOIN vehicle_images vi ON v.id = vi.vehicle_id AND vi.is_primary = true
          WHERE v.status = ${status} AND v.expires_at > NOW()
          ORDER BY v.created_at DESC
          LIMIT ${limit}
        `
      } else {
        // Handle complex filters by building separate queries
        if (
          filters.category &&
          !filters.brand &&
          !filters.condition &&
          !filters.location &&
          !filters.minPrice &&
          !filters.maxPrice &&
          !filters.search
        ) {
          vehicles = await sql`
            SELECT v.*, c.name as category_name, b.name as brand_name, u.name as user_name,
                   vi.image_url as primary_image
            FROM vehicles v
            LEFT JOIN categories c ON v.category_id = c.id
            LEFT JOIN brands b ON v.brand_id = b.id
            LEFT JOIN users u ON v.user_id = u.id
            LEFT JOIN vehicle_images vi ON v.id = vi.vehicle_id AND vi.is_primary = true
            WHERE v.status = ${status} AND v.expires_at > NOW() AND c.slug = ${filters.category}
            ORDER BY v.created_at DESC
            LIMIT ${limit} OFFSET ${offset}
          `
        } else if (
          filters.search &&
          !filters.category &&
          !filters.brand &&
          !filters.condition &&
          !filters.location &&
          !filters.minPrice &&
          !filters.maxPrice
        ) {
          const searchTerm = `%${filters.search}%`
          vehicles = await sql`
            SELECT v.*, c.name as category_name, b.name as brand_name, u.name as user_name,
                   vi.image_url as primary_image
            FROM vehicles v
            LEFT JOIN categories c ON v.category_id = c.id
            LEFT JOIN brands b ON v.brand_id = b.id
            LEFT JOIN users u ON v.user_id = u.id
            LEFT JOIN vehicle_images vi ON v.id = vi.vehicle_id AND vi.is_primary = true
            WHERE v.status = ${status} AND v.expires_at > NOW() 
            AND (v.model ILIKE ${searchTerm} OR b.name ILIKE ${searchTerm} OR v.description ILIKE ${searchTerm})
            ORDER BY v.created_at DESC
            LIMIT ${limit} OFFSET ${offset}
          `
        } else if (
          filters.condition &&
          !filters.category &&
          !filters.brand &&
          !filters.location &&
          !filters.minPrice &&
          !filters.maxPrice &&
          !filters.search
        ) {
          vehicles = await sql`
            SELECT v.*, c.name as category_name, b.name as brand_name, u.name as user_name,
                   vi.image_url as primary_image
            FROM vehicles v
            LEFT JOIN categories c ON v.category_id = c.id
            LEFT JOIN brands b ON v.brand_id = b.id
            LEFT JOIN users u ON v.user_id = u.id
            LEFT JOIN vehicle_images vi ON v.id = vi.vehicle_id AND vi.is_primary = true
            WHERE v.status = ${status} AND v.expires_at > NOW() AND v.condition_type = ${filters.condition}
            ORDER BY v.created_at DESC
            LIMIT ${limit} OFFSET ${offset}
          `
        } else {
          // For complex multi-filter queries, fall back to basic query
          vehicles = await sql`
            SELECT v.*, c.name as category_name, b.name as brand_name, u.name as user_name,
                   vi.image_url as primary_image
            FROM vehicles v
            LEFT JOIN categories c ON v.category_id = c.id
            LEFT JOIN brands b ON v.brand_id = b.id
            LEFT JOIN users u ON v.user_id = u.id
            LEFT JOIN vehicle_images vi ON v.id = vi.vehicle_id AND vi.is_primary = true
            WHERE v.status = ${status} AND v.expires_at > NOW()
            ORDER BY v.created_at DESC
            LIMIT ${limit} OFFSET ${offset}
          `
        }
      }

      console.log("Raw vehicles result type:", typeof vehicles)
      console.log("Raw vehicles result:", vehicles)

      // Check if the result is the actual array or wrapped in an object
      let vehicleArray: Vehicle[]
      if (Array.isArray(vehicles)) {
        vehicleArray = vehicles
      } else if (vehicles && typeof vehicles === "object" && vehicles.rows) {
        vehicleArray = vehicles.rows
      } else if (vehicles && typeof vehicles === "object" && vehicles.sql) {
        console.error("Query returned SQL object instead of results:", vehicles)
        return []
      } else {
        console.error("Unexpected vehicles result format:", vehicles)
        return []
      }

      if (!Array.isArray(vehicleArray)) {
        console.error("Vehicles query did not return an array:", vehicleArray)
        return []
      }

      if (vehicleArray.length === 0) {
        console.log("No vehicles found")
        return []
      }

      const processedVehicles = vehicleArray.map((vehicle) => {
        try {
          return {
            ...vehicle,
            price: Number(vehicle.price) || 0,
            mileage: Number(vehicle.mileage) || 0,
            views_count: Number(vehicle.views_count) || 0,
            contacts_count: Number(vehicle.contacts_count) || 0,
          }
        } catch (error) {
          console.error("Error processing vehicle:", vehicle, error)
          return vehicle
        }
      })

      console.log("Processed vehicles:", processedVehicles.length)
      return processedVehicles
    } catch (error) {
      console.error("Error in VehicleService.getAll:", error)
      return []
    }
  }

  static async getById(id: string): Promise<Vehicle | null> {
    try {
      if (!process.env.DATABASE_URL) {
        console.error("DATABASE_URL environment variable is not set")
        return null
      }

      const result = await sql`
        SELECT v.*, c.name as category_name, b.name as brand_name, u.name as user_name, u.phone as user_phone
        FROM vehicles v
        LEFT JOIN categories c ON v.category_id = c.id
        LEFT JOIN brands b ON v.brand_id = b.id
        LEFT JOIN users u ON v.user_id = u.id
        WHERE v.id = ${id}
      `

      console.log("getById result:", result)

      let vehicles: Vehicle[]
      if (Array.isArray(result)) {
        vehicles = result
      } else if (result && typeof result === "object" && result.rows) {
        vehicles = result.rows
      } else {
        console.error("Unexpected result format in getById:", result)
        return null
      }

      if (vehicles.length > 0) {
        const vehicle = vehicles[0]
        return {
          ...vehicle,
          price: Number(vehicle.price) || 0,
          mileage: Number(vehicle.mileage) || 0,
          views_count: Number(vehicle.views_count) || 0,
          contacts_count: Number(vehicle.contacts_count) || 0,
        }
      }

      return null
    } catch (error) {
      console.error("Error fetching vehicle by ID:", error)
      return null
    }
  }

  static async getByUserId(userId: string): Promise<Vehicle[]> {
    try {
      if (!process.env.DATABASE_URL) {
        console.error("DATABASE_URL environment variable is not set")
        return []
      }

      const result = await sql`
        SELECT v.*, c.name as category_name, b.name as brand_name,
               vi.image_url as primary_image
        FROM vehicles v
        LEFT JOIN categories c ON v.category_id = c.id
        LEFT JOIN brands b ON v.brand_id = b.id
        LEFT JOIN vehicle_images vi ON v.id = vi.vehicle_id AND vi.is_primary = true
        WHERE v.user_id = ${userId}
        ORDER BY v.created_at DESC
      `

      let vehicles: Vehicle[]
      if (Array.isArray(result)) {
        vehicles = result
      } else if (result && typeof result === "object" && result.rows) {
        vehicles = result.rows
      } else {
        console.error("Unexpected result format in getByUserId:", result)
        return []
      }

      return vehicles.map((vehicle) => ({
        ...vehicle,
        price: Number(vehicle.price) || 0,
        mileage: Number(vehicle.mileage) || 0,
        views_count: Number(vehicle.views_count) || 0,
        contacts_count: Number(vehicle.contacts_count) || 0,
      }))
    } catch (error) {
      console.error("Error fetching vehicles by user ID:", error)
      return []
    }
  }

  static async create(vehicleData: {
    user_id: string
    category_id: number
    brand_id: number
    model: string
    year: number
    price: number
    mileage: number
    condition_type: "new" | "used"
    description?: string
    location: string
    duration_days: number
  }): Promise<string | null> {
    try {
      if (!process.env.DATABASE_URL) {
        console.error("DATABASE_URL environment variable is not set")
        return null
      }

      const expiresAt = new Date()
      expiresAt.setDate(expiresAt.getDate() + vehicleData.duration_days)

      const result = await sql`
        INSERT INTO vehicles (user_id, category_id, brand_id, model, year, price, mileage, 
                             condition_type, description, location, duration_days, expires_at)
        VALUES (${vehicleData.user_id}, ${vehicleData.category_id}, ${vehicleData.brand_id}, 
                ${vehicleData.model}, ${vehicleData.year}, ${vehicleData.price}, ${vehicleData.mileage}, 
                ${vehicleData.condition_type}, ${vehicleData.description || ""}, ${vehicleData.location}, 
                ${vehicleData.duration_days}, ${expiresAt.toISOString()})
        RETURNING id
      `

      let resultArray: any[]
      if (Array.isArray(result)) {
        resultArray = result
      } else if (result && typeof result === "object" && result.rows) {
        resultArray = result.rows
      } else {
        console.error("Unexpected result format in create:", result)
        return null
      }

      return resultArray.length > 0 ? resultArray[0].id : null
    } catch (error) {
      console.error("Error creating vehicle:", error)
      return null
    }
  }

  static async updateStatus(id: string, status: "pending" | "approved" | "rejected" | "expired"): Promise<boolean> {
    try {
      await sql`UPDATE vehicles SET status = ${status}, updated_at = NOW() WHERE id = ${id}`
      return true
    } catch (error) {
      console.error("Error updating vehicle status:", error)
      return false
    }
  }

  static async incrementViews(id: string): Promise<void> {
    try {
      await sql`UPDATE vehicles SET views_count = views_count + 1 WHERE id = ${id}`
    } catch (error) {
      console.error("Error incrementing views:", error)
    }
  }

  static async incrementContacts(id: string): Promise<void> {
    try {
      await sql`UPDATE vehicles SET contacts_count = contacts_count + 1 WHERE id = ${id}`
    } catch (error) {
      console.error("Error incrementing contacts:", error)
    }
  }

  static async delete(id: string): Promise<boolean> {
    try {
      await sql`DELETE FROM vehicles WHERE id = ${id}`
      return true
    } catch (error) {
      console.error("Error deleting vehicle:", error)
      return false
    }
  }

  static async getImages(vehicleId: string): Promise<VehicleImage[]> {
    try {
      const result =
        await sql`SELECT * FROM vehicle_images WHERE vehicle_id = ${vehicleId} ORDER BY sort_order, created_at`

      let images: VehicleImage[]
      if (Array.isArray(result)) {
        images = result
      } else if (result && typeof result === "object" && result.rows) {
        images = result.rows
      } else {
        return []
      }

      return images
    } catch (error) {
      console.error("Error fetching vehicle images:", error)
      return []
    }
  }

  static async addImage(vehicleId: string, imageUrl: string, isPrimary = false, sortOrder = 0): Promise<string | null> {
    try {
      const result = await sql`
        INSERT INTO vehicle_images (vehicle_id, image_url, is_primary, sort_order) 
        VALUES (${vehicleId}, ${imageUrl}, ${isPrimary}, ${sortOrder}) 
        RETURNING id
      `

      let resultArray: any[]
      if (Array.isArray(result)) {
        resultArray = result
      } else if (result && typeof result === "object" && result.rows) {
        resultArray = result.rows
      } else {
        return null
      }

      return resultArray.length > 0 ? resultArray[0].id : null
    } catch (error) {
      console.error("Error adding vehicle image:", error)
      return null
    }
  }

  static async getFeatured(limit = 4): Promise<Vehicle[]> {
    return await this.getAll({ status: "approved", limit })
  }

  static async getStats(): Promise<{
    total: number
    active: number
    pending: number
    thisMonth: number
  }> {
    try {
      const totalResult = await sql`SELECT COUNT(*) as count FROM vehicles`
      const activeResult =
        await sql`SELECT COUNT(*) as count FROM vehicles WHERE status = 'approved' AND expires_at > NOW()`
      const pendingResult = await sql`SELECT COUNT(*) as count FROM vehicles WHERE status = 'pending'`
      const thisMonthResult =
        await sql`SELECT COUNT(*) as count FROM vehicles WHERE created_at >= NOW() - INTERVAL '1 month'`

      const getCount = (result: any): number => {
        if (Array.isArray(result)) {
          return Number(result[0]?.count || "0")
        } else if (result && result.rows) {
          return Number(result.rows[0]?.count || "0")
        }
        return 0
      }

      return {
        total: getCount(totalResult),
        active: getCount(activeResult),
        pending: getCount(pendingResult),
        thisMonth: getCount(thisMonthResult),
      }
    } catch (error) {
      console.error("Error fetching vehicle stats:", error)
      return {
        total: 0,
        active: 0,
        pending: 0,
        thisMonth: 0,
      }
    }
  }
}
