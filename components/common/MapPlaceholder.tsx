import { SITE_CONFIG } from '@/lib/constants'
import { MapPin } from 'lucide-react'

interface MapPlaceholderProps {
  className?: string
}

export function MapPlaceholder({ className }: MapPlaceholderProps) {
  return (
    <div
      className={`w-full rounded-xl overflow-hidden border border-sky-200 shadow-sm ${className ?? ''}`}
      aria-label="Mapa lokalizacji komisu Auto Gruby w Tychach"
    >
      {/* Map iframe */}
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/7]">
        <iframe
          src="https://www.google.com/maps?q=Auto+Gruby+Tychy&output=embed"
          className="absolute inset-0 w-full h-full"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Mapa: Auto Gruby Tychy"
        />
      </div>

      {/* Contact info below map */}
      <div className="bg-white px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center shrink-0">
            <MapPin className="h-5 w-5 text-brand-blue" aria-hidden="true" />
          </div>
          <div>
            <p className="font-semibold text-slate-900 text-sm">{SITE_CONFIG.name}</p>
            <address className="not-italic text-slate-500 text-sm">{SITE_CONFIG.address}</address>
          </div>
        </div>
        <a
          href={`https://maps.google.com/?q=${encodeURIComponent(SITE_CONFIG.address)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-gold hover:underline text-sm font-medium shrink-0"
        >
          Otwórz w Google Maps →
        </a>
      </div>
    </div>
  )
}
