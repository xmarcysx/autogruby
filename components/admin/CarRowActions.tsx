'use client'

import { useTransition, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Pencil,
  Trash2,
  Eye,
  CheckCircle2,
  CircleDot,
  Loader2,
} from 'lucide-react'
import { toggleSoldAction, deleteCarAction } from '@/app/actions/admin/cars'

interface CarRowActionsProps {
  carId: string
  carSlug: string
  sold: boolean
}

export default function CarRowActions({ carId, carSlug, sold }: CarRowActionsProps) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [actionType, setActionType] = useState<'sold' | 'delete' | null>(null)
  const [confirmDelete, setConfirmDelete] = useState(false)

  const handleToggleSold = () => {
    setActionType('sold')
    startTransition(async () => {
      await toggleSoldAction(carId, !sold)
      setActionType(null)
    })
  }

  const handleDelete = () => {
    if (!confirmDelete) {
      setConfirmDelete(true)
      setTimeout(() => setConfirmDelete(false), 3000)
      return
    }
    setActionType('delete')
    startTransition(async () => {
      await deleteCarAction(carId)
      setActionType(null)
      router.refresh()
    })
  }

  return (
    <div className="flex items-center gap-1">
      {/* View public */}
      <a
        href={`/oferty/${carSlug}`}
        target="_blank"
        className="p-2 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-slate-700 transition-colors"
        title="Podgląd publiczny"
      >
        <Eye className="h-4 w-4" />
      </a>

      {/* Edit */}
      <a
        href={`/admin/cars/${carId}/edit`}
        className="p-2 rounded-lg text-slate-500 hover:text-brand-blue hover:bg-brand-blue/10 transition-colors"
        title="Edytuj"
      >
        <Pencil className="h-4 w-4" />
      </a>

      {/* Toggle sold */}
      <button
        onClick={handleToggleSold}
        disabled={pending}
        className={`p-2 rounded-lg transition-colors ${
          sold
            ? 'text-brand-gold hover:text-white hover:bg-brand-gold/10'
            : 'text-slate-500 hover:text-brand-gold hover:bg-brand-gold/10'
        }`}
        title={sold ? 'Oznacz jako aktywne' : 'Oznacz jako sprzedane'}
      >
        {pending && actionType === 'sold' ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : sold ? (
          <CheckCircle2 className="h-4 w-4" />
        ) : (
          <CircleDot className="h-4 w-4" />
        )}
      </button>

      {/* Delete */}
      <button
        onClick={handleDelete}
        disabled={pending}
        className={`p-2 rounded-lg transition-colors ${
          confirmDelete
            ? 'text-red-400 bg-red-400/10 animate-pulse'
            : 'text-slate-500 hover:text-red-400 hover:bg-red-400/10'
        }`}
        title={confirmDelete ? 'Kliknij ponownie aby potwierdzić usunięcie' : 'Usuń'}
      >
        {pending && actionType === 'delete' ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Trash2 className="h-4 w-4" />
        )}
      </button>
    </div>
  )
}
