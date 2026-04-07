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
    setFields((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof typeof fields]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const newErrors: Partial<typeof fields> = {}
    if (!fields.firstName.trim()) newErrors.firstName = 'Podaj imię'
    if (!fields.lastName.trim()) newErrors.lastName = 'Podaj nazwisko'
    if (!fields.phone.trim()) newErrors.phone = 'Podaj numer telefonu'
    else if (!/^[\d\s\+\-()]{7,}$/.test(fields.phone)) newErrors.phone = 'Nieprawidłowy numer'
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
    // TODO: replace with real API call
    await new Promise((resolve) => setTimeout(resolve, 1200))
    setFormState('success')
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
        <DialogContent className="sm:max-w-[480px] max-h-[90vh] overflow-y-auto">
          {formState === 'success' ? (
            <div className="flex flex-col items-center gap-4 py-6 text-center">
              <div className="w-16 h-16 rounded-full bg-primary/15 flex items-center justify-center">
                <Send className="w-8 h-8 text-primary" />
              </div>
              <DialogTitle className="text-xl">Wiadomość wysłana!</DialogTitle>
              <p className="text-muted-foreground text-sm">
                Odezwiemy się najszybciej jak to możliwe. Dziękujemy za kontakt.
              </p>
              <Button onClick={() => handleOpenChange(false)} className="mt-2 w-full">
                Zamknij
              </Button>
            </div>
          ) : (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5 text-primary" />
                  </div>
                  <DialogTitle className="text-xl">Napisz do nas</DialogTitle>
                </div>
                <DialogDescription>
                  Wypełnij formularz – odpiszemy tak szybko jak to możliwe.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4 mt-2">
                {/* Imię & Nazwisko */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="firstName">
                      Imię <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={fields.firstName}
                      onChange={handleChange}
                      placeholder="Jan"
                      className={cn(errors.firstName && 'border-destructive')}
                    />
                    {errors.firstName && (
                      <p className="text-destructive text-xs">{errors.firstName}</p>
                    )}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="lastName">
                      Nazwisko <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={fields.lastName}
                      onChange={handleChange}
                      placeholder="Kowalski"
                      className={cn(errors.lastName && 'border-destructive')}
                    />
                    {errors.lastName && (
                      <p className="text-destructive text-xs">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                {/* Telefon */}
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="phone">
                    Telefon <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={fields.phone}
                    onChange={handleChange}
                    placeholder="+48 600 000 000"
                    className={cn(errors.phone && 'border-destructive')}
                  />
                  {errors.phone && <p className="text-destructive text-xs">{errors.phone}</p>}
                </div>

                {/* Temat */}
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="subject">
                    Temat <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={fields.subject}
                    onChange={handleChange}
                    placeholder="np. Zapytanie o ofertę"
                    className={cn(errors.subject && 'border-destructive')}
                  />
                  {errors.subject && <p className="text-destructive text-xs">{errors.subject}</p>}
                </div>

                {/* Wiadomość */}
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="message">
                    Wiadomość <span className="text-destructive">*</span>
                  </Label>
                  <textarea
                    id="message"
                    name="message"
                    value={fields.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Opisz czym możemy Ci pomóc..."
                    className={cn(
                      'flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none',
                      errors.message && 'border-destructive',
                    )}
                  />
                  {errors.message && <p className="text-destructive text-xs">{errors.message}</p>}
                </div>

                <Button
                  type="submit"
                  disabled={formState === 'sending'}
                  className="w-full mt-1 h-11 font-semibold"
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
