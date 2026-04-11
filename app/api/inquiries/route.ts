import { createAdminClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Nieprawidłowe żądanie' }, { status: 400 })
  }

  const { firstName, lastName, phone, subject, message } = body as Record<string, string>

  if (!firstName?.trim() || !lastName?.trim() || !phone?.trim() || !subject?.trim() || !message?.trim()) {
    return NextResponse.json({ error: 'Brakujące wymagane pola' }, { status: 400 })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase: any = await createAdminClient()

  const { error } = await supabase.from('inquiries').insert({
    name: `${firstName.trim()} ${lastName.trim()}`,
    phone: phone.trim(),
    subject: subject.trim(),
    message: message.trim(),
    status: 'new',
  })

  if (error) {
    console.error('[POST /api/inquiries]', error.message)
    return NextResponse.json({ error: 'Błąd serwera' }, { status: 500 })
  }

  return NextResponse.json({ success: true }, { status: 201 })
}
