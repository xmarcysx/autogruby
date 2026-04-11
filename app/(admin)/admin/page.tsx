import { Car, TrendingUp, MessageSquare, Eye, ArrowUpRight } from 'lucide-react'
import AdminShell from '@/components/admin/AdminShell'
import { ViewsAreaChart, WeeklyBarChart } from '@/components/admin/DashboardCharts'
import { getAdminStats, getAdminViewsChart, getAdminWeeklyActivity, getAdminTopCars } from '@/services/admin'

export default async function AdminDashboardPage() {
  const [stats, viewsData, weeklyData, topCars] = await Promise.all([
    getAdminStats(),
    getAdminViewsChart(),
    getAdminWeeklyActivity(),
    getAdminTopCars(),
  ])

  const kpiCards = [
    {
      label: 'Aktywne oferty',
      value: stats.activeCars,
      icon: Car,
      color: 'text-brand-blue',
      bg: 'bg-brand-blue/10',
      border: 'border-brand-blue/20',
    },
    {
      label: 'Sprzedane auta',
      value: stats.soldCars,
      icon: TrendingUp,
      color: 'text-brand-gold-dark',
      bg: 'bg-brand-gold/10',
      border: 'border-brand-gold/20',
    },
    {
      label: 'Nowe zapytania',
      value: stats.newInquiries,
      icon: MessageSquare,
      color: 'text-emerald-600',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20',
    },
    {
      label: 'Odwiedzin (30 dni)',
      value: stats.viewsLast30Days || viewsData.reduce((s, d) => s + d.views, 0),
      icon: Eye,
      color: 'text-purple-600',
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/20',
    },
  ]

  return (
    <AdminShell>
      <div className="p-6 lg:p-8 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-black text-slate-900">Dashboard</h1>
          <p className="text-slate-500 text-sm mt-1">Przegląd statystyk i aktywności komisu</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {kpiCards.map((card) => (
            <div
              key={card.label}
              className={`bg-white rounded-2xl border ${card.border} p-5 shadow-sm`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-slate-500 text-sm font-medium">{card.label}</span>
                <div className={`w-9 h-9 rounded-xl ${card.bg} border ${card.border} flex items-center justify-center`}>
                  <card.icon className={`h-4 w-4 ${card.color}`} />
                </div>
              </div>
              <div className={`text-3xl font-black ${card.color}`}>{card.value}</div>
            </div>
          ))}
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-slate-900 font-bold text-sm">Wyświetlenia ofert</h2>
                <p className="text-slate-500 text-xs mt-0.5">Ostatnie 30 dni</p>
              </div>
              {stats.viewsGrowthPct !== null && (
                <div className={`flex items-center gap-1 text-xs font-medium rounded-lg px-2 py-1 ${stats.viewsGrowthPct >= 0 ? 'text-emerald-600 bg-emerald-50' : 'text-red-500 bg-red-50'}`}>
                  <ArrowUpRight className="h-3 w-3" />
                  <span>{stats.viewsGrowthPct >= 0 ? '+' : ''}{stats.viewsGrowthPct}% vs. poprzedni miesiąc</span>
                </div>
              )}
            </div>
            <ViewsAreaChart data={viewsData} />
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div className="mb-5">
              <h2 className="text-slate-900 font-bold text-sm">Aktywność tygodniowa</h2>
              <p className="text-slate-500 text-xs mt-0.5">Bieżący tydzień</p>
            </div>
            <div className="flex items-center gap-4 mb-3">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-sm bg-brand-blue" />
                <span className="text-slate-500 text-xs">Wyświetlenia</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-sm bg-brand-gold" />
                <span className="text-slate-500 text-xs">Zapytania</span>
              </div>
            </div>
            <WeeklyBarChart data={weeklyData} />
          </div>
        </div>

        {/* Bottom row */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-slate-900 font-bold text-sm">Najpopularniejsze oferty</h2>
              <span className="text-slate-400 text-xs">ostatnie 30 dni</span>
            </div>
            {topCars.length === 0 ? (
              <p className="text-slate-400 text-sm text-center py-6">Brak danych o wyświetleniach</p>
            ) : (
              <div className="space-y-3">
                {topCars.map((car, i) => (
                  <div key={car.id} className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center text-xs font-bold text-brand-blue">
                      {i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-slate-800 truncate">{car.title}</div>
                    </div>
                    <div className="text-xs font-semibold text-brand-blue bg-brand-blue/10 rounded-lg px-2 py-1 shrink-0">
                      {car.views} wyśw.
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <h2 className="text-slate-900 font-bold text-sm mb-4">Szybkie akcje</h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Dodaj nowe auto', href: '/admin/cars/new', icon: Car },
                { label: 'Lista ofert', href: '/admin/cars', icon: Car },
                { label: 'Zapytania klientów', href: '/admin/inquiries', icon: MessageSquare },
                { label: 'Strona publiczna', href: '/oferty', icon: Eye },
              ].map((action) => (
                <a
                  key={action.href}
                  href={action.href}
                  className="flex flex-col gap-2 p-4 rounded-xl bg-sky-50 border border-sky-200 hover:border-brand-blue hover:bg-sky-100 transition-all group"
                >
                  <action.icon className="h-5 w-5 text-brand-blue/60 group-hover:text-brand-blue transition-colors" />
                  <span className="text-xs font-medium text-slate-600 group-hover:text-slate-900 transition-colors leading-tight">
                    {action.label}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminShell>
  )
}
