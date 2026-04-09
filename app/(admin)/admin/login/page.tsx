'use client'

import { loginAction } from '@/app/actions/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LogIn } from 'lucide-react'
import Image from 'next/image'
import { useActionState } from 'react'

const initialState: { error?: string } = {}

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(loginAction, initialState)

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-100">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center mb-4">
            <Image
              src="/logo.jpeg"
              alt="Auto Gruby"
              width={80}
              height={40}
              className="h-20 w-auto object-contain"
            />
          </div>
          <h1 className="text-2xl font-black text-slate-900">Auto Gruby</h1>
          <p className="text-slate-500 text-sm mt-1">Panel administracyjny</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-6">Zaloguj się</h2>

          <form action={formAction} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-600 text-sm">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="admin@autogruby.pl"
                className="bg-sky-50 border-sky-200 text-slate-900 placeholder:text-slate-400 focus:border-brand-blue focus:ring-brand-blue/20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-600 text-sm">
                Hasło
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="••••••••"
                className="bg-sky-50 border-sky-200 text-slate-900 placeholder:text-slate-400 focus:border-brand-blue focus:ring-brand-blue/20"
              />
            </div>

            {state?.error && (
              <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3">
                <p className="text-red-600 text-sm">{state.error}</p>
              </div>
            )}

            <Button
              type="submit"
              disabled={pending}
              className="w-full bg-brand-blue hover:bg-brand-blue-dark text-white font-semibold h-11"
            >
              {pending ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Logowanie...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <LogIn className="h-4 w-4" />
                  Zaloguj się
                </span>
              )}
            </Button>
          </form>
        </div>

        <p className="text-center text-slate-500 text-xs mt-6">
          Auto Gruby © {new Date().getFullYear()}
        </p>
      </div>
    </div>
  )
}
