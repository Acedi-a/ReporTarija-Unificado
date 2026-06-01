import { useState } from 'react'
import { HelpCircle } from 'lucide-react'

type TooltipProps = {
  content: string
  children?: React.ReactNode
}

export function Tooltip({ content, children }: TooltipProps) {
  const [visible, setVisible] = useState(false)

  return (
    <div className="relative inline-flex items-center">
      <div
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        onFocus={() => setVisible(true)}
        onBlur={() => setVisible(false)}
        className="cursor-help"
      >
        {children || <HelpCircle className="h-4 w-4 text-slate-400 hover:text-slate-600 dark:text-zinc-500 dark:hover:text-zinc-300" />}
      </div>
      {visible && (
        <div className="absolute bottom-full left-1/2 z-50 mb-2 w-48 -translate-x-1/2 rounded-md bg-slate-950 px-3 py-2 text-xs font-normal text-white shadow-xl dark:bg-zinc-800 animate-in fade-in-0 slide-in-from-bottom-1 pointer-events-none">
          <p>{content}</p>
          <div className="absolute top-full left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-slate-950 dark:bg-zinc-800" />
        </div>
      )}
    </div>
  )
}
