import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getCitizens, toggleCitizenStatus, updateCitizenPoints, updateCitizenProfile } from '../services/citizenService'
import type { CitizenUser } from '../types/citizen'
import { useToast } from '../../../shared/components/ui/Toaster'

export function useCitizenManagement() {
  const queryClient = useQueryClient()
  const toast = useToast()

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'ACTIVE' | 'INACTIVE'>('ALL')
  const [selectedCitizen, setSelectedCitizen] = useState<CitizenUser | null>(null)

  const { data: citizens = [], isLoading, error } = useQuery({
    queryKey: ['citizens'],
    queryFn: getCitizens,
  })

  const refreshCitizens = () => queryClient.invalidateQueries({ queryKey: ['citizens'] })

  const toggleMutation = useMutation({
    mutationFn: (input: { id: string; is_active: boolean }) => toggleCitizenStatus(input.id, input.is_active),
    onSuccess: (updated) => {
      refreshCitizens()
      if (selectedCitizen?.id === updated.id) {
        setSelectedCitizen(updated)
      }
      toast.success(`Ciudadano ${updated.full_name} ${updated.is_active ? 'activado' : 'desactivado'} con éxito.`)
    },
    onError: () => {
      toast.error('No se pudo cambiar el estado del ciudadano.')
    },
  })

  const pointsMutation = useMutation({
    mutationFn: (input: { id: string; points: number }) => updateCitizenPoints(input.id, input.points),
    onSuccess: (updated) => {
      refreshCitizens()
      if (selectedCitizen?.id === updated.id) {
        setSelectedCitizen(updated)
      }
      toast.success(`Puntos de reputación actualizados para ${updated.full_name} a ${updated.reputation_points} pts.`)
    },
    onError: () => {
      toast.error('No se pudieron actualizar los puntos de reputación.')
    },
  })

  const profileMutation = useMutation({
    mutationFn: (input: { id: string; payload: { full_name: string; email: string; phone: string | null; reputation_points: number } }) =>
      updateCitizenProfile(input.id, input.payload),
    onSuccess: (updated) => {
      refreshCitizens()
      if (selectedCitizen?.id === updated.id) {
        setSelectedCitizen(updated)
      }
      toast.success(`Perfil de ${updated.full_name} actualizado con éxito.`)
    },
    onError: () => {
      toast.error('No se pudo actualizar el perfil del ciudadano.')
    },
  })

  // Filter logic
  const filteredCitizens = citizens.filter((c) => {
    const matchesSearch =
      c.full_name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      (c.phone && c.phone.toLowerCase().includes(search.toLowerCase()))

    const matchesStatus =
      statusFilter === 'ALL'
        ? true
        : statusFilter === 'ACTIVE'
        ? c.is_active
        : !c.is_active

    return matchesSearch && matchesStatus
  })

  return {
    citizens: filteredCitizens,
    totalCount: citizens.length,
    isLoading,
    error: error ? 'No se pudieron cargar los ciudadanos.' : null,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    selectedCitizen,
    setSelectedCitizen,
    toggleCitizenStatus: (id: string, is_active: boolean) => toggleMutation.mutate({ id, is_active }),
    updateCitizenPoints: (id: string, points: number) => pointsMutation.mutate({ id, points }),
    updateCitizenProfile: (id: string, payload: { full_name: string; email: string; phone: string | null; reputation_points: number }) =>
      profileMutation.mutateAsync({ id, payload }),
    isMutating: toggleMutation.isPending || pointsMutation.isPending || profileMutation.isPending,
  }
}
