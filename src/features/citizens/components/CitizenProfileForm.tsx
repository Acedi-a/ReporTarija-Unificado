import { Check } from 'lucide-react'
import { Button } from '../../../shared/components/ui/Button'
import { TextInput } from '../../../shared/components/ui/FormControls'

type EditFormState = {
  full_name: string
  email: string
  phone: string
  reputation_points: number
}

type CitizenProfileFormProps = {
  editForm: EditFormState
  isSubmitting: boolean
  onChange: (updates: Partial<EditFormState>) => void
  onSubmit: (e: React.FormEvent) => void
  onCancel: () => void
}

export function CitizenProfileForm({
  editForm,
  isSubmitting,
  onChange,
  onSubmit,
  onCancel,
}: CitizenProfileFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <TextInput
          label="Nombre Completo"
          value={editForm.full_name}
          onChange={(e) => onChange({ full_name: e.target.value })}
          placeholder="Ej. Juan Pérez"
          required
        />
        <TextInput
          label="Correo Electrónico"
          type="email"
          value={editForm.email}
          onChange={(e) => onChange({ email: e.target.value })}
          placeholder="correo@ejemplo.com"
          required
        />
        <TextInput
          label="Teléfono / Celular"
          value={editForm.phone}
          onChange={(e) => onChange({ phone: e.target.value })}
          placeholder="Ej. 71234567"
        />
        <TextInput
          label="Puntos de Reputación"
          type="number"
          min="0"
          value={editForm.reputation_points}
          onChange={(e) => onChange({ reputation_points: parseInt(e.target.value) || 0 })}
        />
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <Button variant="secondary" onClick={onCancel} disabled={isSubmitting}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          <Check className="h-4 w-4" />
          {isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
        </Button>
      </div>
    </form>
  )
}
