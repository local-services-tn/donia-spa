import Hero from '../components/home/Hero'
import { useLanguage } from '../context/LanguageContext'

export default function HomePage() {
  const { t, isArabic } = useLanguage()

  return (
    <main className="py-20">
      <Hero />
    </main>
  )
}