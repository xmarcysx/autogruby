'use server'

import { createAdminClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function markInquiryAsRead(id: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase: any = await createAdminClient()
  await supabase
    .from('inquiries')
    .update({ status: 'read' })
    .eq('id', id)
    .eq('status', 'new')
  revalidatePath('/admin/inquiries')
}
