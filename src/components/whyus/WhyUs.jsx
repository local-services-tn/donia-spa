import { useLanguage } from '../../context/LanguageContext'

export default function WhyUs() {
  const { t, isArabic } = useLanguage()

  const reasons = [
    {
      title: t('whyUs.title1'),
      desc: t('whyUs.desc1'),
      icon: '✨'
    },
    {
      title: t('whyUs.title2'),
      desc: t('whyUs.desc2'),
      icon: '🌿'
    },
    {
      title: t('whyUs.title3'),
      desc: t('whyUs.desc3'),
      icon: '🍽️'
    },
    {
      title: t('whyUs.title4'),
      desc: t('whyUs.desc4'),
      icon: '⏰'
    },
  ]

  return (
    <section className="py-20 sm:py-28 bg-cream pattern-bg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <span className="font-handwriting text-lg tracking-wider text-olive">✦</span>
          <h2 className={`font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-espresso mt-2 ${isArabic ? 'font-arabic' : ''}`}>
            {t('whyUs.title')}
          </h2>
          <p className={`mt-3 text-stone text-sm sm:text-base max-w-md mx-auto ${isArabic ? 'font-arabic' : ''}`}>
            {t('whyUs.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {reasons.map((reason, i) => (
            <div
              key={i}
              className={`bg-sand/80 rounded-3xl p-6 text-center transition-all duration-300 hover:border-gold/30 hover:shadow-lg ${isArabic ? 'text-right' : ''}`}
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-olive/10 flex items-center justify-center">
                {reason.icon}
              </div>
              <h3 className={`font-display text-lg font-bold text-espresso mb-2 ${isArabic ? 'font-arabic' : ''}`}>
                {reason.title}
              </h3>
              <p className={`text-stone text-sm leading-relaxed ${isArabic ? 'font-arabic' : ''}`}>
                {reason.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}