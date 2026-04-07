import type { FAQItem, SiteConfig, Testimonial } from '@/types'

export const SITE_CONFIG: SiteConfig = {
  name: 'Auto Gruby',
  description:
    'Komis samochodowy w Tychach – szeroka oferta sprawdzonych samochodów używanych. Uczciwa sprzedaż, przejrzyste warunki.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://autogruby.pl',
  phone: process.env.NEXT_PUBLIC_PHONE ?? '+48 660 740 583',
  email: process.env.NEXT_PUBLIC_EMAIL ?? 'autogruby@interia.pl',
  address: process.env.NEXT_PUBLIC_ADDRESS ?? 'ul. Cielmicka 36, 43-100 Tychy',
  city: 'Tychy',
  postalCode: '43-100',
  nip: '6462932830',
  openingHours: 'Pon–Pt: 8:00–18:00, Sob: 9:00–16:00',
  socialLinks: {
    facebook: 'https://www.facebook.com/p/AUTO-GRUBY-Skup-Sprzeda%C5%BC-Import-Samochod%C3%B3w-100054259220646',
    instagram: 'https://instagram.com/autogruby', // TODO: real IG
  },
}

export const CAR_BRANDS = [
  'Audi',
  'BMW',
  'Citroën',
  'Dacia',
  'Ford',
  'Honda',
  'Hyundai',
  'Kia',
  'Mazda',
  'Mercedes-Benz',
  'Mitsubishi',
  'Nissan',
  'Opel',
  'Peugeot',
  'Renault',
  'Seat',
  'Skoda',
  'Suzuki',
  'Toyota',
  'Volkswagen',
  'Volvo',
]

export const FUEL_TYPE_LABELS: Record<string, string> = {
  benzyna: 'Benzyna',
  diesel: 'Diesel',
  hybryda: 'Hybryda',
  elektryczny: 'Elektryczny',
  lpg: 'LPG',
  'benzyna+lpg': 'Benzyna + LPG',
  hybryda_plug_in: 'Hybryda Plug-In',
}

export const TRANSMISSION_LABELS: Record<string, string> = {
  manualna: 'Manualna',
  automatyczna: 'Automatyczna',
  półautomatyczna: 'Półautomatyczna',
}

export const BODY_TYPE_LABELS: Record<string, string> = {
  sedan: 'Sedan',
  kombi: 'Kombi',
  hatchback: 'Hatchback',
  suv: 'SUV',
  crossover: 'Crossover',
  coupe: 'Coupe',
  kabriolet: 'Kabriolet',
  van: 'Van',
  pickup: 'Pickup',
}

export const DRIVE_TYPE_LABELS: Record<string, string> = {
  FWD: 'Przedni (FWD)',
  RWD: 'Tylny (RWD)',
  '4WD': '4×4 (4WD)',
  AWD: 'AWD',
}

export const CARS_PER_PAGE = 12

// TODO: Replace with real testimonials (from Google reviews, etc.)
export const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Marek Czarkowski',
    rating: 5,
    content:
      'Świetna obsługa, uczciwa rozmowa o stanie technicznym auta. Kupiłem Passata i jestem bardzo zadowolony. Polecam każdemu, kto szuka pewnego komisu w Tychach!',
    date: '2024-11-15',
    gender: 'male',
    carBought: 'Volkswagen Passat',
  },
  {
    id: '2',
    name: 'Edyta Jawroska',
    rating: 5,
    content:
      'Profesjonalne podejście, bez wciskania towaru. Doradził mi auto idealne pod moje potrzeby. Auto Gruby to komis, któremu można zaufać.',
    date: '2025-10-22',
    gender: 'female',
    carBought: 'Toyota Corolla Hybrid',
  },
  {
    id: '3',
    name: 'Piotr Wiśniewski',
    rating: 5,
    content:
      'Kupiłem tu BMW 3 – samochód sprawdzony, bez niespodzianek. Dokumentacja kompletna, historia serwisowa przejrzysta. Zdecydowanie wrócę po kolejne auto.',
    date: '2024-09-08',
    gender: 'male',
    carBought: 'BMW Seria 3',
  },
  {
    id: '4',
    name: 'Katarzyna Zając',
    rating: 5,
    content:
      'Bardzo pomocny i rzetelny sprzedawca. Nie czułam się zagubiona przy zakupie jako kobieta – wszystko wytłumaczone, żadnych ukrytych kosztów.',
    date: '2025-08-30',
    gender: 'female', 
    carBought: 'Opel Corsa',
  },
]

// TODO: Uzupełnij o prawdziwe pytania klientów
export const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'Czy samochody w komisie Auto Gruby są sprawdzone technicznie?',
    answer:
      'Tak, każdy samochód przed wystawieniem na sprzedaż przechodzi weryfikację stanu technicznego. Dokładamy wszelkich starań, by oferta odzwierciedlała rzeczywisty stan pojazdu. Na życzenie organizujemy przegląd w niezależnym warsztacie.',
  },
  {
    question: 'Czy pomagacie w formalnościach związanych z zakupem samochodu?',
    answer:
      'Tak, wspieramy na każdym etapie zakupu – od przygotowania dokumentów po wskazówki dotyczące rejestracji pojazdu. Skontaktuj się z nami, a przeprowadzimy Cię przez cały proces krok po kroku.',
  },
  {
    question: 'Czy mogę przyjechać na jazdę próbną?',
    answer:
      'Oczywiście! Zachęcamy do jazdy próbnej przed zakupem. Umów się telefonicznie lub przez formularz kontaktowy – przygotujemy auto i poświęcimy Ci czas.',
  },
  {
    question: 'Czy przyjmujecie samochody w rozliczeniu?',
    answer:
      'Tak, istnieje możliwość rozliczenia Twojego obecnego samochodu przy zakupie auta z naszej oferty. Wyceniamy pojazd uczciwie, na podstawie aktualnych cen rynkowych.',
  },
  {
    question: 'Jak wygląda historia serwisowa oferowanych aut?',
    answer:
      'Przy każdym samochodzie podajemy informacje o historii serwisowej. Wolimy pełną transparentność – jeśli auto nie ma pełnej dokumentacji, uczciwie o tym informujemy.',
  },
  {
    question: 'Czy komis znajduje się w Tychach?',
    answer:
      'Tak, Auto Gruby to komis samochodowy z siedzibą w Tychach na Śląsku. Zapraszamy do odwiedzin – jesteśmy dostępni od poniedziałku do piątku w godzinach 8:00–18:00 oraz w soboty od 9:00 do 16:00.',
  },
]
