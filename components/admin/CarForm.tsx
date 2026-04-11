'use client'

import type { CarFormState } from '@/app/actions/admin/cars'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { BODY_TYPE_LABELS, CAR_BRANDS, DRIVE_TYPE_LABELS, FUEL_TYPE_LABELS, TRANSMISSION_LABELS } from '@/lib/constants'
import { cn } from '@/lib/utils'
import type { Car, CarImage } from '@/types/car'
import {
  AlertCircle,
  Eye,
  ImagePlus,
  Loader2,
  Save,
  Star,
  X,
} from 'lucide-react'
import Image from 'next/image'
import { useRef, useState, useTransition } from 'react'

interface CarFormProps {
  car?: Car
  action: (prev: CarFormState, formData: FormData) => Promise<CarFormState>
  submitLabel?: string
}

const CURRENT_YEAR = new Date().getFullYear()

interface PreviewImage {
  file: File
  previewUrl: string
  isCover: boolean
}

export default function CarForm({ car, action, submitLabel = 'Zapisz' }: CarFormProps) {
  const [pending, startTransition] = useTransition()
  const [formError, setFormError] = useState<string | undefined>()
  const [previewImages, setPreviewImages] = useState<PreviewImage[]>([])
  const [existingImages, setExistingImages] = useState<CarImage[]>(car?.car_images ?? [])
  const [coverExistingId, setCoverExistingId] = useState<string | undefined>(car?.cover_image?.id)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const [brand, setBrand] = useState(car?.brand ?? '')
  const [model, setModel] = useState(car?.model ?? '')
  const [year, setYear] = useState(car?.year?.toString() ?? '')
  const [title, setTitle] = useState(car?.title ?? '')

  // Select states (needed for controlled Radix Select + FormData)
  const [fuelType, setFuelType] = useState(car?.fuel_type ?? '')
  const [transmission, setTransmission] = useState(car?.transmission ?? '')
  const [bodyType, setBodyType] = useState(car?.body_type ?? '')
  const [driveType, setDriveType] = useState(car?.drive_type ?? '')
  const [doors, setDoors] = useState(car?.doors?.toString() ?? '')
  const [seats, setSeats] = useState(car?.seats?.toString() ?? '')
  const [currency, setCurrency] = useState(car?.currency ?? 'PLN')
  const [accidentFree, setAccidentFree] = useState(car?.accident_free === false ? 'false' : 'true')
  const [serviceHistory, setServiceHistory] = useState(car?.service_history === true ? 'true' : 'false')

  const updateTitle = (b: string, m: string, y: string) => {
    const autoTitle = `${b} ${m} ${y}`.trim()
    setTitle((prev) => {
      if (!prev || prev === `${brand} ${model} ${year}`.trim()) return autoTitle
      return prev
    })
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? [])
    setPreviewImages((prev) => {
      const newImages: PreviewImage[] = files.map((file, i) => ({
        file,
        previewUrl: URL.createObjectURL(file),
        isCover: prev.length === 0 && existingImages.length === 0 && i === 0,
      }))
      return [...prev, ...newImages]
    })
    e.target.value = ''
  }

  const removePreview = (index: number) => {
    setPreviewImages((prev) => {
      URL.revokeObjectURL(prev[index].previewUrl)
      const updated = prev.filter((_, i) => i !== index)
      if (prev[index].isCover && updated.length > 0) {
        updated[0] = { ...updated[0], isCover: true }
      }
      return updated
    })
  }

  const setCoverPreview = (index: number) => {
    setPreviewImages((prev) => prev.map((img, i) => ({ ...img, isCover: i === index })))
    setCoverExistingId(undefined)
  }

  const setCoverExisting = (imageId: string) => {
    setCoverExistingId(imageId)
    setPreviewImages((prev) => prev.map((img) => ({ ...img, isCover: false })))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormError(undefined)

    const rawForm = new FormData(formRef.current!)
    const formData = new FormData()

    for (const [key, value] of rawForm.entries()) {
      if (key !== 'images') formData.append(key, value)
    }

    const coverIndex = previewImages.findIndex((img) => img.isCover)
    formData.set('cover_index', String(coverIndex))
    previewImages.forEach((img) => formData.append('images', img.file))

    if (coverExistingId) formData.set('existing_cover_id', coverExistingId)

    startTransition(async () => {
      const result = await action({}, formData)
      if (result?.error) setFormError(result.error)
    })
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
      {car && <input type="hidden" name="slug" value={car.slug} />}

      {/* Hidden inputs for controlled selects */}
      <input type="hidden" name="fuel_type" value={fuelType} />
      <input type="hidden" name="transmission" value={transmission} />
      <input type="hidden" name="body_type" value={bodyType} />
      <input type="hidden" name="drive_type" value={driveType} />
      <input type="hidden" name="doors" value={doors} />
      <input type="hidden" name="seats" value={seats} />
      <input type="hidden" name="currency" value={currency} />
      <input type="hidden" name="accident_free" value={accidentFree} />
      <input type="hidden" name="service_history" value={serviceHistory} />

      {formError && (
        <div className="flex items-start gap-3 rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3">
          <AlertCircle className="h-4 w-4 text-red-400 mt-0.5 shrink-0" />
          <p className="text-red-400 text-sm">{formError}</p>
        </div>
      )}

      {/* === SECTION: Zdjęcia === */}
      <Section title="Zdjęcia" description="Na telefonie: dotknij zdjęcie by zobaczyć opcje. Na komputerze: najedź myszką.">
        {activeMenu !== null && (
          <div
            className="fixed inset-0 z-10 sm:hidden"
            onClick={() => setActiveMenu(null)}
            aria-hidden="true"
          />
        )}

        {existingImages.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 mb-4">
            {existingImages.map((img) => {
              const menuKey = `ex-${img.id}`
              const isOpen = activeMenu === menuKey
              return (
                <div
                  key={img.id}
                  className="relative group aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 cursor-pointer"
                  onClick={() => setActiveMenu(isOpen ? null : menuKey)}
                >
                  {img.url && (
                    <Image src={img.url} alt={img.alt} fill className="object-cover" sizes="160px" />
                  )}
                  {coverExistingId === img.id && (
                    <div className={cn("absolute top-1 left-1 bg-brand-gold text-slate-900 text-[10px] font-bold px-1.5 py-0.5 rounded-md z-20", isOpen && "hidden sm:block")}>
                      Okładka
                    </div>
                  )}
                  <div
                    className={cn(
                      'absolute inset-0 bg-slate-900/70 transition-opacity z-10',
                      isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none sm:pointer-events-auto sm:group-hover:opacity-100',
                    )}
                  >
                    <div className="sm:hidden flex flex-col gap-1.5 p-2 h-full justify-center">
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setCoverExisting(img.id); setActiveMenu(null) }}
                        className="flex items-center gap-2 w-full py-1.5 px-2 rounded-lg bg-brand-gold text-slate-900 text-xs font-semibold"
                      >
                        <Star className="h-3.5 w-3.5 shrink-0" /> Okładka
                      </button>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setPreviewUrl(img.url ?? null); setActiveMenu(null) }}
                        className="flex items-center gap-2 w-full py-1.5 px-2 rounded-lg bg-sky-500 text-white text-xs font-semibold"
                      >
                        <Eye className="h-3.5 w-3.5 shrink-0" /> Podgląd
                      </button>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setExistingImages((prev) => prev.filter((i) => i.id !== img.id)); setActiveMenu(null) }}
                        className="flex items-center gap-2 w-full py-1.5 px-2 rounded-lg bg-red-500 text-white text-xs font-semibold"
                      >
                        <X className="h-3.5 w-3.5 shrink-0" /> Usuń
                      </button>
                    </div>
                    <div className="hidden sm:flex items-center justify-center gap-2 h-full">
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setCoverExisting(img.id) }}
                        className="p-2 rounded-lg bg-brand-gold text-slate-900 hover:bg-yellow-400"
                        title="Ustaw jako okładkę"
                      >
                        <Star className="h-5 w-5" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setPreviewUrl(img.url ?? null) }}
                        className="p-2 rounded-lg bg-sky-500 text-white hover:bg-sky-600"
                        title="Podgląd"
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setExistingImages((prev) => prev.filter((i) => i.id !== img.id)) }}
                        className="p-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
                        title="Usuń"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {previewImages.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 mb-4">
            {previewImages.map((img, i) => {
              const menuKey = `pre-${i}`
              const isOpen = activeMenu === menuKey
              return (
                <div
                  key={img.previewUrl}
                  className="relative group aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 cursor-pointer"
                  onClick={() => setActiveMenu(isOpen ? null : menuKey)}
                >
                  <Image src={img.previewUrl} alt={`Nowe ${i + 1}`} fill className="object-cover" sizes="160px" />
                  {img.isCover && (
                    <div className={cn("absolute top-1 left-1 bg-brand-gold text-slate-900 text-[10px] font-bold px-1.5 py-0.5 rounded-md z-20", isOpen && "hidden sm:block")}>
                      Okładka
                    </div>
                  )}
                  <div
                    className={cn(
                      'absolute inset-0 bg-slate-900/70 transition-opacity z-10',
                      isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none sm:pointer-events-auto sm:group-hover:opacity-100',
                    )}
                  >
                    <div className="sm:hidden flex flex-col gap-1.5 p-2 h-full justify-center">
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setCoverPreview(i); setActiveMenu(null) }}
                        className="flex items-center gap-2 w-full py-1.5 px-2 rounded-lg bg-brand-gold text-slate-900 text-xs font-semibold"
                      >
                        <Star className="h-3.5 w-3.5 shrink-0" /> Okładka
                      </button>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setPreviewUrl(img.previewUrl); setActiveMenu(null) }}
                        className="flex items-center gap-2 w-full py-1.5 px-2 rounded-lg bg-sky-500 text-white text-xs font-semibold"
                      >
                        <Eye className="h-3.5 w-3.5 shrink-0" /> Podgląd
                      </button>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); removePreview(i); setActiveMenu(null) }}
                        className="flex items-center gap-2 w-full py-1.5 px-2 rounded-lg bg-red-500 text-white text-xs font-semibold"
                      >
                        <X className="h-3.5 w-3.5 shrink-0" /> Usuń
                      </button>
                    </div>
                    <div className="hidden sm:flex items-center justify-center gap-2 h-full">
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setCoverPreview(i) }}
                        className="p-2 rounded-lg bg-brand-gold text-slate-900 hover:bg-yellow-400"
                        title="Okładka"
                      >
                        <Star className="h-5 w-5" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setPreviewUrl(img.previewUrl) }}
                        className="p-2 rounded-lg bg-sky-500 text-white hover:bg-sky-600"
                        title="Podgląd"
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); removePreview(i) }}
                        className="p-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
                        title="Usuń"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-dashed border-slate-300 text-slate-500 hover:text-brand-blue hover:border-brand-blue hover:bg-brand-blue/5 transition-all text-sm"
        >
          <ImagePlus className="h-4 w-4" />
          Dodaj zdjęcia
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleFileSelect}
        />
      </Section>

      {/* Image preview lightbox */}
      {previewUrl && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setPreviewUrl(null)}
          role="dialog"
          aria-label="Podgląd zdjęcia"
          aria-modal="true"
        >
          <button
            type="button"
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
            onClick={() => setPreviewUrl(null)}
            aria-label="Zamknij podgląd"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="relative w-full max-w-3xl max-h-[85vh] aspect-[4/3]" onClick={(e) => e.stopPropagation()}>
            <Image src={previewUrl} alt="Podgląd zdjęcia" fill className="object-contain" sizes="100vw" />
          </div>
        </div>
      )}

      {/* === SECTION: Podstawowe informacje === */}
      <Section title="Podstawowe informacje">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Field label="Marka *">
            <Select value={brand} onValueChange={(v) => { setBrand(v); updateTitle(v, model, year) }}>
              <SelectTrigger className={triggerClass}>
                <SelectValue placeholder="Wybierz markę" />
              </SelectTrigger>
              <SelectContent className="bg-white border-sky-200 max-h-56">
                {CAR_BRANDS.map((b) => (
                  <SelectItem key={b} value={b} className={itemClass}>{b}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <input type="hidden" name="brand" value={brand} />
          </Field>

          <Field label="Model *">
            <Input
              name="model"
              required
              value={model}
              onChange={(e) => { setModel(e.target.value); updateTitle(brand, e.target.value, year) }}
              placeholder="np. Corolla"
              className={inputClass}
            />
          </Field>

          <Field label="Generacja">
            <Input name="generation" defaultValue={car?.generation ?? ''} placeholder="np. E210" className={inputClass} />
          </Field>

          <Field label="Rok *">
            <Input
              name="year"
              type="number"
              required
              value={year}
              onChange={(e) => { setYear(e.target.value); updateTitle(brand, model, e.target.value) }}
              min={1990}
              max={CURRENT_YEAR + 1}
              placeholder={String(CURRENT_YEAR)}
              className={inputClass}
            />
          </Field>

          <Field label="Przebieg (km) *">
            <Input name="mileage" type="number" required defaultValue={car?.mileage ?? ''} min={0} placeholder="np. 80000" className={inputClass} />
          </Field>

          <Field label="Tytuł ogłoszenia *" className="sm:col-span-2 lg:col-span-3">
            <Input
              name="title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="np. Toyota Corolla 2021 Hybrid"
              className={inputClass}
            />
          </Field>
        </div>
      </Section>

      {/* === SECTION: Dane techniczne === */}
      <Section title="Dane techniczne">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Field label="Rodzaj paliwa *">
            <Select value={fuelType} onValueChange={setFuelType}>
              <SelectTrigger className={triggerClass}>
                <SelectValue placeholder="Wybierz" />
              </SelectTrigger>
              <SelectContent className="bg-white border-sky-200">
                {Object.entries(FUEL_TYPE_LABELS).map(([v, l]) => (
                  <SelectItem key={v} value={v} className={itemClass}>{l}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field label="Skrzynia biegów *">
            <Select value={transmission} onValueChange={setTransmission}>
              <SelectTrigger className={triggerClass}>
                <SelectValue placeholder="Wybierz" />
              </SelectTrigger>
              <SelectContent className="bg-white border-sky-200">
                {Object.entries(TRANSMISSION_LABELS).map(([v, l]) => (
                  <SelectItem key={v} value={v} className={itemClass}>{l}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field label="Typ nadwozia *">
            <Select value={bodyType} onValueChange={setBodyType}>
              <SelectTrigger className={triggerClass}>
                <SelectValue placeholder="Wybierz" />
              </SelectTrigger>
              <SelectContent className="bg-white border-sky-200">
                {Object.entries(BODY_TYPE_LABELS).map(([v, l]) => (
                  <SelectItem key={v} value={v} className={itemClass}>{l}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field label="Napęd">
            <Select value={driveType} onValueChange={setDriveType}>
              <SelectTrigger className={triggerClass}>
                <SelectValue placeholder="Nie podano" />
              </SelectTrigger>
              <SelectContent className="bg-white border-sky-200">
                {Object.entries(DRIVE_TYPE_LABELS).map(([v, l]) => (
                  <SelectItem key={v} value={v} className={itemClass}>{l}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field label="Pojemność silnika (cm³)">
            <Input name="engine_capacity" type="number" defaultValue={car?.engine_capacity ?? ''} min={0} max={10000} placeholder="np. 1998" className={inputClass} />
          </Field>

          <Field label="Moc (KM)">
            <Input name="engine_power_hp" type="number" defaultValue={car?.engine_power_hp ?? ''} min={0} max={2000} placeholder="np. 150" className={inputClass} />
          </Field>

          <Field label="Kolor">
            <Input name="color" defaultValue={car?.color ?? ''} placeholder="np. Czarny metalik" className={inputClass} />
          </Field>

          <Field label="Liczba drzwi">
            <Select value={doors} onValueChange={setDoors}>
              <SelectTrigger className={triggerClass}>
                <SelectValue placeholder="Nie podano" />
              </SelectTrigger>
              <SelectContent className="bg-white border-sky-200">
                {[2, 3, 4, 5].map((n) => (
                  <SelectItem key={n} value={String(n)} className={itemClass}>{n}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field label="Liczba miejsc">
            <Select value={seats} onValueChange={setSeats}>
              <SelectTrigger className={triggerClass}>
                <SelectValue placeholder="Nie podano" />
              </SelectTrigger>
              <SelectContent className="bg-white border-sky-200">
                {[2, 4, 5, 6, 7, 8, 9].map((n) => (
                  <SelectItem key={n} value={String(n)} className={itemClass}>{n}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        </div>
      </Section>

      {/* === SECTION: Historia i dokumenty === */}
      <Section title="Historia i dokumenty">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Field label="VIN">
            <Input name="vin" defaultValue={car?.vin ?? ''} placeholder="17 znaków" maxLength={17} className={`${inputClass} uppercase`} />
          </Field>

          <Field label="Nr rejestracyjny">
            <Input name="registration_number" defaultValue={car?.registration_number ?? ''} placeholder="np. SL 12345" className={`${inputClass} uppercase`} />
          </Field>

          <Field label="Kraj pochodzenia">
            <Input name="country_origin" defaultValue={car?.country_origin ?? ''} placeholder="np. Polska" className={inputClass} />
          </Field>

          <Field label="Data pierwszej rejestracji">
            <Input name="first_registration_date" type="date" defaultValue={car?.first_registration_date ?? ''} className={inputClass} />
          </Field>

          <Field label="Bezwypadkowy">
            <Select value={accidentFree} onValueChange={setAccidentFree}>
              <SelectTrigger className={triggerClass}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white border-sky-200">
                <SelectItem value="true" className={itemClass}>Tak</SelectItem>
                <SelectItem value="false" className={itemClass}>Nie</SelectItem>
              </SelectContent>
            </Select>
          </Field>

          <Field label="Historia serwisowa">
            <Select value={serviceHistory} onValueChange={setServiceHistory}>
              <SelectTrigger className={triggerClass}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white border-sky-200">
                <SelectItem value="true" className={itemClass}>Tak – udokumentowana</SelectItem>
                <SelectItem value="false" className={itemClass}>Nie / brak dokumentacji</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        </div>
      </Section>

      {/* === SECTION: Cena i lokalizacja === */}
      <Section title="Cena i lokalizacja">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Field label="Cena *">
            <Input name="price" type="number" required defaultValue={car?.price ?? ''} min={1} placeholder="np. 45000" className={inputClass} />
          </Field>

          <Field label="Waluta">
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger className={triggerClass}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white border-sky-200">
                <SelectItem value="PLN" className={itemClass}>PLN</SelectItem>
                <SelectItem value="EUR" className={itemClass}>EUR</SelectItem>
              </SelectContent>
            </Select>
          </Field>

          <Field label="Miejscowość">
            <Input name="location_city" defaultValue={car?.location_city ?? 'Tychy'} className={inputClass} />
          </Field>
        </div>
      </Section>

      {/* === SECTION: Opis === */}
      <Section title="Opis ogłoszenia">
        <textarea
          name="description"
          defaultValue={car?.description ?? ''}
          rows={6}
          placeholder="Opisz stan techniczny, historię auta, wyposażenie dodatkowe..."
          className="w-full bg-sky-50 border border-sky-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/20 resize-y min-h-[288px] md:min-h-[144px]"
        />
      </Section>

      {/* === SECTION: Ustawienia === */}
      <Section title="Ustawienia oferty">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <ToggleField name="published" label="Opublikowane" description="Widoczne dla gości" defaultValue={car?.published ?? false} />
          <ToggleField name="featured" label="Wyróżnione" description="Na stronie głównej" defaultValue={car?.featured ?? false} />
          <ToggleField name="sold" label="Sprzedane" description="Oznacz jako sprzedane" defaultValue={car?.sold ?? false} />
        </div>
      </Section>

      {/* Submit */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
        <Button
          type="button"
          variant="outline"
          className="border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          onClick={() => window.history.back()}
        >
          Anuluj
        </Button>
        <Button type="submit" disabled={pending} className="bg-brand-blue hover:bg-brand-blue-dark text-white min-w-32">
          {pending ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Zapisywanie...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              {submitLabel}
            </span>
          )}
        </Button>
      </div>
    </form>
  )
}

function Section({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 lg:p-6">
      <div className="mb-5">
        <h2 className="text-slate-900 font-bold text-sm">{title}</h2>
        {description && <p className="text-slate-500 text-xs mt-0.5">{description}</p>}
      </div>
      {children}
    </div>
  )
}

function Field({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`space-y-1.5 ${className ?? ''}`}>
      <Label className="text-slate-700 text-xs font-medium">{label}</Label>
      {children}
    </div>
  )
}

function ToggleField({ name, label, description, defaultValue }: { name: string; label: string; description: string; defaultValue: boolean }) {
  const [checked, setChecked] = useState(defaultValue)
  return (
    <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200">
      <div>
        <div className="text-sm font-medium text-slate-900">{label}</div>
        <div className="text-xs text-slate-500 mt-0.5">{description}</div>
      </div>
      <input type="hidden" name={name} value={checked ? 'true' : 'false'} />
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => setChecked((v) => !v)}
        className={`relative w-10 h-5 rounded-full transition-colors ${checked ? 'bg-brand-blue' : 'bg-slate-300'}`}
      >
        <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
      </button>
    </div>
  )
}

const inputClass = 'bg-sky-50 border-sky-200 text-slate-800 placeholder:text-slate-400 focus:border-brand-blue focus:ring-brand-blue/20 h-9 text-sm'
const triggerClass = 'bg-sky-50 border-sky-200 text-slate-800 text-sm h-9'
const itemClass = 'text-slate-800 focus:bg-sky-50 focus:text-brand-blue'
