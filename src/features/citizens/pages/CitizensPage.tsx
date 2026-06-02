import { useState } from 'react'
import { PageHeader } from '../../../shared/components/ui/PageHeader'
import { StatCard } from '../../../shared/components/ui/StatCard'
import { SelectInput } from '../../../shared/components/ui/FormControls'
import { useCitizenManagement } from '../hooks/useCitizenManagement'
import { CitizenTable } from '../components/CitizenTable'
import { CitizenDetailModal } from '../components/CitizenDetailModal'
import { ConfirmDialog } from '../../../shared/components/ui/ConfirmDialog'
import type { CitizenUser } from '../types/citizen'
import { Users, Award, ShieldCheck, ClipboardList, Search } from 'lucide-react'

export function CitizensPage() {
  const [pendingToggleUser, setPendingToggleUser] = useState<CitizenUser | null>(null)
  const {
    citizens,
    isLoading,
    error,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    selectedCitizen,
    setSelectedCitizen,
    toggleCitizenStatus,
    updateCitizenPoints,
    updateCitizenProfile,
  } = useCitizenManagement()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-sm text-slate-500 dark:text-zinc-400 animate-pulse">
          Cargando ciudadanos...
        </div>
      </div>
    )
  }

  // Calculate metrics
  const totalCitizens = citizens.length
  const activeCitizens = citizens.filter((c) => c.is_active).length
  const totalPoints = citizens.reduce((sum, c) => sum + (c.reputation_points || 0), 0)
  const totalReports = citizens.reduce((sum, c) => sum + (c.reports?.length ?? 0), 0)

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Gestión de Comunidad"
        title="Ciudadanos de Tarija"
        description="Administra a los ciudadanos registrados, visualiza sus reportes, ajusta sus puntos de reputación y controla sus accesos."
      />

      {error && (
        <div className="rounded-md bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950/20 dark:text-red-400">
          {error}
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Users} label="Total Ciudadanos" value={totalCitizens} />
        <StatCard icon={ShieldCheck} label="Ciudadanos Activos" value={activeCitizens} />
        <StatCard icon={Award} label="Puntos de Reputación" value={totalPoints} />
        <StatCard icon={ClipboardList} label="Reportes Enviados" value={totalReports} />
      </div>

      {/* Filters Toolbar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-white dark:bg-zinc-900 p-4 rounded-lg border border-slate-200 dark:border-zinc-800">
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="text"
            className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-md bg-white text-sm outline-none focus:border-blue-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
            placeholder="Buscar por nombre, correo o teléfono..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2 sm:w-auto">
          <SelectInput
            value={statusFilter}
            onChange={(e: any) => setStatusFilter(e.target.value)}
            className="w-40"
          >
            <option value="ALL">Todos los Estados</option>
            <option value="ACTIVE">Activos</option>
            <option value="INACTIVE">Inactivos</option>
          </SelectInput>
        </div>
      </div>

      {/* Table */}
      <CitizenTable
        citizens={citizens}
        onManage={(citizen) => setSelectedCitizen(citizen)}
        onToggleStatus={setPendingToggleUser}
      />

      {/* Detail Modal */}
      {selectedCitizen && (
        <CitizenDetailModal
          open={true}
          citizen={selectedCitizen}
          onClose={() => setSelectedCitizen(null)}
          onToggleStatus={setPendingToggleUser}
          onUpdatePoints={updateCitizenPoints}
          onUpdateProfile={updateCitizenProfile}
        />
      )}

      {/* Confirm Status Change */}
      <ConfirmDialog
        open={Boolean(pendingToggleUser)}
        title={pendingToggleUser?.is_active ? 'Desactivar ciudadano' : 'Activar ciudadano'}
        message={`¿Estás seguro de que deseas ${
          pendingToggleUser?.is_active ? 'desactivar' : 'activar'
        } la cuenta de ${pendingToggleUser?.full_name}? ${
          pendingToggleUser?.is_active
            ? 'El ciudadano no podrá registrar reportes ni acceder a su cuenta.'
            : 'El ciudadano recuperará el acceso inmediato a la plataforma.'
        }`}
        variant={pendingToggleUser?.is_active ? 'danger' : 'primary'}
        confirmLabel={pendingToggleUser?.is_active ? 'Desactivar' : 'Activar'}
        onConfirm={() => {
          if (pendingToggleUser) {
            toggleCitizenStatus(pendingToggleUser.id, !pendingToggleUser.is_active)
            setPendingToggleUser(null)
          }
        }}
        onClose={() => setPendingToggleUser(null)}
      />
    </div>
  )
}
