import { useLanguage } from '../context/LanguageContext'

export default function AboutPage() {
  const { t, isArabic } = useLanguage()

  return (
    <section className="py-20 sm:py-28 bg-cream pattern-bg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <span className="font-handwriting text-lg tracking-wider text-olive">✦</span>
          <h2 className={`font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-espresso mt-2 ${isArabic ? 'font-arabic' : ''}`}>
            {t('about.title')}
          </h2>
          <p className={`mt-3 text-stone text-sm sm:text-base max-w-md mx-auto ${isArabic ? 'font-arabic' : ''}`}>
            {t('about.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Our Story */}
          <div>
            <h3 className={`font-display text-lg font-bold text-espresso mb-4 ${isArabic ? 'font-arabic' : ''}`}>
              {t('about.section1.title')}
            </h3>
            <p className={`text-stone text-sm sm:text-base leading-relaxed ${isArabic ? 'font-arabic' : ''}`}>
              {t('about.section1.desc')}
            </p>
          </div>

          {/* Chef Spotlight */}
          <div>
            <h3 className={`font-display text-lg font-bold text-espresso mb-4 ${isArabic ? 'font-arabic' : ''}`}>
              {t('about.section2.title')}
            </h3>
            <p className={`text-stone text-sm sm:text-base leading-relaxed ${isArabic ? 'font-arabic' : ''}`}>
              {t('about.section2.desc')}
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className={`font-display text-lg font-bold text-espresso mb-4 ${isArabic ? 'font-arabic' : ''}`}>
              {t('about.section3.title')}
            </h3>
            <ul className="space-y-4 text-stone text-sm ${isArabic ? 'font-arabic' : ''}">
              <li>
                <span className="font-display text-lg text-olive mr-3">📍</span>
                {t('about.contact.address')}
              </li>
              <li>
                <span className="font-display text-lg text-olive mr-3">📞</span>
                {t('about.contact.phone')}
              </li>
              <li>
                <span className="font-display text-lg text-olive mr-3">✉️</span>
                {t('about.contact.email')}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}