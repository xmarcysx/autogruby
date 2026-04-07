import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { ContactWidget } from '@/components/common/ContactWidget'
import { SITE_CONFIG } from '@/lib/constants'
import { buildLocalBusinessJsonLd } from '@/utils/seo'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `${SITE_CONFIG.name} – Komis Samochodowy Tychy | Samochody Używane`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description:
    'Auto Gruby – komis samochodowy w Tychach. Sprawdzone samochody używane, uczciwa sprzedaż, pełna historia serwisowa. Zadzwoń i umów się na jazdę próbną!',
  keywords: [
    'komis Tychy',
    'komis samochodowy Tychy',
    'samochody używane Tychy',
    'Auto Gruby',
    'auto komis Tychy',
    'używane samochody Tychy',
    'sprzedaż samochodów Tychy',
    'samochody Tychy Śląsk',
  ],
  authors: [{ name: 'Auto Gruby' }],
  creator: 'Auto Gruby',
  publisher: 'Auto Gruby',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'pl_PL',
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: `${SITE_CONFIG.name} – Komis Samochodowy Tychy`,
    description:
      'Sprawdzone samochody używane w Tychach. Uczciwa obsługa, pełna historia serwisowa, pomoc w finansowaniu.',
    images: [
      {
        url: '/og-image.jpg', // TODO: add real OG image (1200x630)
        width: 1200,
        height: 630,
        alt: 'Auto Gruby – Komis Samochodowy Tychy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_CONFIG.name} – Komis Samochodowy Tychy`,
    description: 'Sprawdzone samochody używane w Tychach. Uczciwa obsługa, pełna historia serwisowa.',
    images: ['/og-image.jpg'], // TODO: real OG image
  },
  alternates: {
    canonical: SITE_CONFIG.url,
  },
  verification: {
    // TODO: Add Google Search Console verification token
    // google: 'your-verification-token',
  },
}

export const viewport: Viewport = {
  themeColor: '#0284C7',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = buildLocalBusinessJsonLd()

  return (
    <html lang="pl" className={inter.variable}>
      <head>
        {/* Local Business structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href={process.env.NEXT_PUBLIC_SUPABASE_URL} />
      </head>
      <body className="min-h-screen bg-background">
        <Navbar />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <ContactWidget />

        {/*
          TODO: Add cookie consent banner before production launch.
          A lightweight custom implementation is recommended over heavy CMP libraries.
          See: /components/common/CookieBanner.tsx (placeholder ready)
        */}
      </body>
    </html>
  )
}
