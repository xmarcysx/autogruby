'use client'

import { logoutAction } from '@/app/actions/auth'
import { cn } from '@/lib/utils'
import {
  BarChart3,
  Car,
  ChevronRight,
  ListOrdered,
  LogOut,
  MessageSquare,
  PlusCircle,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTransition } from 'react'

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: BarChart3, exact: true },
  { label: 'Oferty', href: '/admin/cars', icon: ListOrdered, exact: true },
  { label: 'Dodaj auto', href: '/admin/cars/new', icon: PlusCircle },
  { label: 'Zapytania', href: '/admin/inquiries', icon: MessageSquare },
]

interface AdminSidebarProps {
  onClose?: () => void
}

export default function AdminSidebar({ onClose }: AdminSidebarProps) {
  const pathname = usePathname()
  const [pending, startTransition] = useTransition()

  const handleLogout = () => {
    startTransition(async () => {
      await logoutAction()
    })
  }

  return (
    <aside className="w-64 shrink-0 bg-white border-r border-slate-200 flex flex-col min-h-screen shadow-sm md:shadow-none">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-slate-200">
        <Link href="/admin" className="flex items-center gap-3 group">
          <Image
            src="/logo.jpeg"
            alt="Auto Gruby"
            width={80}
            height={40}
            className="h-9 w-auto object-cover"
          />
          <div>
            <div className="text-sm font-black text-slate-900 leading-tight">Auto Gruby</div>
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
              onClick={onClose}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group',
                isActive
                  ? 'bg-brand-blue/10 text-brand-blue border border-brand-blue/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100',
              )}
            >
              <item.icon
                className={cn(
                  'h-4 w-4 shrink-0',
                  isActive ? 'text-brand-blue' : 'text-slate-400 group-hover:text-slate-600',
                )}
              />
              <span className="flex-1">{item.label}</span>
              {isActive && <ChevronRight className="h-3 w-3 text-brand-blue/60" />}
            </Link>
          )
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 pb-4 space-y-1 border-t border-slate-200 pt-4">
        <Link
          href="/"
          target="_blank"
          onClick={onClose}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all"
        >
          <Car className="h-4 w-4" />
          <span>Strona publiczna</span>
        </Link>
        <button
          onClick={handleLogout}
          disabled={pending}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-500 hover:text-red-600 hover:bg-red-50 transition-all"
        >
          <LogOut className="h-4 w-4" />
          <span>{pending ? 'Wylogowywanie...' : 'Wyloguj się'}</span>
        </button>
      </div>
    </aside>
  )
}
