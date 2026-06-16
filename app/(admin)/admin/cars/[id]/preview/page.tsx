import { CarGallery } from '@/components/common/CarGallery'
import { CarSpecs } from '@/components/common/CarSpecs'
import AdminShell from '@/components/admin/AdminShell'
import { Button } from '@/components/ui/button'
import { getAdminCarById } from '@/services/admin'
import { formatPrice } from '@/utils/formatters'
import { ArrowLeft, EyeOff, Pencil } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function AdminCarPreviewPage({ params }: PageProps) {
  const { id } = await params
  const car = await getAdminCarById(id)

  if (!car) notFound()

  const images = car.car_images ?? []

  return (
    <AdminShell>
      <div className="min-h-screen bg-slate-100">
        {/* Unpublished banner */}
        {!car.published && (
          <div className="bg-red-500 text-white px-4 py-3 flex items-center justify-center gap-2 text-sm font-medium">
            <EyeOff className="h-4 w-4 shrink-0" />
            Ta oferta jest nieopublikowana — niewidoczna dla gości
            <Link
              href={`/admin/cars/${id}/edit`}
              className="ml-3 underline underline-offset-2 hover:no-underline"
            >
              Edytuj i opublikuj →
            </Link>
          </div>
        )}

        <div className="container py-8 md:py-10 max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <Button variant="ghost" size="sm" className="text-slate-600 -ml-2" asChild>
              <Link href="/admin/cars">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Lista aut
              </Link>
            </Button>
            <Button size="sm" className="bg-brand-blue hover:bg-brand-blue-dark text-white ml-auto" asChild>
              <Link href={`/admin/cars/${id}/edit`}>
                <Pencil className="h-3.5 w-3.5 mr-1.5" />
                Edytuj
              </Link>
            </Button>
          </div>

          <div className="space-y-8">
            {/* Gallery */}
            <section>
              <CarGallery images={images} carTitle={car.title} />
            </section>

            {/* Title + price */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl font-black text-slate-900 leading-tight">{car.title}</h1>
                <p className="text-slate-500 mt-1 text-sm">{car.location_city}</p>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-3xl font-black text-brand-gold">
                  {formatPrice(car.price, car.currency)}
                </p>
              </div>
            </div>

            {/* Specs */}
            <CarSpecs car={car} />

            {/* Description */}
            {car.description && (
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h2 className="text-lg font-bold text-slate-900 mb-3">Opis oferty</h2>
                <div className="prose prose-sm max-w-none text-slate-600 leading-relaxed whitespace-pre-line">
                  {car.description}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminShell>
  )
}
