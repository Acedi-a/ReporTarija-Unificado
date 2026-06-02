import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react'
import { cn } from '../../../lib/utils'
import { Tooltip } from './Tooltip'

const controlClass =
  'w-full rounded-md border border-slate-200 bg-white text-sm outline-none focus:border-blue-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50'

type FieldShellProps = {
  label?: string
  tooltip?: string
  children: ReactNode
  className?: string
}

function FieldShell({ label, tooltip, children, className }: FieldShellProps) {
  return (
    <label className={cn('block', className)}>
      {label ? (
        <span className="flex items-center gap-1.5 text-sm font-medium text-slate-700 dark:text-zinc-200">
          {label}
          {tooltip ? <Tooltip content={tooltip} /> : null}
        </span>
      ) : null}
      {children}
    </label>
  )
}

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  tooltip?: string
}

export function TextInput({ label, tooltip, className, ...props }: TextInputProps) {
  return (
    <FieldShell label={label} tooltip={tooltip}>
      <input className={cn('mt-1 h-10 px-3', controlClass, className)} {...props} />
    </FieldShell>
  )
}

type SelectInputProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string
  tooltip?: string
  children: ReactNode
}

export function SelectInput({ label, tooltip, className, children, ...props }: SelectInputProps) {
  return (
    <FieldShell label={label} tooltip={tooltip}>
      <select className={cn(label ? 'mt-1' : '', 'h-10 px-3', controlClass, className)} {...props}>
        {children}
      </select>
    </FieldShell>
  )
}

type TextareaInputProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string
  tooltip?: string
}

export function TextareaInput({ label, tooltip, className, ...props }: TextareaInputProps) {
  return (
    <FieldShell label={label} tooltip={tooltip}>
      <textarea className={cn('mt-1 min-h-24 p-3', controlClass, className)} {...props} />
    </FieldShell>
  )
}

