import { useState, useRef, useEffect } from 'react'
import { ListFilter, Search, ChevronDown } from 'lucide-react'
import { SelectInput, TextInput } from '../../../shared/components/ui/FormControls'
import { statusLabels } from '../../../shared/utils/format'
import { priorityOptions } from '../constants/reportOptions'
import type { Area, Category, StaffUser } from '../types/report'
import type { ReportFiltersState } from '../hooks/useReportFilters'

type FilterOptions = {
  categories: Category[]
  areas: Area[]
  staff: StaffUser[]
}

type ReportFiltersProps = {
  filters: ReportFiltersState
  options: FilterOptions
  onFilterChange: <Key extends keyof ReportFiltersState>(field: Key, value: ReportFiltersState[Key]) => void
}

export function ReportFilters({ filters, options, onFilterChange }: ReportFiltersProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const activeStatuses = filters.status ? filters.status.split(',').filter(Boolean) : []

  const handleToggleStatus = (status: string) => {
    let newStatuses: string[]
    if (activeStatuses.includes(status)) {
      newStatuses = activeStatuses.filter((s) => s !== status)
    } else {
      newStatuses = [...activeStatuses, status]
    }
    onFilterChange('status', newStatuses.join(','))
  }

  const handleSelectAll = () => {
    const all = Object.keys(statusLabels)
    onFilterChange('status', all.join(','))
  }

  const handleClearAll = () => {
    onFilterChange('status', '')
  }

  const getButtonLabel = () => {
    if (activeStatuses.length === 0) return 'Sin estados'
    if (activeStatuses.length === Object.keys(statusLabels).length) return 'Todos los estados'
    return `Estados (${activeStatuses.length})`
  }

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-zinc-100">
        <ListFilter className="h-4 w-4 text-blue-700 dark:text-zinc-300" />
        Filtros rápidos
      </div>
      <div className="grid gap-3 lg:grid-cols-[minmax(220px,1.4fr)_repeat(4,minmax(130px,1fr))] xl:grid-cols-[minmax(260px,1.6fr)_repeat(7,minmax(118px,1fr))]">
        <label className="relative lg:col-span-2 xl:col-span-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={filters.search}
            onChange={(event) => onFilterChange('search', event.target.value)}
            placeholder="Buscar por título, zona o descripción"
            className="h-10 w-full rounded-md border border-slate-200 bg-white pl-9 pr-3 text-sm outline-none focus:border-blue-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
          />
        </label>

        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-10 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 text-left text-sm text-slate-700 outline-none hover:border-slate-300 focus:border-blue-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:border-zinc-600"
          >
            <span className="truncate">{getButtonLabel()}</span>
            <ChevronDown className="h-4 w-4 text-slate-400 shrink-0" />
          </button>

          {isOpen && (
            <div className="absolute left-0 z-30 mt-1 w-56 rounded-md border border-slate-200 bg-white p-2 shadow-lg outline-none dark:border-zinc-800 dark:bg-zinc-950">
              <div className="flex justify-between border-b border-slate-100 pb-1.5 mb-1.5 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={handleSelectAll}
                  className="text-xs font-semibold text-blue-700 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  Todos
                </button>
                <button
                  type="button"
                  onClick={handleClearAll}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-700 dark:text-zinc-400 dark:hover:text-zinc-300"
                >
                  Limpiar
                </button>
              </div>
              <div className="max-h-52 overflow-y-auto space-y-1">
                {Object.entries(statusLabels).map(([value, label]) => {
                  const isChecked = activeStatuses.includes(value)
                  return (
                    <label
                      key={value}
                      className="flex items-center gap-2 rounded px-2 py-1.5 text-sm cursor-pointer hover:bg-slate-50 dark:hover:bg-zinc-900/50 text-slate-700 dark:text-zinc-200"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleToggleStatus(value)}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-950"
                      />
                      <span>{label}</span>
                    </label>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        <SelectInput value={filters.category} onChange={(event) => onFilterChange('category', event.target.value)}>
          <option value="">Categorías</option>
          {options.categories.map((item) => (
            <option key={item.id} value={item.id}>{item.name}</option>
          ))}
        </SelectInput>
        <SelectInput value={filters.priority} onChange={(event) => onFilterChange('priority', event.target.value)}>
          <option value="">Prioridad</option>
          {priorityOptions.map((item) => (
            <option key={item.value} value={item.value}>{item.label}</option>
          ))}
        </SelectInput>
        <SelectInput value={filters.area} onChange={(event) => onFilterChange('area', event.target.value)}>
          <option value="">Área</option>
          {options.areas.map((item) => (
            <option key={item.id} value={item.id}>{item.name}</option>
          ))}
        </SelectInput>
        <SelectInput value={filters.responsible} onChange={(event) => onFilterChange('responsible', event.target.value)}>
          <option value="">Responsable</option>
          {options.staff.map((item) => (
            <option key={item.id} value={item.id}>{item.full_name}</option>
          ))}
        </SelectInput>
        <TextInput type="date" value={filters.fromDate} onChange={(event) => onFilterChange('fromDate', event.target.value)} className="mt-0" />
        <TextInput type="date" value={filters.toDate} onChange={(event) => onFilterChange('toDate', event.target.value)} className="mt-0" />
      </div>
    </div>
  )
}
