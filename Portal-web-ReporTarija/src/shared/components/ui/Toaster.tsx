import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react'

export type ToastType = 'success' | 'error' | 'info' | 'warning'

export type Toast = {
  id: string
  message: string
  type: ToastType
}

type ToastContextValue = {
  toast: (message: string, type?: ToastType) => void
  success: (message: string) => void
  error: (message: string) => void
  info: (message: string) => void
  warning: (message: string) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast debe usarse dentro de un ToastProvider')
  }
  return context
}

type ToastProviderProps = {
  children: ReactNode
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const removeToast = useCallback((id: string) => {
    setToasts((current) => current.filter((t) => t.id !== id))
  }, [])

  const addToast = useCallback((message: string, type: ToastType = 'info') => {
    const id = Math.random().toString(36).substring(2, 9)
    setToasts((current) => [...current, { id, message, type }])

    // Auto-remove after 4 seconds
    setTimeout(() => {
      removeToast(id)
    }, 4000)
  }, [removeToast])

  const success = useCallback((msg: string) => addToast(msg, 'success'), [addToast])
  const error = useCallback((msg: string) => addToast(msg, 'error'), [addToast])
  const info = useCallback((msg: string) => addToast(msg, 'info'), [addToast])
  const warning = useCallback((msg: string) => addToast(msg, 'warning'), [addToast])

  return (
    <ToastContext.Provider value={{ toast: addToast, success, error, info, warning }}>
      {children}
      {/* Toast container */}
      <div className="fixed right-4 top-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onClose={() => removeToast(t.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

function ToastItem({ toast, onClose }: { toast: Toast; onClose: () => void }) {
  const bgClasses = {
    success: 'bg-emerald-50 border-emerald-200 text-emerald-950 dark:bg-emerald-950/20 dark:border-emerald-800/50 dark:text-emerald-300',
    error: 'bg-rose-50 border-rose-200 text-rose-950 dark:bg-rose-950/20 dark:border-rose-800/50 dark:text-rose-300',
    info: 'bg-blue-50 border-blue-200 text-blue-950 dark:bg-blue-950/20 dark:border-blue-800/50 dark:text-blue-300',
    warning: 'bg-amber-50 border-amber-200 text-amber-950 dark:bg-amber-950/20 dark:border-amber-800/50 dark:text-amber-300',
  }

  const Icon = {
    success: CheckCircle,
    error: AlertCircle,
    info: Info,
    warning: AlertCircle,
  }[toast.type]

  return (
    <div
      className={`pointer-events-auto flex items-start gap-3 rounded-lg border p-3.5 shadow-lg backdrop-blur-sm transition-all duration-300 animate-in fade-in-0 slide-in-from-top-4 ${bgClasses[toast.type]}`}
      role="alert"
    >
      <Icon className="h-5 w-5 shrink-0" />
      <div className="flex-1 text-sm font-medium leading-5">{toast.message}</div>
      <button
        onClick={onClose}
        className="rounded-md p-0.5 text-current hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
        aria-label="Cerrar notificación"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}
