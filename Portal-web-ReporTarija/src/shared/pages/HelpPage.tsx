import { PageHeader } from '../components/ui/PageHeader'
import { Panel } from '../components/ui/Panel'
import { HelpCircle, CheckCircle, UserCheck, ShieldAlert, FileSearch } from 'lucide-react'

export function HelpPage() {
  const faqItems = [
    {
      icon: FileSearch,
      title: '¿Cuál es el ciclo de vida de un reporte urbano?',
      description: 'Los reportes ingresan como PENDIENTE. Un funcionario los coloca EN REVISIÓN. Al asignarse a un área responsable o técnico, el estado cambia a ASIGNADO. Cuando los equipos inician obras físicas, pasa a EN PROCESO. Al finalizar, el estado se marca como RESUELTO (notificando al ciudadano). Si es inválido o no corresponde a la municipalidad, se marca como RECHAZADO.',
      color: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30'
    },
    {
      icon: ShieldAlert,
      title: '¿Por qué es obligatorio comentar al RECHAZAR un reporte?',
      description: 'Para evitar descontento ciudadano y proveer transparencia. Al marcar un reporte como RECHAZADO, el sistema obliga a registrar una justificación clara (por ejemplo: "Ubicación fuera del municipio de Tarija"). Este comentario se envía directamente como notificación a la app móvil del ciudadano.',
      color: 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30'
    },
    {
      icon: UserCheck,
      title: '¿Cómo asignar reportes correctamente?',
      description: 'Usa la mesa de "Acciones municipales" desde el detalle del reporte. Puedes seleccionar tanto el Área Municipal Responsable como el Técnico específico encargado. Al confirmar, el sistema automáticamente transiciona el estado del reporte a "ASIGNADO" para su seguimiento oportuno.',
      color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30'
    },
    {
      icon: HelpCircle,
      title: '¿Qué es el autocompletado con Inteligencia Artificial?',
      description: 'Es una herramienta de asistencia que analiza la foto de evidencia y descripción del ciudadano para clasificar y sugerir el estado de destino y el área municipal adecuada. El funcionario siempre retiene el control final y puede ajustar los campos sugeridos antes de confirmarlos.',
      color: 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/30'
    }
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        title="Centro de ayuda y documentación"
        description="Encuentra respuestas rápidas sobre el uso del Panel ReportaTarija y las reglas de gestión interna."
      />

      <div className="grid gap-6 md:grid-cols-2">
        {faqItems.map((item, index) => (
          <Panel key={index} className="flex gap-4 p-5">
            <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-lg ${item.color}`}>
              <item.icon className="h-6 w-6" />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-semibold text-slate-900 dark:text-zinc-50">{item.title}</h3>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-zinc-300">{item.description}</p>
            </div>
          </Panel>
        ))}
      </div>

      <Panel className="border-l-4 border-blue-600 p-5 bg-blue-50/50 dark:border-blue-500 dark:bg-zinc-900/50">
        <h4 className="flex items-center gap-2 font-semibold text-blue-900 dark:text-blue-400">
          <CheckCircle className="h-5 w-5" /> Guía rápida de buenas prácticas
        </h4>
        <ul className="mt-3 list-inside list-disc space-y-2 text-sm text-slate-700 dark:text-zinc-300">
          <li><strong>Mantén el historial limpio:</strong> Agrega comentarios breves y explicativos en cada cambio de estado para facilitar el trabajo de los técnicos.</li>
          <li><strong>Control de accesos:</strong> Desactiva a los funcionarios que ya no pertenezcan a la institución para proteger la seguridad del portal.</li>
          <li><strong>Alertas del mapa:</strong> La coloración de los marcadores indica la urgencia del reporte. Prioriza los marcadores rojos (URGENTES).</li>
        </ul>
      </Panel>
    </div>
  )
}
