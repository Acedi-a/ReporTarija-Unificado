import { Mail, Phone, Calendar, Shield, Edit2, UserMinus, UserCheck } from 'lucide-react'
import { Button } from '../../../shared/components/ui/Button'
import { formatDate } from '../../../shared/utils/format'
import type { CitizenUser } from '../types/citizen'

type CitizenProfileInfoProps = {
  citizen: CitizenUser
  onStartEdit: () => void
  onToggleStatus: (citizen: CitizenUser) => void
}

export function CitizenProfileInfo({ citizen, onStartEdit, onToggleStatus }: CitizenProfileInfoProps) {
  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-slate-100 bg-slate-50/50 p-4 dark:border-zinc-800/50 dark:bg-zinc-900/50 space-y-3">
        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-zinc-300">
          <Mail className="h-4 w-4 text-slate-400" />
          <span>{citizen.email}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-zinc-300">
          <Phone className="h-4 w-4 text-slate-400" />
          <span>{citizen.phone ?? 'No registrado'}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-zinc-300">
          <Calendar className="h-4 w-4 text-slate-400" />
          <span>Registrado desde: {formatDate(citizen.created_at)}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-zinc-300">
          <Shield className="h-4 w-4 text-slate-400" />
          <span>
            Estado de cuenta:{' '}
            <span
              className={`font-semibold ${citizen.is_active ? 'text-emerald-600' : 'text-red-600'}`}
            >
              {citizen.is_active ? 'Activo' : 'Inactivo'}
            </span>
          </span>
        </div>
      </div>

      <div className="flex gap-2">
        <Button variant="secondary" onClick={onStartEdit} className="flex-1">
          <Edit2 className="h-4 w-4" />
          Editar Perfil
        </Button>
        <Button
          variant="secondary"
          onClick={() => onToggleStatus(citizen)}
          className={`flex-1 ${
            citizen.is_active
              ? 'hover:bg-red-50 hover:text-red-700 hover:border-red-200 dark:hover:bg-red-950/20'
              : 'hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 dark:hover:bg-emerald-950/20'
          }`}
        >
          {citizen.is_active ? (
            <>
              <UserMinus className="h-4 w-4 text-red-500" />
              Desactivar Ciudadano
            </>
          ) : (
            <>
              <UserCheck className="h-4 w-4 text-emerald-500" />
              Activar Ciudadano
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
