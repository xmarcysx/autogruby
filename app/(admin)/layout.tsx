/**
 * Admin layout — isolated from public layout (no Navbar/Footer).
 *
 * TODO: Build the full admin panel here.
 * Architecture notes:
 * - This route group is protected by middleware.ts (requires Supabase Auth session)
 * - Use createAdminClient() from lib/supabase/server.ts for privileged operations
 * - Recommended structure when expanding:
 *   app/(admin)/admin/
 *     ├── layout.tsx          ← sidebar, header, navigation
 *     ├── page.tsx            ← dashboard with stats
 *     ├── oferty/
 *     │   ├── page.tsx        ← list & manage all cars (CRUD)
 *     │   ├── nowe/page.tsx   ← add new car
 *     │   └── [id]/page.tsx   ← edit car + upload photos
 *     ├── zapytania/page.tsx  ← view inquiries
 *     ├── statystyki/page.tsx ← analytics (views per car, popular listings)
 *     └── login/page.tsx      ← admin login (Supabase Auth)
 */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {children}
    </div>
  )
}
