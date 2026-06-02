import { useState } from 'react'
import { PageHeader } from '../../../shared/components/ui/PageHeader'
import { StaffForm } from '../components/StaffForm'
import { StaffTable } from '../components/StaffTable'
import { useStaffManagement } from '../hooks/useStaffManagement'
import { ConfirmDialog } from '../../../shared/components/ui/ConfirmDialog'
import type { StaffUser } from '../../reports/types/report'

export function StaffPage() {
  const staffManagement = useStaffManagement()
  const [pendingToggleUser, setPendingToggleUser] = useState<StaffUser | null>(null)

  if (staffManagement.isLoading) {
    return <div className="text-sm text-slate-500 dark:text-zinc-400">Cargando accesos...</div>
  }

  function handleConfirmToggle() {
    if (pendingToggleUser) {
      staffManagement.toggleStaffStatus(pendingToggleUser)
      setPendingToggleUser(null)
    }
  }

  return (
    <div className="space-y-5">
      <PageHeader title="Accesos administrativos" description="Crea cuentas para otras personas que necesiten entrar al panel municipal." />

      {staffManagement.error && <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{staffManagement.error}</p>}

      <StaffForm
        value={staffManagement.form}
        areas={staffManagement.areas}
        isSubmitting={staffManagement.isSubmitting}
        isEditing={staffManagement.isEditing}
        submitLabel={staffManagement.isEditing ? 'Guardar cambios' : 'Crear acceso'}
        onChange={staffManagement.updateForm}
        onSubmit={staffManagement.submitForm}
        onCancel={staffManagement.isEditing ? staffManagement.resetForm : undefined}
      />

      <StaffTable
        staff={staffManagement.staff}
        onEdit={staffManagement.editStaff}
        onToggleStatus={(user) => setPendingToggleUser(user)}
      />

      <ConfirmDialog
        open={Boolean(pendingToggleUser)}
        title={pendingToggleUser?.is_active ? 'Desactivar funcionario' : 'Activar funcionario'}
        message={`¿Estás seguro de que deseas ${
          pendingToggleUser?.is_active ? 'desactivar' : 'activar'
        } el acceso de ${pendingToggleUser?.full_name}? ${
          pendingToggleUser?.is_active ? 'Este usuario ya no podrá iniciar sesión en la plataforma.' : 'El usuario recuperará el acceso inmediato a la plataforma.'
        }`}
        variant={pendingToggleUser?.is_active ? 'danger' : 'primary'}
        confirmLabel={pendingToggleUser?.is_active ? 'Desactivar' : 'Activar'}
        onConfirm={handleConfirmToggle}
        onClose={() => setPendingToggleUser(null)}
      />
    </div>
  )
}

