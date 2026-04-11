'use client'

import { markInquiryAsRead } from '@/app/(admin)/admin/inquiries/actions'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import type { Inquiry } from '@/types/car'
import { Clock, Mail, MessageSquare, Phone } from 'lucide-react'
import { useState } from 'react'

// ── helpers ──────────────────────────────────────────────────────────────────

function timeAgo(dateStr: string): string {
  const diffMs = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diffMs / 60_000)
  const hours = Math.floor(mins / 60)
  const days = Math.floor(hours / 24)
  if (mins < 1) return 'przed chwilą'
  if (mins < 60) return `${mins} min temu`
  if (hours < 24) return `${hours} godz. temu`
  if (days === 1) return 'wczoraj'
  if (days < 7) return `${days} dni temu`
  if (days < 14) return 'tydzień temu'
  return `${Math.floor(days / 7)} tyg. temu`
}

function whatsappHref(phone: string): string {
  const digits = phone.replace(/\D/g, '')
  const normalized = digits.startsWith('48') ? digits : `48${digits.replace(/^0/, '')}`
  return `https://wa.me/${normalized}`
}

// ── status config ─────────────────────────────────────────────────────────────

const STATUS_LABELS: Record<string, string> = {
  new: 'Nowe',
  read: 'Przeczytane',
  replied: 'Odpowiedziano',
  closed: 'Zamknięte',
}

const STATUS_STYLES: Record<string, string> = {
  new: 'bg-brand-blue/10 text-brand-blue border-brand-blue/20',
  read: 'bg-slate-100 text-slate-500 border-slate-200',
  replied: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  closed: 'bg-slate-100 text-slate-400 border-slate-200',
}

