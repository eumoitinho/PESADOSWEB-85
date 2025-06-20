import { neon } from "@neondatabase/serverless"

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set")
}

export const sql = neon(process.env.DATABASE_URL)

// Types
export interface User {
  id: string
  name: string
  email: string
  phone?: string
  password_hash: string
  role: "user" | "admin"
  created_at: string
  updated_at: string
}

export interface Vehicle {
  id: string
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
  status: "pending" | "approved" | "rejected" | "expired"
  duration_days: number
  expires_at: string
  views_count: number
  contacts_count: number
  created_at: string
  updated_at: string
  category_name?: string
  brand_name?: string
  user_name?: string
  user_phone?: string
  primary_image?: string
}

export interface VehicleImage {
  id: string
  vehicle_id: string
  image_url: string
  is_primary: boolean
  sort_order: number
  created_at: string
}

export interface BannerAd {
  id: string
  company_name: string
  image_url: string
  link_url?: string
  placement: "header" | "sidebar" | "footer" | "in-feed"
  location_target?: string
  price: number
  start_date: string
  end_date: string
  status: "pending" | "approved" | "rejected" | "expired"
  impressions_count: number
  clicks_count: number
  created_at: string
  updated_at: string
}
