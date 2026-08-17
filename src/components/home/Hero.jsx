import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'

export default function Hero() {
  const { t, isArabic } = useLanguage()

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* Green Tint Overlay */}
      <div className="absolute inset-0 video-tint" />

      {/* Dark gradient for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-espresso/20 via-transparent to-espresso/40" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className={`font-handwriting text-xl sm:text-2xl text-gold/90 tracking-wider ${isArabic ? 'font-arabic' : ''}`}>
            {t('hero.welcome')}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className={`font-display text-5xl sm:text-7xl lg:text-8xl font-bold text-white mt-4 tracking-wider ${
            isArabic ? 'font-arabic text-4xl sm:text-6xl lg:text-7xl' : ''
          }`}
        >
          {t('hero.title')}
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mx-auto w-24 h-0.5 bg-gold/60 rounded-full mt-6"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className={`text-white/80 text-base sm:text-lg lg:text-xl mt-6 max-w-lg mx-auto leading-relaxed ${
            isArabic ? 'font-arabic text-base sm:text-lg' : ''
          }`}
        >
          {t('hero.subtitle')}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mt-10"
        >
          <a
            href="#services"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className={`glass px-8 py-3.5 rounded-full text-white font-medium text-sm tracking-wide hover:bg-white/20 transition-all duration-300 hover:scale-105 ${
              isArabic ? 'font-arabic' : ''
            }`}
          >
            {t('hero.explore')}
          </a>
          <a
            href="#reservation"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('reservation')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className={`px-8 py-3.5 rounded-full bg-olive text-white font-medium text-sm tracking-wide hover:bg-olive-dark transition-all duration-300 hover:scale-105 shadow-lg shadow-olive/20 ${
              isArabic ? 'font-arabic' : ''
            }`}
          >
            {t('hero.book')}
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <a
          href="#services"
          onClick={(e) => {
            e.preventDefault()
            document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })
          }}
          className="text-white/50 hover:text-white/80 transition-colors"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ChevronDown size={28} />
          </motion.div>
        </a>
      </motion.div>
    </section>
  )
}
