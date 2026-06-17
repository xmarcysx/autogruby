import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { Button } from '@/components/ui/button'
import { CarFront, Home, Search } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-[70vh] flex items-center justify-center px-4 py-24">
        <div className="text-center max-w-md">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-brand-blue/10 border border-brand-blue/20">
            <CarFront className="h-10 w-10 text-brand-blue" />
          </div>
          <h1 className="text-6xl font-black text-slate-900">404</h1>
          <p className="mt-3 text-lg font-bold text-slate-800">
            Ups, ta strona zjechała z trasy
          </p>
          <p className="mt-2 text-slate-500 text-sm">
            Nie znaleźliśmy strony, której szukasz. Może została usunięta albo nigdy nie istniała.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg">
              <Link href="/">
                <Home className="h-4 w-4" />
                Strona główna
              </Link>
            </Button>
            <Button asChild variant="gold" size="lg">
              <Link href="/oferty">
                <Search className="h-4 w-4" />
                Przeglądaj oferty
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
