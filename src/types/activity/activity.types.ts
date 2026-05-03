export interface ActivityLog {
  id: string
  pet_id: string
  date: string
  activity_type: string
  duration_minutes: number
  notes: string | null
  created_at: string
}