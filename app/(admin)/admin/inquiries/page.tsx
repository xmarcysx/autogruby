import { MessageSquare, Phone, Mail, Clock } from 'lucide-react'
import AdminShell from '@/components/admin/AdminShell'
import { Badge } from '@/components/ui/badge'
import { getAdminInquiries } from '@/services/admin'

const STATUS_LABELS: Record<string, string> = {
  new: 'Nowe',
  read: 'Przeczytane',
  replied: 'Odpowiedziano',
  closed: 'Zamknięte',
}

const STATUS_STYLES: Record<string, string> = {
  new: 'bg-brand-blue/10 text-brand-blue border-brand-blue/20',
  read: 'bg-slate-100 text-slate-600 border-slate-200',
  replied: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  closed: 'bg-slate-100 text-slate-400 border-slate-200',
}

export default async function AdminInquiriesPage() {
  const inquiries = await getAdminInquiries()

  return (
    <AdminShell>
      <div className="p-6 lg:p-8 space-y-6">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Zapytania klientów</h1>
          <p className="text-slate-500 text-sm mt-1">
            {inquiries.length} {inquiries.length === 1 ? 'zapytanie' : 'zapytań'}
          </p>
        </div>

        {inquiries.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center mb-4">
              <MessageSquare className="h-7 w-7 text-brand-blue/40" />
            </div>
            <p className="text-slate-700 font-medium">Brak zapytań</p>
            <p className="text-slate-400 text-sm mt-1">Zapytania od klientów pojawią się tutaj</p>
          </div>
        ) : (
          <div className="space-y-3">
            {inquiries.map((inquiry) => (
              <div
                key={inquiry.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 hover:border-sky-300 hover:shadow-sm transition-all shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-slate-900 font-semibold text-sm">{inquiry.name}</span>
                      <Badge className={`text-xs ${STATUS_STYLES[inquiry.status] ?? STATUS_STYLES.new}`}>
                        {STATUS_LABELS[inquiry.status] ?? inquiry.status}
                      </Badge>
                    </div>

                    <p className="text-slate-600 text-sm leading-relaxed mb-3 line-clamp-3">
                      {inquiry.message}
                    </p>

                    <div className="flex flex-wrap gap-4">
                      {inquiry.phone && (
                        <a
                          href={`tel:${inquiry.phone}`}
                          className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-brand-blue transition-colors"
                        >
                          <Phone className="h-3.5 w-3.5" />
                          {inquiry.phone}
                        </a>
                      )}
                      {inquiry.email && (
                        <a
                          href={`mailto:${inquiry.email}`}
                          className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-brand-blue transition-colors"
                        >
                          <Mail className="h-3.5 w-3.5" />
                          {inquiry.email}
                        </a>
                      )}
                      <span className="flex items-center gap-1.5 text-xs text-slate-400">
                        <Clock className="h-3.5 w-3.5" />
                        {new Date(inquiry.created_at).toLocaleDateString('pl-PL', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminShell>
  )
}
