import { Award } from 'lucide-react'
import type { CitizenUser } from '../types/citizen'

type CitizenReputationManagerProps = {
  citizen: CitizenUser
  onAdjustPoints: (amount: number) => void
}

export function CitizenReputationManager({ citizen, onAdjustPoints }: CitizenReputationManagerProps) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900 space-y-4">
      <div className="flex items-center gap-2 border-b border-slate-100 pb-2 dark:border-zinc-800">
        <Award className="h-5 w-5 fill-amber-500 text-amber-600" />
        <h3 className="font-semibold text-slate-900 dark:text-zinc-100">Reputación</h3>
      </div>
      <div className="text-center py-2">
        <span className="text-4xl font-extrabold text-slate-900 dark:text-zinc-50">
          {citizen.reputation_points}
        </span>
        <span className="text-sm font-medium text-slate-500 block">puntos totales</span>
      </div>
      <div className="space-y-2">
        <p className="text-xs font-semibold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
          Ajustar puntos
        </p>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onAdjustPoints(10)}
            className="text-xs bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold py-1.5 px-2 rounded border border-emerald-200 text-center transition dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/30"
          >
            +10 Puntos
          </button>
          <button
            onClick={() => onAdjustPoints(50)}
            className="text-xs bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-bold py-1.5 px-2 rounded border border-emerald-300 text-center transition dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800/40"
          >
            +50 Puntos
          </button>
          <button
            onClick={() => onAdjustPoints(-10)}
            className="text-xs bg-red-50 hover:bg-red-100 text-red-700 font-semibold py-1.5 px-2 rounded border border-red-200 text-center transition dark:bg-red-950/20 dark:text-red-400 dark:border-red-900/30"
          >
            -10 Puntos
          </button>
          <button
            onClick={() => onAdjustPoints(-25)}
            className="text-xs bg-red-100 hover:bg-red-200 text-red-800 font-semibold py-1.5 px-2 rounded border border-red-300 text-center transition dark:bg-red-900/30 dark:text-red-300 dark:border-red-800/40"
          >
            -25 Puntos
          </button>
        </div>
      </div>
    </div>
  )
}
