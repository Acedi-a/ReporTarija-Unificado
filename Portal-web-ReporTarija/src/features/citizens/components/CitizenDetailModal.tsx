import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import type { CitizenUser } from '../types/citizen'
import { CitizenProfileInfo } from './CitizenProfileInfo'
import { CitizenReputationManager } from './CitizenReputationManager'
import { CitizenReportsHistory } from './CitizenReportsHistory'
import { CitizenProfileForm } from './CitizenProfileForm'

type CitizenDetailModalProps = {
  open: boolean
  citizen: CitizenUser | null
  onClose: () => void
  onToggleStatus: (citizen: CitizenUser) => void
  onUpdatePoints: (id: string, points: number) => void
  onUpdateProfile: (
    id: string,
    payload: { full_name: string; email: string; phone: string | null; reputation_points: number }
  ) => Promise<any>
}

export function CitizenDetailModal({
  open,
  citizen,
  onClose,
  onToggleStatus,
  onUpdatePoints,
  onUpdateProfile,
}: CitizenDetailModalProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({
    full_name: '',
    email: '',
    phone: '',
    reputation_points: 0,
  })
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!open) return
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose])

  useEffect(() => {
    if (citizen) {
      setEditForm({
        full_name: citizen.full_name,
        email: citizen.email,
        phone: citizen.phone ?? '',
        reputation_points: citizen.reputation_points,
      })
      setIsEditing(false)
      setError('')
    }
  }, [citizen, open])

  if (!open || !citizen) return null

  async function handleSubmitProfile(e: React.FormEvent) {
    e.preventDefault()
    if (!citizen) return
    setError('')
    setIsSubmitting(true)

    if (!editForm.full_name.trim()) {
      setError('El nombre completo es obligatorio.')
      setIsSubmitting(false)
      return
    }
    if (!editForm.email.trim() || !editForm.email.includes('@')) {
      setError('Introduce un correo electrónico válido.')
      setIsSubmitting(false)
      return
    }

    try {
      await onUpdateProfile(citizen.id, {
        full_name: editForm.full_name,
        email: editForm.email,
        phone: editForm.phone.trim() || null,
        reputation_points: Number(editForm.reputation_points) || 0,
      })
      setIsEditing(false)
    } catch (err: any) {
      setError(err?.message ?? 'No se pudo actualizar el perfil.')
    } finally {
      setIsSubmitting(false)
    }
  }

  function handleAdjustPoints(amount: number) {
    const newPoints = Math.max(0, citizen!.reputation_points + amount)
    onUpdatePoints(citizen!.id, newPoints)
    setEditForm((prev) => ({ ...prev, reputation_points: newPoints }))
  }

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-slate-950/45 px-4 py-6 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div className="max-h-[calc(100vh-3rem)] w-full max-w-3xl overflow-y-auto rounded-lg border border-slate-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-950">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white px-6 py-4 dark:border-zinc-800 dark:bg-zinc-950">
          <div>
            <p className="text-xs font-semibold uppercase text-blue-700 dark:text-zinc-400">
              Gestión de Ciudadano
            </p>
            <h2 className="text-xl font-bold text-slate-950 dark:text-zinc-50">
              {isEditing ? 'Editar Perfil del Ciudadano' : citizen.full_name}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-md border border-slate-200 text-slate-500 hover:bg-slate-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"
            aria-label="Cerrar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {error && (
            <div className="rounded-md bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950/20 dark:text-red-400">
              {error}
            </div>
          )}

          {isEditing ? (
            <CitizenProfileForm
              editForm={editForm}
              isSubmitting={isSubmitting}
              onChange={(updates) => setEditForm((prev) => ({ ...prev, ...updates }))}
              onSubmit={handleSubmitProfile}
              onCancel={() => setIsEditing(false)}
            />
          ) : (
            <div className="grid gap-6 md:grid-cols-3">
              <div className="md:col-span-2">
                <CitizenProfileInfo
                  citizen={citizen}
                  onStartEdit={() => setIsEditing(true)}
                  onToggleStatus={onToggleStatus}
                />
              </div>
              <div>
                <CitizenReputationManager
                  citizen={citizen}
                  onAdjustPoints={handleAdjustPoints}
                />
              </div>
            </div>
          )}

          <CitizenReportsHistory reports={citizen.reports} onClose={onClose} />
        </div>
      </div>
    </div>
  )
}
