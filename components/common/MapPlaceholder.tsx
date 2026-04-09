import { SITE_CONFIG } from '@/lib/constants'
import { MapPin } from 'lucide-react'

interface MapPlaceholderProps {
  className?: string
}

export function MapPlaceholder({ className }: MapPlaceholderProps) {
  return (
    <div
      className={`relative w-full aspect-[16/7] bg-sky-100 rounded-xl overflow-hidden border border-sky-200 flex items-center justify-center ${className ?? ''}`}
      aria-label="Mapa lokalizacji komisu Auto Gruby w Tychach"
    >
      <iframe
        src="https://www.google.com/maps?q=Auto+Gruby+Tychy&output=embed"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Mapa: Auto Gruby Tychy"
      />
      <div className="text-center px-6">
        <div className="w-14 h-14 rounded-full bg-brand-blue/20 border border-brand-blue/30 flex items-center justify-center mx-auto mb-4">
          <MapPin className="h-7 w-7 text-brand-blue" aria-hidden="true" />
        </div>
        <p className="text-white font-semibold text-lg mb-1">{SITE_CONFIG.name}</p>
        <address className="not-italic text-slate-400 text-sm">{SITE_CONFIG.address}</address>
        <p className="text-slate-500 text-xs mt-3">
          {/* TODO: Replace with real Google Maps link */}
          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(SITE_CONFIG.address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-gold hover:underline"
          >
            Otwórz w Google Maps →
          </a>
        </p>
      </div>
    </div>
  )
}
