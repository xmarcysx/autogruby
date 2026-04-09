export default function OffersLoading() {
  return (
    <div className="min-h-screen bg-slate-100 pt-24">
      {/* Page header skeleton */}
      <div className="bg-sky-600">
        <div className="container py-8">
          <div className="h-4 w-32 bg-sky-500/60 rounded animate-pulse mb-4" />
          <div className="h-9 w-72 bg-sky-500/60 rounded animate-pulse" />
          <div className="h-4 w-48 bg-sky-500/40 rounded animate-pulse mt-2" />
        </div>
      </div>

      <div className="container py-8 md:py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar skeleton */}
          <aside className="w-full lg:w-72 xl:w-80 shrink-0">
            <div className="bg-white rounded-xl border border-sky-200 p-5 space-y-5 shadow-sm">
              <div className="h-5 w-20 bg-slate-200 rounded animate-pulse" />
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="h-3 w-16 bg-slate-200 rounded animate-pulse" />
                  <div className="h-9 w-full bg-sky-50 rounded-md animate-pulse border border-sky-100" />
                </div>
              ))}
            </div>
          </aside>

          {/* Main content skeleton */}
          <div className="flex-1 min-w-0">
            {/* Search + sort bar */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="flex-1 h-10 bg-white rounded-lg animate-pulse border border-sky-200 shadow-sm" />
              <div className="w-48 h-10 bg-white rounded-lg animate-pulse border border-sky-200 shadow-sm" />
            </div>

            {/* Cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl border border-sky-200 overflow-hidden animate-pulse shadow-sm"
                >
                  <div className="aspect-[4/3] bg-slate-200" />
                  <div className="p-4 space-y-2.5">
                    <div className="h-4 w-3/4 bg-slate-200 rounded" />
                    <div className="h-3 w-1/2 bg-slate-100 rounded" />
                    <div className="flex gap-2 pt-1">
                      <div className="h-5 w-16 bg-sky-100 rounded-full" />
                      <div className="h-5 w-20 bg-sky-100 rounded-full" />
                    </div>
                    <div className="h-9 w-full bg-sky-100 rounded-xl mt-2" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
