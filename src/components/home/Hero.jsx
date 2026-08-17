import { motion } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext'
import { ChevronDown } from 'lucide-react'

export default function Home() {
  const { t, isArabic } = useLanguage()

  return (
    <section className="relative min-h-screen bg-background">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: 'brightness(0.6)' }}
      >
        <source src={`${import.meta.env.BASE_URL}videos/restaurant-bg.mp4`} type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-espresso/80 via-transparent to-espresso/90" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`font-display text-5xl sm:text-7xl lg:text-9xl font-bold tracking-tight text-white ${isArabic ? 'font-arabic' : ''}`}
          >
            {t('hero.title')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={`mt-6 text-white/80 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed ${isArabic ? 'font-arabic' : ''}`}
          >
            {t('hero.subtitle')}
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="#booking"
              onClick={(e) => {
                e.preventDefault()
                window.scrollBy({ top: 600, behavior: 'smooth' })
              }}
              className={`glass px-8 py-3.5 rounded-full text-white font-medium text-sm tracking-wide hover:bg-white/20 transition-all duration-300 hover:scale-105 ${
                isArabic ? 'font-arabic' : ''
              }`}
            >
              {t('hero.book')}
            </a>
            <a
              href="#menu"
              onClick={(e) => {
                e.preventDefault()
                window.scrollBy({ top: 800, behavior: 'smooth' })
              }}
              className={`px-8 py-3.5 rounded-full bg-olive text-white font-medium text-sm tracking-wide hover:bg-olive-dark transition-all duration-300 hover:scale-105 shadow-lg shadow-olive/20 ${
                isArabic ? 'font-arabic' : ''
              }`}
            >
              {t('hero.explore')}
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <a href="#booking" className="text-white/50 hover:text-white/80 transition-colors">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ChevronDown className="w-8 h-8" />
          </motion.div>
        </a>
      </motion.div>
    </section>
  )
}