/**
 * Admin dashboard placeholder.
 *
 * TODO: Build full admin panel:
 * 1. Add car CRUD (create/edit/delete + image upload to Supabase Storage)
 * 2. Inquiry management (view/reply/close)
 * 3. Analytics (views per listing, inquiry conversion rate)
 * 4. Dashboard with KPIs (total cars, views, inquiries this week)
 *
 * Auth: protected by middleware.ts — only authenticated admins can reach this route.
 * Use createAdminClient() for privileged Supabase queries.
 */

import Link from 'next/link'
import { Construction, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function AdminPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 rounded-full bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center mx-auto mb-6">
          <Construction className="h-10 w-10 text-brand-blue" aria-hidden="true" />
        </div>

        <h1 className="text-3xl font-black text-white mb-3">Panel administracyjny</h1>
        <p className="text-slate-400 leading-relaxed mb-8">
          Panel jest w przygotowaniu. Wróć wkrótce — funkcje zarządzania ofertami, zdjęciami i
          zapytaniami będą dostępne w kolejnym etapie projektu.
        </p>

        <div className="bg-slate-900 rounded-xl border border-slate-800 p-5 text-left mb-6 space-y-2">
          <p className="text-slate-400 text-sm font-semibold mb-3">Planowane funkcje:</p>
          {[
            '✅ Dodawanie i edycja ofert samochodów',
            '✅ Upload zdjęć do Supabase Storage',
            '✅ Zarządzanie zapytaniami klientów',
            '✅ Statystyki odwiedzin i konwersji',
            '✅ Dashboard z KPI',
          ].map((item) => (
            <p key={item} className="text-xs text-slate-400">
              {item}
            </p>
          ))}
        </div>

        <Button variant="outline" asChild className="border-slate-700 text-slate-400">
          <Link href="/">
            <ArrowLeft className="h-4 w-4 mr-2" aria-hidden="true" />
            Wróć do strony głównej
          </Link>
        </Button>
      </div>
    </div>
  )
}
