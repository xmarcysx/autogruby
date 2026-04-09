import AdminShell from '@/components/admin/AdminShell'

export default function AdminCarsLoading() {
  return (
    <AdminShell>
      <div className="p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="h-7 w-52 bg-slate-200 rounded-lg animate-pulse" />
            <div className="h-4 w-24 bg-slate-100 rounded animate-pulse" />
          </div>
          <div className="h-9 w-32 bg-slate-200 rounded-lg animate-pulse border border-slate-300" />
        </div>

        {/* Filters bar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 h-10 bg-sky-50 rounded-xl animate-pulse border border-sky-100" />
            <div className="flex gap-1 p-1 bg-slate-100 rounded-xl">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-8 w-20 bg-slate-200 rounded-lg animate-pulse" />
              ))}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          {/* Table header */}
          <div className="border-b border-slate-200 px-4 py-3 flex gap-4 bg-slate-50">
            <div className="h-3 w-20 bg-slate-200 rounded animate-pulse" />
            <div className="h-3 w-16 bg-slate-200 rounded animate-pulse hidden lg:block" />
            <div className="h-3 w-10 bg-slate-200 rounded animate-pulse hidden md:block" />
            <div className="h-3 w-12 bg-slate-200 rounded animate-pulse ml-auto" />
          </div>

          {/* Table rows */}
          <div className="divide-y divide-slate-100">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="px-4 py-3 flex items-center gap-4">
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-24 h-16 rounded-xl bg-slate-100 border border-slate-200 animate-pulse shrink-0" />
                  <div className="space-y-1.5 min-w-0">
                    <div className="h-4 w-40 bg-slate-200 rounded animate-pulse" />
                    <div className="h-3 w-28 bg-slate-100 rounded animate-pulse" />
                    <div className="h-3 w-20 bg-slate-100 rounded animate-pulse" />
                  </div>
                </div>
                <div className="hidden lg:flex flex-col gap-1.5 w-32">
                  <div className="h-3 w-full bg-slate-100 rounded animate-pulse" />
                  <div className="h-3 w-3/4 bg-slate-100 rounded animate-pulse" />
                </div>
                <div className="hidden md:block w-24">
                  <div className="h-4 w-20 bg-slate-200 rounded animate-pulse" />
                </div>
                <div className="w-20">
                  <div className="h-5 w-16 bg-sky-100 rounded-full animate-pulse" />
                </div>
                <div className="flex gap-1 ml-auto">
                  {Array.from({ length: 4 }).map((_, j) => (
                    <div key={j} className="w-8 h-8 rounded-lg bg-slate-100 animate-pulse" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminShell>
  )
}
