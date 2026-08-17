import { useLanguage } from '../../context/LanguageContext'

export default function Services() {
  const { t, isArabic } = useLanguage()
  const services = t('services.items')
  const icons = ['💆', '🧖', '✨', '🌿', '💅', '💇']

  return (
    <section id="services" className="py-20 sm:py-28 bg-cream pattern-bg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <span className="font-handwriting text-lg tracking-wider text-olive">✦</span>
          <h2 className={`font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-espresso mt-2 ${isArabic ? 'font-arabic' : ''}`}>
            {t('services.title')}
          </h2>
          <p className={`mt-3 text-stone text-sm sm:text-base max-w-md mx-auto ${isArabic ? 'font-arabic' : ''}`}>
            {t('services.subtitle')}
          </p>
          <div className="mt-4 mx-auto w-16 h-0.5 bg-gold/60 rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(services) && services.map((service, i) => (
            <div
              key={i}
              className={`group bg-sand/80 rounded-3xl p-6 sm:p-8 border border-gold/10 hover:border-gold/30 transition-all duration-500 hover:shadow-lg hover:-translate-y-1 ${
                isArabic ? 'text-right' : ''
              }`}
            >
              <div className="text-4xl mb-4">{icons[i]}</div>
              <h3 className={`font-display text-xl sm:text-2xl font-bold text-espresso mb-2 ${isArabic ? 'font-arabic' : ''}`}>
                {service.name}
              </h3>
              <p className={`text-stone text-sm leading-relaxed mb-4 ${isArabic ? 'font-arabic' : ''}`}>
                {service.desc}
              </p>
              <div className="flex items-center justify-between border-t border-gold/10 pt-4">
                <span className="font-display text-lg font-bold text-olive">{service.price}</span>
                <span className={`text-xs text-stone ${isArabic ? 'font-arabic' : ''}`}>{service.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
