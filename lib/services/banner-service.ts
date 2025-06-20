import { sql, type BannerAd } from "@/lib/database"

export class BannerService {
  static async getActive(placement: string, location?: string): Promise<BannerAd | null> {
    try {
      console.log("Getting active banner for placement:", placement, "location:", location)

      let result: any

      if (location) {
        result = await sql`
          SELECT * FROM banner_ads 
          WHERE placement = ${placement} AND status = 'approved'
          AND start_date <= CURRENT_DATE AND end_date >= CURRENT_DATE
          AND (location_target IS NULL OR location_target ILIKE ${"%" + location + "%"})
          ORDER BY location_target IS NOT NULL DESC, created_at DESC 
          LIMIT 1
        `
      } else {
        result = await sql`
          SELECT * FROM banner_ads 
          WHERE placement = ${placement} AND status = 'approved'
          AND start_date <= CURRENT_DATE AND end_date >= CURRENT_DATE
          ORDER BY created_at DESC 
          LIMIT 1
        `
      }

      console.log("Banner query result:", result)

      let banners: BannerAd[]
      if (Array.isArray(result)) {
        banners = result
      } else if (result && typeof result === "object" && result.rows) {
        banners = result.rows
      } else {
        console.error("Unexpected result format in getActive:", result)
        return null
      }

      return banners.length > 0 ? banners[0] : null
    } catch (error) {
      console.error("Error fetching active banner ad:", error)
      return null
    }
  }

  static async incrementImpressions(id: string): Promise<void> {
    try {
      await sql`UPDATE banner_ads SET impressions_count = impressions_count + 1 WHERE id = ${id}`
    } catch (error) {
      console.error("Error incrementing banner impressions:", error)
    }
  }

  static async incrementClicks(id: string): Promise<void> {
    try {
      await sql`UPDATE banner_ads SET clicks_count = clicks_count + 1 WHERE id = ${id}`
    } catch (error) {
      console.error("Error incrementing banner clicks:", error)
    }
  }

  static async getAll(): Promise<BannerAd[]> {
    try {
      const result = await sql`
        SELECT * FROM banner_ads 
        ORDER BY created_at DESC
      `

      let banners: BannerAd[]
      if (Array.isArray(result)) {
        banners = result
      } else if (result && typeof result === "object" && result.rows) {
        banners = result.rows
      } else {
        console.error("Unexpected result format in getAll:", result)
        return []
      }

      return banners
    } catch (error) {
      console.error("Error fetching all banner ads:", error)
      return []
    }
  }

  static async create(bannerData: {
    company_name: string
    image_url: string
    link_url?: string
    placement: string
    location_target?: string
    price: number
    start_date: string
    end_date: string
  }): Promise<string | null> {
    try {
      const result = await sql`
        INSERT INTO banner_ads (company_name, image_url, link_url, placement, location_target, price, start_date, end_date)
        VALUES (${bannerData.company_name}, ${bannerData.image_url}, ${bannerData.link_url || ""}, 
                ${bannerData.placement}, ${bannerData.location_target || ""}, ${bannerData.price}, 
                ${bannerData.start_date}, ${bannerData.end_date})
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
      console.error("Error creating banner ad:", error)
      return null
    }
  }

  static async updateStatus(id: string, status: "pending" | "approved" | "rejected" | "expired"): Promise<boolean> {
    try {
      await sql`UPDATE banner_ads SET status = ${status}, updated_at = NOW() WHERE id = ${id}`
      return true
    } catch (error) {
      console.error("Error updating banner status:", error)
      return false
    }
  }
}
