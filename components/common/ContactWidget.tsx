'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { Loader2, MessageCircle, Send } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

type FormState = 'idle' | 'sending' | 'success' | 'error'

export function ContactWidget() {
  const [open, setOpen] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const [animate, setAnimate] = useState(false)
  const [formState, setFormState] = useState<FormState>('idle')
  const tooltipTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const [fields, setFields] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [errors, setErrors] = useState<Partial<typeof fields>>({})

  // Attention animation on mount
  useEffect(() => {
    const t1 = setTimeout(() => setAnimate(true), 1500)
    const t2 = setTimeout(() => setAnimate(false), 3500)
    const t3 = setTimeout(() => setShowTooltip(true), 2000)
    const t4 = setTimeout(() => setShowTooltip(false), 5000)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    const sanitized = name === 'phone' ? value.replace(/\D/g, '').slice(0, 9) : value
    setFields((prev) => ({ ...prev, [name]: sanitized }))
    if (errors[name as keyof typeof fields]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const newErrors: Partial<typeof fields> = {}
    if (!fields.firstName.trim()) newErrors.firstName = 'Podaj imię'
    if (!fields.lastName.trim()) newErrors.lastName = 'Podaj nazwisko'
    if (!fields.phone.trim()) newErrors.phone = 'Podaj numer telefonu'
    else if (fields.phone.replace(/\s/g, '').length !== 9) newErrors.phone = 'Wpisz 9 cyfr'
    if (!fields.subject.trim()) newErrors.subject = 'Podaj temat'
    if (!fields.message.trim()) newErrors.message = 'Wpisz wiadomość'
    return newErrors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setFormState('sending')
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...fields, phone: `+48${fields.phone}` }),
      })
      if (!res.ok) throw new Error('server error')
      setFormState('success')
    } catch {
      setFormState('error')
    }
  }

  const handleOpenChange = (val: boolean) => {
    setOpen(val)
    if (!val) {
      // Reset after close animation
      setTimeout(() => {
        setFormState('idle')
        setFields({ firstName: '', lastName: '', phone: '', subject: '', message: '' })
        setErrors({})
      }, 300)
    }
  }

  return (
    <>
      {/* Floating button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
        {/* Button */}
        <button
          onClick={() => {
            setShowTooltip(false)
            setOpen(true)
          }}
          className={cn(
            'w-14 h-14 rounded-full bg-primary text-white shadow-lg shadow-primary/40 flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-primary/60 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
            animate && 'animate-soft-bounce',
          )}
          aria-label="Napisz do nas"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      </div>

      {/* Dialog */}
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-[480px] max-h-[90vh] overflow-y-auto bg-white border-slate-200 text-slate-900">
          {formState === 'success' ? (
            <div className="flex flex-col items-center gap-4 py-6 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                <Send className="w-7 h-7 text-emerald-500" />
              </div>
              <div>
                <DialogTitle className="text-xl text-slate-900 mb-1">Wiadomość wysłana!</DialogTitle>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Twoje zapytanie trafiło już do nas. Odezwiemy się tak szybko, jak to możliwe —
                  najczęściej w ciągu kilku godzin.
                </p>
              </div>
              <Button
                onClick={() => handleOpenChange(false)}
                className="mt-1 w-full bg-brand-blue hover:bg-brand-blue-dark text-white font-semibold"
              >
                Zamknij
              </Button>
            </div>
          ) : formState === 'error' ? (
            <div className="flex flex-col items-center gap-4 py-6 text-center">
              <div className="w-16 h-16 rounded-full bg-red-50 border border-red-200 flex items-center justify-center">
                <MessageCircle className="w-7 h-7 text-red-400" />
              </div>
              <div>
                <DialogTitle className="text-xl text-slate-900 mb-1">Coś poszło nie tak</DialogTitle>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Nie udało się wysłać wiadomości. Spróbuj ponownie lub zadzwoń do nas bezpośrednio.
                </p>
              </div>
              <Button
                onClick={() => setFormState('idle')}
                className="mt-1 w-full bg-brand-blue hover:bg-brand-blue-dark text-white font-semibold"
              >
                Spróbuj ponownie
              </Button>
            </div>
          ) : (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-9 h-9 rounded-full bg-brand-blue/15 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5 text-brand-blue" />
                  </div>
                  <DialogTitle className="text-xl text-slate-900">Napisz do nas</DialogTitle>
                </div>
                <DialogDescription className="text-slate-500">
                  Wypełnij formularz – odpiszemy tak szybko jak to możliwe.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4 mt-2">
                {/* Imię & Nazwisko */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="firstName" className="text-slate-600 text-xs uppercase tracking-wide font-semibold">
                      Imię <span className="text-red-400">*</span>
                    </Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={fields.firstName}
                      onChange={handleChange}
                      placeholder="Jan"
                      className={cn(
                        'bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus-visible:ring-brand-blue focus-visible:border-brand-blue',
                        errors.firstName && 'border-red-500',
                      )}
                    />
                    {errors.firstName && (
                      <p className="text-red-400 text-xs">{errors.firstName}</p>
                    )}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="lastName" className="text-slate-600 text-xs uppercase tracking-wide font-semibold">
                      Nazwisko <span className="text-red-400">*</span>
                    </Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={fields.lastName}
                      onChange={handleChange}
                      placeholder="Kowalski"
                      className={cn(
                        'bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus-visible:ring-brand-blue focus-visible:border-brand-blue',
                        errors.lastName && 'border-red-500',
                      )}
                    />
                    {errors.lastName && (
                      <p className="text-red-400 text-xs">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                {/* Telefon */}
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="phone" className="text-slate-600 text-xs uppercase tracking-wide font-semibold">
                    Telefon <span className="text-red-400">*</span>
                  </Label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3 flex items-center gap-1 text-sm text-slate-600 font-medium pointer-events-none select-none">
                      🇵🇱 +48
                    </span>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      inputMode="numeric"
                      value={fields.phone}
                      onChange={handleChange}
                      maxLength={9}
                      placeholder="600 000 000"
                      className={cn(
                        'pl-[76px] bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus-visible:ring-brand-blue focus-visible:border-brand-blue',
                        errors.phone && 'border-red-500',
                      )}
                    />
                  </div>
                  {errors.phone && <p className="text-red-400 text-xs">{errors.phone}</p>}
                </div>

                {/* Temat */}
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="subject" className="text-slate-600 text-xs uppercase tracking-wide font-semibold">
                    Temat <span className="text-red-400">*</span>
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={fields.subject}
                    onChange={handleChange}
                    placeholder="np. Zapytanie o ofertę"
                    className={cn(
                      'bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus-visible:ring-brand-blue focus-visible:border-brand-blue',
                      errors.subject && 'border-red-500',
                    )}
                  />
                  {errors.subject && <p className="text-red-400 text-xs">{errors.subject}</p>}
                </div>

                {/* Wiadomość */}
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="message" className="text-slate-600 text-xs uppercase tracking-wide font-semibold">
                    Wiadomość <span className="text-red-400">*</span>
                  </Label>
                  <textarea
                    id="message"
                    name="message"
                    value={fields.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Opisz czym możemy Ci pomóc..."
                    className={cn(
                      'flex w-full rounded-md border bg-white border-slate-200 text-slate-900 px-3 py-2 text-sm placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-50 resize-none',
                      errors.message && 'border-red-500',
                    )}
                  />
                  {errors.message && <p className="text-red-400 text-xs">{errors.message}</p>}
                </div>

                <Button
                  type="submit"
                  disabled={formState === 'sending'}
                  className="w-full mt-1 h-11 font-semibold bg-brand-blue hover:bg-brand-blue-dark text-white"
                >
                  {formState === 'sending' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Wysyłanie...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Wyślij wiadomość
                    </>
                  )}
                </Button>
              </form>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
