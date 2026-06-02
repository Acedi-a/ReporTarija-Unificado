import type { Report } from '../../reports/types/report'

export type CitizenUser = {
  id: string
  full_name: string
  email: string
  phone: string | null
  role: 'CITIZEN' | 'ADMIN' | 'FUNCIONARIO' | 'TECNICO' | 'RESPONSABLE_AREA'
  is_active: boolean
  reputation_points: number
  created_at: string
  updated_at: string
  reports?: Report[]
}
