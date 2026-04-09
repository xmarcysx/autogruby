import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import AdminShell from '@/components/admin/AdminShell'
import CarForm from '@/components/admin/CarForm'
import { getAdminCarById } from '@/services/admin'
import { updateCarAction } from '@/app/actions/admin/cars'
import type { CarFormState } from '@/app/actions/admin/cars'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function EditCarPage({ params }: PageProps) {
  const { id } = await params
  const car = await getAdminCarById(id)

  if (!car) notFound()

  // Bind the car ID to the action
  const boundAction = async (prev: CarFormState, formData: FormData): Promise<CarFormState> => {
    'use server'
    return updateCarAction(id, prev, formData)
  }

  return (
    <AdminShell>
      <div className="p-6 lg:p-8 space-y-6 max-w-5xl">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link
            href="/admin/cars"
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-black text-slate-900">Edytuj auto</h1>
            <p className="text-slate-500 text-sm mt-0.5 truncate max-w-96">{car.title}</p>
          </div>
        </div>

        <CarForm car={car} action={boundAction} submitLabel="Zapisz zmiany" />
      </div>
    </AdminShell>
  )
}
