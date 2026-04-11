import AdminShell from '@/components/admin/AdminShell'
import { InquiryList } from '@/components/admin/InquiryList'
import { getAdminInquiries } from '@/services/admin'

export default async function AdminInquiriesPage() {
  const inquiries = await getAdminInquiries()
  const newCount = inquiries.filter((i) => i.status === 'new').length

  return (
    <AdminShell>
      <div className="p-6 lg:p-8 space-y-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900">Zapytania klientów</h1>
            <p className="text-slate-500 text-sm mt-1">
              {inquiries.length === 0
                ? 'Brak zapytań'
                : `${inquiries.length} ${inquiries.length === 1 ? 'zapytanie' : 'zapytań'}`}
              {newCount > 0 && (
                <span className="ml-2 inline-flex items-center gap-1 bg-brand-blue text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {newCount} nowych
                </span>
              )}
            </p>
          </div>
        </div>

        <InquiryList inquiries={inquiries} />
      </div>
    </AdminShell>
  )
}
