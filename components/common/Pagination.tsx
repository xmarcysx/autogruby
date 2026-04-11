import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'

interface PaginationProps {
  currentPage: number
  totalPages: number
  buildHref: (page: number) => string
}

export function Pagination({ currentPage, totalPages, buildHref }: PaginationProps) {
  if (totalPages <= 1) return null

  const pages = getPageNumbers(currentPage, totalPages)

  return (
    <nav aria-label="Paginacja" className="flex justify-center">
      <ol className="flex items-center gap-1">
        {/* Previous */}
        <li>
          {currentPage > 1 ? (
            <Link
              href={buildHref(currentPage - 1)}
              className="flex items-center justify-center w-9 h-9 rounded-lg border border-slate-700 text-slate-400 hover:border-brand-blue hover:text-brand-blue transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
              aria-label="Poprzednia strona"
              rel="prev"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            </Link>
          ) : (
            <span className="flex items-center justify-center w-9 h-9 rounded-lg border border-slate-800 text-slate-600 cursor-not-allowed">
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            </span>
          )}
        </li>

        {/* Page numbers */}
        {pages.map((page, index) => (
          <li key={index}>
            {page === 'ellipsis' ? (
              <span className="flex items-center justify-center w-9 h-9 text-slate-500">…</span>
            ) : (
              <Link
                href={buildHref(page)}
                className={cn(
                  'flex items-center justify-center w-9 h-9 rounded-lg border text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold',
                  page === currentPage
                    ? 'border-brand-blue bg-brand-blue text-white'
                    : 'border-slate-700 text-slate-700 hover:border-brand-blue hover:text-brand-blue',
                )}
                aria-label={`Strona ${page}`}
                aria-current={page === currentPage ? 'page' : undefined}
              >
                {page}
              </Link>
            )}
          </li>
        ))}

        {/* Next */}
        <li>
          {currentPage < totalPages ? (
            <Link
              href={buildHref(currentPage + 1)}
              className="flex items-center justify-center w-9 h-9 rounded-lg border border-slate-700 text-slate-400 hover:border-brand-blue hover:text-brand-blue transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
              aria-label="Następna strona"
              rel="next"
            >
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          ) : (
            <span className="flex items-center justify-center w-9 h-9 rounded-lg border border-slate-800 text-slate-600 cursor-not-allowed">
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </span>
          )}
        </li>
      </ol>
    </nav>
  )
}

function getPageNumbers(current: number, total: number): (number | 'ellipsis')[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  const pages: (number | 'ellipsis')[] = []

  pages.push(1)

  if (current > 3) pages.push('ellipsis')

  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  if (current < total - 2) pages.push('ellipsis')

  pages.push(total)

  return pages
}
