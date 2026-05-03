export type MedicalEventType =
  | 'vaccine'
  | 'medication'
  | 'tick'
  | 'teeth'
  | 'grooming'
  | 'analysis'

export interface MedicalEvent {
  id: string
  pet_id: string
  type: MedicalEventType
  date: string
  next_date: string | null
  notes: string | null
  file_url: string | null
  created_at: string
}