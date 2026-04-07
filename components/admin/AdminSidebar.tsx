'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTransition } from 'react'
import {
  Car,
  BarChart3,
  ListOrdered,
  MessageSquare,
  LogOut,
  PlusCircle,
  ChevronRight,
} from 'lucide-react'
import { logoutAction } from '@/app/actions/auth'
import { cn } from '@/lib/utils'

const navItems = [
  {
    label: 'Dashboard',
    href: '/admin',
    icon: BarChart3,
    exact: true,
  },
  {
    label: 'Oferty',
    href: '/admin/cars',
    icon: ListOrdered,
  },
  {
    label: 'Dodaj auto',
    href: '/admin/cars/new',
    icon: PlusCircle,
  },
  {
    label: 'Zapytania',
    href: '/admin/inquiries',
    icon: MessageSquare,
  },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const [pending, startTransition] = useTransition()

  const handleLogout = () => {
    startTransition(async () => {
      await logoutAction()
    })
  }

  return (
    <aside className="w-64 shrink-0 bg-slate-900 border-r border-slate-800 flex flex-col min-h-screen">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-slate-800">
        <Link href="/admin" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center group-hover:border-brand-blue/40 transition-colors">
            <Car className="h-5 w-5 text-brand-blue" />
          </div>
          <div>
            <div className="text-sm font-black text-white leading-tight">Auto Gruby</div>
            <div className="text-xs text-slate-500">Panel admina</div>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group',
                isActive
                  ? 'bg-brand-blue/10 text-brand-blue border border-brand-blue/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800',
              )}
            >
              <item.icon
                className={cn(
                  'h-4 w-4 shrink-0',
                  isActive ? 'text-brand-blue' : 'text-slate-500 group-hover:text-slate-300',
                )}
              />
              <span className="flex-1">{item.label}</span>
              {isActive && <ChevronRight className="h-3 w-3 text-brand-blue/60" />}
            </Link>
          )
        })}
      </nav>

      {/* Bottom: links + logout */}
      <div className="px-3 pb-4 space-y-1 border-t border-slate-800 pt-4">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-500 hover:text-white hover:bg-slate-800 transition-all"
        >
          <Car className="h-4 w-4" />
          <span>Strona publiczna</span>
        </Link>
        <button
          onClick={handleLogout}
          disabled={pending}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-500 hover:text-red-400 hover:bg-red-500/5 transition-all"
        >
          <LogOut className="h-4 w-4" />
          <span>{pending ? 'Wylogowywanie...' : 'Wyloguj się'}</span>
        </button>
      </div>
    </aside>
  )
}