const WA_ICON = (
  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current shrink-0" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

// ── component ─────────────────────────────────────────────────────────────────

interface Props {
  inquiries: Inquiry[]
}

export function InquiryList({ inquiries: initial }: Props) {
  const [inquiries, setInquiries] = useState<Inquiry[]>(initial)
  const [selected, setSelected] = useState<Inquiry | null>(null)

  // New first, then by date desc within each group
  const sorted = [...inquiries].sort((a, b) => {
    if (a.status === 'new' && b.status !== 'new') return -1
    if (a.status !== 'new' && b.status === 'new') return 1
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  })

  const handleOpen = async (inquiry: Inquiry) => {
    if (inquiry.status === 'new') {
      const updated = { ...inquiry, status: 'read' as const }
      setInquiries((prev) => prev.map((i) => (i.id === inquiry.id ? updated : i)))
      setSelected(updated)
      await markInquiryAsRead(inquiry.id)
    } else {
      setSelected(inquiry)
    }
  }

  if (inquiries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl border border-slate-200 shadow-sm">
        <div className="w-14 h-14 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center mb-4">
          <MessageSquare className="h-7 w-7 text-brand-blue/40" />
        </div>
        <p className="text-slate-700 font-medium">Brak zapytań</p>
        <p className="text-slate-400 text-sm mt-1">Zapytania od klientów pojawią się tutaj</p>
      </div>
    )
  }

  return (
    <>
      <div className="space-y-2">
        {sorted.map((inquiry) => {
          const isNew = inquiry.status === 'new'
          return (
            <div
              key={inquiry.id}
              className={`relative rounded-2xl border transition-all ${
                isNew
                  ? 'bg-sky-50/60 border-brand-blue/25 shadow-sm shadow-brand-blue/5'
                  : 'bg-white border-slate-200'
              }`}
            >
              {/* New accent bar */}
              {isNew && (
                <div className="absolute left-0 top-3 bottom-3 w-1 rounded-full bg-brand-blue" />
              )}

              <div className="pl-5 pr-4 py-3.5">
                {/* Top row: icon + name/badge + desktop actions */}
                <div className="flex items-start gap-3">
                  {/* Icon — hidden on mobile */}
                  <div
                    className={`hidden sm:flex w-9 h-9 rounded-full items-center justify-center shrink-0 mt-0.5 ${
                      isNew ? 'bg-brand-blue/15' : 'bg-slate-100'
                    }`}
                  >
                    <MessageSquare
                      className={`h-4 w-4 ${isNew ? 'text-brand-blue' : 'text-slate-400'}`}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    {/* Name + badge */}
                    <div className="flex flex-wrap items-center gap-1.5 mb-0.5">
                      <span
                        className={`text-sm font-semibold leading-snug ${
                          isNew ? 'text-slate-900' : 'text-slate-700'
                        }`}
                      >
                        {inquiry.name}
                      </span>
                      <Badge
                        className={`text-xs ${STATUS_STYLES[inquiry.status] ?? STATUS_STYLES.new}`}
                      >
                        {STATUS_LABELS[inquiry.status] ?? inquiry.status}
                      </Badge>
                    </div>

                    {/* Subject */}
                    {inquiry.subject && (
                      <p
                        className={`text-sm truncate ${
                          isNew ? 'font-medium text-slate-800' : 'text-slate-500'
                        }`}
                      >
                        {inquiry.subject}
                      </p>
                    )}

                    {/* Meta: time + phone (phone truncated on mobile) */}
                    <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                      <Clock className="h-3 w-3 text-slate-400 shrink-0" />
                      <span
                        className={`text-xs ${
                          isNew ? 'text-brand-blue font-semibold' : 'text-slate-400'
                        }`}
                      >
                        {timeAgo(inquiry.created_at)}
                      </span>
                      {inquiry.phone && (
                        <>
                          <span className="text-slate-300 text-xs">·</span>
                          <span className="text-xs text-slate-400 truncate max-w-[120px] sm:max-w-none">
                            {inquiry.phone}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Desktop actions — vertical stack */}
                  <div className="hidden sm:flex flex-col gap-1.5 shrink-0">
                    <Button
                      size="sm"
                      onClick={() => handleOpen(inquiry)}
                      className="text-xs h-8 px-3 bg-brand-blue hover:bg-brand-blue-dark text-white"
                    >
                      Otwórz
                    </Button>
                    {inquiry.phone && (
                      <Button variant="gold" size="sm" className="text-xs h-8 px-3" asChild>
                        <a href={`tel:${inquiry.phone.replace(/\s/g, '')}`}>
                          <Phone className="h-3.5 w-3.5" />
                          Zadzwoń
                        </a>
                      </Button>
                    )}
                  </div>
                </div>

                {/* Mobile actions — full-width row below content */}
                <div className="flex sm:hidden gap-2 mt-3">
                  <Button
                    size="sm"
                    onClick={() => handleOpen(inquiry)}
                    className="flex-1 text-xs h-9 bg-brand-blue hover:bg-brand-blue-dark text-white"
                  >
                    Otwórz
                  </Button>
                  {inquiry.phone && (
                    <Button variant="gold" size="sm" className="flex-1 text-xs h-9" asChild>
                      <a href={`tel:${inquiry.phone.replace(/\s/g, '')}`}>
                        <Phone className="h-3.5 w-3.5" />
                        Zadzwoń
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Detail dialog */}
      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="w-[calc(100vw-2rem)] sm:max-w-[460px] max-h-[90vh] overflow-y-auto bg-white border-slate-200 text-slate-900">
          {selected && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center shrink-0">
                    <MessageSquare className="h-5 w-5 text-brand-blue" />
                  </div>
                  <div>
                    <DialogTitle className="text-slate-900 font-bold leading-tight">
                      {selected.name}
                    </DialogTitle>
                    <span className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                      <Clock className="h-3 w-3" />
                      {timeAgo(selected.created_at)}
                      {' · '}
                      {new Date(selected.created_at).toLocaleDateString('pl-PL', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-4 mt-1">
                {/* Subject + message */}
                <div className="bg-slate-50 rounded-xl border border-slate-200 px-4 py-3 space-y-2">
                  {selected.subject && (
                    <p className="text-sm font-semibold text-slate-900">{selected.subject}</p>
                  )}
                  <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">
                    {selected.message}
                  </p>
                </div>

                {/* Contact info */}
                <div className="flex flex-wrap gap-3">
                  {selected.phone && (
                    <div className="flex items-center gap-1.5 text-sm text-slate-600">
                      <Phone className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                      {selected.phone}
                    </div>
                  )}
                  {selected.email && (
                    <div className="flex items-center gap-1.5 text-sm text-slate-600">
                      <Mail className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                      {selected.email}
                    </div>
                  )}
                </div>

                {/* Action buttons */}
                <div className="flex flex-col gap-2">
                  {selected.phone && (
                    <>
                      <Button variant="gold" size="lg" className="w-full" asChild>
                        <a href={`tel:${selected.phone.replace(/\s/g, '')}`}>
                          <Phone className="h-4 w-4" />
                          Zadzwoń teraz
                        </a>
                      </Button>
                      <a
                        href={whatsappHref(selected.phone)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 h-11 rounded-md bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold text-sm transition-colors"
                      >
                        {WA_ICON}
                        WhatsApp
                      </a>
                    </>
                  )}
                  {selected.email && (
                    <a
                      href={`mailto:${selected.email}`}
                      className="flex items-center justify-center gap-2 h-10 rounded-md border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium text-sm transition-colors"
                    >
                      <Mail className="h-4 w-4" />
                      Wyślij e-mail
                    </a>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
