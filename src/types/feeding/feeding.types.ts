export interface FeedingLog {
  id: string
  pet_id: string
  date: string
  food_name: string
  amount_grams: number
  notes: string | null
  created_at: string
}