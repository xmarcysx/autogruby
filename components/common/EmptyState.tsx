import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface EmptyStateProps {
  title?: string
  description?: string
  action?: {
    label: string
    href: string
  }
}

export function EmptyState({
  title = 'Brak ofert spełniających kryteria',
  description = 'Spróbuj zmienić filtry lub wyszukaj inne auto.',
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="w-20 h-20 rounded-full bg-sky-100 border border-sky-200 flex items-center justify-center mb-5">
        <Search className="h-9 w-9 text-brand-blue/50" aria-hidden="true" />
      </div>
      <h3 className="text-xl font-semibold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-600 max-w-sm">{description}</p>
      {action && (
        <Button variant="gold" size="lg" className="mt-6" asChild>
          <Link href={action.href}>{action.label}</Link>
        </Button>
      )}
    </div>
  )
}
