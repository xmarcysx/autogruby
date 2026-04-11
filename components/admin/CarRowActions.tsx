'use client'

import { deleteCarAction, toggleSoldAction } from '@/app/actions/admin/cars'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  CheckCircle2,
  CircleDot,
  Eye,
  Loader2,
  Pencil,
  Trash2,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'

interface CarRowActionsProps {
  carId: string
  carSlug: string
  sold: boolean
  variant?: 'row' | 'card'
}

function Tooltip({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="relative group/tip">
      {children}
      <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded-md bg-slate-900 border border-slate-800 text-xs text-slate-100 whitespace-nowrap opacity-0 group-hover/tip:opacity-100 transition-opacity duration-150 z-10">
        {label}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900" />
      </div>
    </div>
  )
}

export default function CarRowActions({ carId, carSlug, sold, variant = 'row' }: CarRowActionsProps) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [actionType, setActionType] = useState<'sold' | 'delete' | null>(null)
  const [soldDialogOpen, setSoldDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [actionError, setActionError] = useState<string | null>(null)

  const handleConfirmToggleSold = () => {
    setSoldDialogOpen(false)
    setActionType('sold')
    setActionError(null)
    startTransition(async () => {
      const result = await toggleSoldAction(carId, !sold)
      setActionType(null)
      if (result.error) {
        setActionError(result.error)
      } else {
        router.refresh()
      }
    })
  }

  const handleConfirmDelete = () => {
    setDeleteDialogOpen(false)
    setActionType('delete')
    setActionError(null)
    startTransition(async () => {
      const result = await deleteCarAction(carId)
      setActionType(null)
      if (result.error) {
        setActionError(result.error)
      } else {
        router.refresh()
      }
    })
  }

  return (
    <>
      {variant === 'row' ? (
        <div className="flex items-center gap-1">
          <Tooltip label="Podgląd publiczny">
            <button
              onClick={() => router.push(`/oferty/${carSlug}`)}
              disabled={pending}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            >
              <Eye className="h-4 w-4" />
            </button>
          </Tooltip>

          <Tooltip label="Edytuj">
            <button
              onClick={() => router.push(`/admin/cars/${carId}/edit`)}
              disabled={pending}
              className="p-2 rounded-lg text-slate-500 hover:text-brand-blue hover:bg-brand-blue/10 transition-colors"
            >
              <Pencil className="h-4 w-4" />
            </button>
          </Tooltip>

          <Tooltip label={sold ? 'Oznacz jako aktywne' : 'Oznacz jako sprzedane'}>
            <button
              onClick={() => setSoldDialogOpen(true)}
              disabled={pending}
              className={`p-2 rounded-lg transition-colors ${
                sold
                  ? 'text-brand-gold hover:text-white hover:bg-brand-gold/10'
                  : 'text-slate-500 hover:text-brand-gold hover:bg-brand-gold/10'
              }`}
            >
              {pending && actionType === 'sold' ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : sold ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : (
                <CircleDot className="h-4 w-4" />
              )}
            </button>
          </Tooltip>

          <Tooltip label="Usuń">
            <button
              onClick={() => setDeleteDialogOpen(true)}
              disabled={pending}
              className="p-2 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-400/10 transition-colors"
            >
              {pending && actionType === 'delete' ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="h-4 w-4" />
              )}
            </button>
          </Tooltip>
        </div>
      ) : (
        /* Card variant — large tappable buttons with labels */
        <div className="grid grid-cols-4 gap-2">
          <button
            onClick={() => router.push(`/oferty/${carSlug}`)}
            disabled={pending}
            className="flex flex-col items-center justify-center gap-1.5 min-h-[56px] rounded-xl bg-slate-50 border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-100 active:scale-95 transition-all text-xs font-medium"
          >
            <Eye className="h-5 w-5" />
            Podgląd
          </button>

          <button
            onClick={() => router.push(`/admin/cars/${carId}/edit`)}
            disabled={pending}
            className="flex flex-col items-center justify-center gap-1.5 min-h-[56px] rounded-xl bg-brand-blue/5 border border-brand-blue/20 text-brand-blue hover:bg-brand-blue/10 active:scale-95 transition-all text-xs font-medium"
          >
            <Pencil className="h-5 w-5" />
            Edytuj
          </button>

          <button
            onClick={() => setSoldDialogOpen(true)}
            disabled={pending}
            className={`flex flex-col items-center justify-center gap-1.5 min-h-[56px] rounded-xl border active:scale-95 transition-all text-xs font-medium ${
              sold
                ? 'bg-brand-gold/10 border-brand-gold/30 text-brand-gold hover:bg-brand-gold/20'
                : 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100'
            }`}
          >
            {pending && actionType === 'sold' ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : sold ? (
              <CheckCircle2 className="h-5 w-5" />
            ) : (
              <CircleDot className="h-5 w-5" />
            )}
            {sold ? 'Przywróć' : 'Sprzedane'}
          </button>

          <button
            onClick={() => setDeleteDialogOpen(true)}
            disabled={pending}
            className="flex flex-col items-center justify-center gap-1.5 min-h-[56px] rounded-xl bg-red-50 border border-red-200 text-red-500 hover:bg-red-100 active:scale-95 transition-all text-xs font-medium"
          >
            {pending && actionType === 'delete' ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Trash2 className="h-5 w-5" />
            )}
            Usuń
          </button>
        </div>
      )}

      {/* Inline error */}
      {actionError && (
        <div className="fixed bottom-4 right-4 z-50 max-w-sm bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm shadow-xl">
          {actionError}
          <button onClick={() => setActionError(null)} className="ml-3 text-red-400/60 hover:text-red-400">✕</button>
        </div>
      )}

      {/* Sold confirmation dialog */}
      <Dialog open={soldDialogOpen} onOpenChange={setSoldDialogOpen}>
        <DialogContent className="max-w-sm bg-white border-slate-200 text-slate-900">
          <DialogHeader>
            <DialogTitle className="text-slate-900">
              {sold ? 'Oznacz jako aktywne?' : 'Oznacz jako sprzedane?'}
            </DialogTitle>
            <DialogDescription className="text-slate-500">
              {sold
                ? 'Auto wróci do aktywnych ofert i będzie widoczne na stronie.'
                : 'Auto zostanie oznaczone jako sprzedane i zniknie z aktywnych ofert.'}
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-3 justify-end mt-2">
            <DialogClose asChild>
              <Button variant="ghost" className="text-slate-600 hover:text-slate-900 hover:bg-slate-100">
                Nie
              </Button>
            </DialogClose>
            <Button
              onClick={handleConfirmToggleSold}
              className="bg-brand-gold text-slate-900 hover:bg-brand-gold/90 font-semibold"
            >
              Tak, {sold ? 'przywróć' : 'sprzedane'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete confirmation dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="max-w-sm bg-white border-slate-200 text-slate-900">
          <DialogHeader>
            <DialogTitle className="text-slate-900">Usunąć auto?</DialogTitle>
            <DialogDescription className="text-slate-500">
              Ta operacja jest nieodwracalna. Auto oraz wszystkie jego zdjęcia zostaną trwale usunięte z bazy danych.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-3 justify-end mt-2">
            <DialogClose asChild>
              <Button variant="ghost" className="text-slate-600 hover:text-slate-900 hover:bg-slate-100">
                Nie
              </Button>
            </DialogClose>
            <Button
              onClick={handleConfirmDelete}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold"
            >
              Tak, usuń
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
