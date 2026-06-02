import { useEffect } from 'react'
import { AlertTriangle, X } from 'lucide-react'
import { Button } from './Button'

type ConfirmDialogProps = {
  open: boolean
  title: string
  message: string
  confirmLabel?: string
  cancelLabel?: string
  isConfirming?: boolean
  variant?: 'danger' | 'primary'
  onConfirm: () => void
  onClose: () => void
}

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  isConfirming = false,
  variant = 'primary',
  onConfirm,
  onClose,
}: ConfirmDialogProps) {
  // Listen for ESC key to close
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

  if (!open) return null

  const confirmBtnStyles = variant === 'danger' 
    ? 'bg-red-600 hover:bg-red-700 text-white dark:bg-red-700 dark:hover:bg-red-800'
    : 'bg-blue-700 hover:bg-blue-800 text-white dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-200'

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/40 px-4 py-6 backdrop-blur-xs" role="dialog" aria-modal="true">
      <div className="w-full max-w-md overflow-hidden rounded-lg border border-slate-200 bg-white shadow-2xl animate-in fade-in-0 zoom-in-95 duration-200 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/50 px-5 py-4 dark:border-zinc-800 dark:bg-zinc-950/50">
          <div className="flex items-center gap-2">
            {variant === 'danger' && <AlertTriangle className="h-5 w-5 text-red-500" />}
            <h3 className="text-base font-semibold text-slate-950 dark:text-zinc-50">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-slate-500 hover:bg-slate-100 dark:text-zinc-400 dark:hover:bg-zinc-900"
            aria-label="Cerrar confirmación"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="p-5">
          <p className="text-sm text-slate-600 dark:text-zinc-300 leading-relaxed">{message}</p>
        </div>
        <div className="flex items-center justify-end gap-2 border-t border-slate-100 bg-slate-50/30 px-5 py-3 dark:border-zinc-800 dark:bg-zinc-950/20">
          <Button variant="secondary" onClick={onClose} disabled={isConfirming}>
            {cancelLabel}
          </Button>
          <button
            onClick={onConfirm}
            disabled={isConfirming}
            className={`inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-semibold shadow-xs disabled:pointer-events-none disabled:opacity-50 transition-colors ${confirmBtnStyles}`}
          >
            {isConfirming ? 'Procesando...' : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
