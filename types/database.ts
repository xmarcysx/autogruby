// Auto-generated Supabase database types
// Run: npx supabase gen types typescript --local > types/database.ts

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      cars: {
        Row: {
          id: string
          slug: string
          title: string
          brand: string
          model: string
          generation: string | null
          year: number
          mileage: number
          fuel_type: string
          transmission: string
          body_type: string
          engine_capacity: number | null
          engine_power_hp: number | null
          drive_type: string | null
          color: string | null
          doors: number | null
          seats: number | null
          vin: string | null
          registration_number: string | null
          country_origin: string | null
          first_registration_date: string | null
          accident_free: boolean
          service_history: boolean
          description: string | null
          price: number
          currency: string
          featured: boolean
          published: boolean
          location_city: string
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['cars']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['cars']['Insert']>
      }
      car_images: {
        Row: {
          id: string
          car_id: string
          storage_path: string
          alt: string
          sort_order: number
          is_cover: boolean
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['car_images']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['car_images']['Insert']>
      }
      car_features: {
        Row: {
          id: string
          car_id: string
          category: string
          name: string
        }
        Insert: Omit<Database['public']['Tables']['car_features']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['car_features']['Insert']>
      }
      car_views_stats: {
        Row: {
          id: string
          car_id: string
          viewed_at: string
          ip_hash: string | null
        }
        Insert: Omit<Database['public']['Tables']['car_views_stats']['Row'], 'id' | 'viewed_at'>
        Update: never
      }
      inquiries: {
        Row: {
          id: string
          car_id: string | null
          name: string
          phone: string | null
          email: string | null
          message: string
          status: string
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['inquiries']['Row'], 'id' | 'created_at' | 'status'>
        Update: Partial<Pick<Database['public']['Tables']['inquiries']['Row'], 'status'>>
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}
