import { motion } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext'
import { Check } from 'lucide-react'

export default function WhyChooseUs() {
  const { t, isArabic } = useLanguage()
  const reasons = t('whyUs.reasons')

  return (
    <section className="py-20 sm:py-28 bg-cream pattern-stars relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${isArabic ? 'direction-rtl' : ''}`}>
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="rounded-3xl overflow-hidden shadow-xl">
              <img
                src="/images/reception.jpg"
                alt="Donia Spa Interior"
                className="w-full h-[400px] sm:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/30 to-transparent rounded-3xl" />
            </div>
            {/* Decorative corner */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-2 border-gold/30 rounded-3xl -z-10" />
            <div className="absolute -top-4 -left-4 w-16 h-16 border-2 border-olive/20 rounded-2xl -z-10" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <span className="font-handwriting text-lg tracking-wider text-olive">✦</span>
            <h2 className={`font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-espresso mt-2 ${isArabic ? 'font-arabic' : ''}`}>
              {t('whyUs.title')}
            </h2>
            <p className={`mt-3 text-stone text-sm sm:text-base mb-8 ${isArabic ? 'font-arabic' : ''}`}>
              {t('whyUs.subtitle')}
            </p>

            <div className="space-y-6">
              {Array.isArray(reasons) && reasons.map((reason, i) => (
                <div key={i} className={`flex gap-4 ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <div className="shrink-0 w-10 h-10 rounded-full bg-olive/10 flex items-center justify-center">
                    <Check size={18} className="text-olive" />
                  </div>
                  <div>
                    <h3 className={`font-display text-lg font-bold text-espresso ${isArabic ? 'font-arabic' : ''}`}>
                      {reason.title}
                    </h3>
                    <p className={`text-stone text-sm mt-1 leading-relaxed ${isArabic ? 'font-arabic' : ''}`}>
                      {reason.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
