import { ClipboardList } from 'lucide-react'
import { Link } from 'react-router-dom'
import { StatusBadge } from '../../../shared/components/ui/StatusBadge'
import { formatDate } from '../../../shared/utils/format'
import type { CitizenUser } from '../types/citizen'

type CitizenReportsHistoryProps = {
  reports?: CitizenUser['reports']
  onClose: () => void
}

export function CitizenReportsHistory({ reports = [], onClose }: CitizenReportsHistoryProps) {
  const reportCount = reports.length

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 border-b border-slate-100 pb-2 dark:border-zinc-800">
        <ClipboardList className="h-5 w-5 text-blue-600 dark:text-zinc-400" />
        <h3 className="font-bold text-slate-900 dark:text-zinc-100">
          Historial de Reportes ({reportCount})
        </h3>
      </div>

      {reportCount === 0 ? (
        <p className="text-sm text-slate-500 dark:text-zinc-400 py-4 text-center">
          Este ciudadano aún no ha registrado reportes urbanos.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-slate-100 dark:border-zinc-800 max-h-60 overflow-y-auto">
          <table className="w-full text-left text-sm">
            <thead className="sticky top-0 bg-slate-50 dark:bg-zinc-900 text-xs font-semibold uppercase text-slate-500 border-b border-slate-100 dark:border-zinc-800">
              <tr>
                <th className="py-2 px-3">Reporte</th>
                <th className="py-2 px-3">Estado</th>
                <th className="py-2 px-3">Fecha</th>
                <th className="py-2 px-3 text-right">Ver</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-zinc-800">
              {reports.map((report) => (
                <tr key={report.id} className="hover:bg-slate-50/50 dark:hover:bg-zinc-800/10">
                  <td className="py-2 px-3 font-medium text-slate-800 dark:text-zinc-200">
                    {report.title}
                  </td>
                  <td className="py-2 px-3">
                    <StatusBadge status={report.status} />
                  </td>
                  <td className="py-2 px-3 text-xs text-slate-500 dark:text-zinc-400">
                    {formatDate(report.created_at)}
                  </td>
                  <td className="py-2 px-3 text-right">
                    <Link
                      to={`/reports/${report.id}`}
                      onClick={onClose}
                      className="text-xs font-semibold text-blue-700 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      Ver Detalle
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
