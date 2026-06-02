import { insforge } from '../../../lib/insforge'
import { assertNoError } from '../../../lib/insforgeErrors'
import type { CitizenUser } from '../types/citizen'

export async function getCitizens(): Promise<CitizenUser[]> {
  const { data, error } = await insforge.database
    .from('users')
    .select('*, reports:reports!citizen_id(id, title, status, created_at, category_id)')
    .eq('role', 'CITIZEN')
    .order('full_name')

  assertNoError(error)
  return (data ?? []) as CitizenUser[]
}

export async function toggleCitizenStatus(id: string, is_active: boolean): Promise<CitizenUser> {
  const { data, error } = await insforge.database
    .from('users')
    .update({
      is_active,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select('*, reports:reports!citizen_id(id, title, status, created_at, category_id)')
    .single()

  assertNoError(error)
  return data as CitizenUser
}

export async function updateCitizenPoints(id: string, reputation_points: number): Promise<CitizenUser> {
  const { data, error } = await insforge.database
    .from('users')
    .update({
      reputation_points,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select('*, reports:reports!citizen_id(id, title, status, created_at, category_id)')
    .single()

  assertNoError(error)
  return data as CitizenUser
}

export async function updateCitizenProfile(
  id: string,
  payload: { full_name: string; email: string; phone: string | null; reputation_points: number }
): Promise<CitizenUser> {
  const { data, error } = await insforge.database
    .from('users')
    .update({
      full_name: payload.full_name,
      email: payload.email,
      phone: payload.phone || null,
      reputation_points: payload.reputation_points,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select('*, reports:reports!citizen_id(id, title, status, created_at, category_id)')
    .single()

  assertNoError(error)
  return data as CitizenUser
}
