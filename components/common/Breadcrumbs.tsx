import { cn } from '@/lib/utils'
import { ChevronRight, Home } from 'lucide-react'
import Link from 'next/link'

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  const allItems = [{ label: 'Strona główna', href: '/' }, ...items]

  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center gap-1 flex-wrap', className)}>
      <ol className="flex items-center gap-1 flex-wrap list-none p-0 m-0">
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1
          return (
            <li key={index} className="flex items-center gap-1">
              {index === 0 && (
                <Home className="h-3.5 w-3.5 text-slate-200 shrink-0" aria-hidden="true" />
              )}
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="text-sm text-slate-400 hover:text-brand-gold transition-colors"
                >
                  {index === 0 ? <span className="sr-only">Strona główna</span> : item.label}
                </Link>
              ) : (
                <span
                  className={cn(
                    'text-sm',
                    isLast ? 'text-slate-200 font-medium' : 'text-slate-400',
                  )}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {index === 0 ? <span className="sr-only">Strona główna</span> : item.label}
                </span>
              )}
              {!isLast && (
                <ChevronRight className="h-3.5 w-3.5 text-slate-600 shrink-0" aria-hidden="true" />
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
