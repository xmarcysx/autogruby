import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import AdminShell from '@/components/admin/AdminShell'
import CarForm from '@/components/admin/CarForm'
import { createCarAction } from '@/app/actions/admin/cars'

export default function NewCarPage() {
  return (
    <AdminShell>
      <div className="p-6 lg:p-8 space-y-6 max-w-5xl">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link
            href="/admin/cars"
            className="p-2 rounded-xl text-slate-500 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-black text-white">Dodaj nowe auto</h1>
            <p className="text-slate-500 text-sm mt-0.5">Uzupełnij dane oferty i dodaj zdjęcia</p>
          </div>
        </div>

        <CarForm action={createCarAction} submitLabel="Dodaj auto" />
      </div>
    </AdminShell>
  )
}
