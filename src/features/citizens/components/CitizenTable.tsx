import { Button } from '../../../shared/components/ui/Button'
import { Panel } from '../../../shared/components/ui/Panel'
import type { CitizenUser } from '../types/citizen'
import { Award, ClipboardList, ShieldAlert, ShieldCheck } from 'lucide-react'

type CitizenTableProps = {
  citizens: CitizenUser[]
  onManage: (citizen: CitizenUser) => void
  onToggleStatus: (citizen: CitizenUser) => void
}

export function CitizenTable({ citizens, onManage, onToggleStatus }: CitizenTableProps) {
  if (citizens.length === 0) {
    return (
      <Panel className="flex flex-col items-center justify-center py-12 text-center">
        <ClipboardList className="h-12 w-12 text-slate-300 dark:text-zinc-700" />
        <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-zinc-100">No se encontraron ciudadanos</h3>
        <p className="mt-2 text-sm text-slate-500 dark:text-zinc-400">
          Intenta ajustar los filtros o el término de búsqueda.
        </p>
      </Panel>
    )
  }

  return (
    <Panel className="overflow-x-auto">
      <table className="w-full min-w-[800px] text-left text-sm">
        <thead className="border-b border-slate-200 text-xs uppercase text-slate-500 dark:border-zinc-800 dark:text-zinc-400">
          <tr>
            <th className="py-3 px-4">Ciudadano</th>
            <th className="py-3 px-4">Contacto</th>
            <th className="py-3 px-4 text-center">Puntos de Reputación</th>
            <th className="py-3 px-4 text-center">Reportes Enviados</th>
            <th className="py-3 px-4">Estado</th>
            <th className="py-3 px-4 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-zinc-800">
          {citizens.map((citizen) => {
            const reportCount = citizen.reports?.length ?? 0
            return (
              <tr key={citizen.id} className="hover:bg-slate-50/50 dark:hover:bg-zinc-800/20">
                <td className="py-4 px-4">
                  <div className="font-semibold text-slate-950 dark:text-zinc-50">
                    {citizen.full_name}
                  </div>
                  <div className="text-xs text-slate-400 dark:text-zinc-500">
                    ID: {citizen.id.substring(0, 8)}...
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="text-slate-600 dark:text-zinc-300 font-medium">{citizen.email}</div>
                  {citizen.phone && (
                    <div className="text-xs text-slate-500 dark:text-zinc-400">{citizen.phone}</div>
                  )}
                </td>
                <td className="py-4 px-4 text-center">
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-800 ring-1 ring-amber-600/10 dark:bg-amber-950/20 dark:text-amber-300 dark:ring-amber-500/20">
                    <Award className="h-3.5 w-3.5 fill-amber-500 text-amber-600 dark:fill-amber-400 dark:text-amber-400" />
                    {citizen.reputation_points} pts
                  </span>
                </td>
                <td className="py-4 px-4 text-center">
                  <span className="inline-flex items-center gap-1 text-slate-700 dark:text-zinc-300 font-medium">
                    <ClipboardList className="h-4 w-4 text-slate-400" />
                    {reportCount} {reportCount === 1 ? 'reporte' : 'reportes'}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ${
                      citizen.is_active
                        ? 'bg-emerald-50 text-emerald-700 ring-emerald-600/10 dark:bg-emerald-950/20 dark:text-emerald-400 dark:ring-emerald-500/20'
                        : 'bg-red-50 text-red-700 ring-red-600/10 dark:bg-red-950/20 dark:text-red-400 dark:ring-red-500/20'
                    }`}
                  >
                    {citizen.is_active ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td className="py-4 px-4 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <Button
                      variant="ghost"
                      onClick={() => onManage(citizen)}
                      className="h-9 px-3 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                    >
                      Gestionar
                    </Button>
                    <button
                      onClick={() => onToggleStatus(citizen)}
                      title={citizen.is_active ? 'Desactivar cuenta' : 'Activar cuenta'}
                      className={`p-1.5 rounded-md border transition ${
                        citizen.is_active
                          ? 'border-red-200 hover:bg-red-50 text-red-600 dark:border-red-950/30 dark:hover:bg-red-950/20'
                          : 'border-emerald-200 hover:bg-emerald-50 text-emerald-600 dark:border-emerald-950/30 dark:hover:bg-emerald-950/20'
                      }`}
                    >
                      {citizen.is_active ? (
                        <ShieldAlert className="h-4 w-4" />
                      ) : (
                        <ShieldCheck className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </Panel>
  )
}
