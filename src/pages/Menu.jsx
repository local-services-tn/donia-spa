import { useLanguage } from '../../context/LanguageContext'

export default function MenuPage() {
  const { t, isArabic } = useLanguage()

  const dishes = [
    { name: t('menu.starters'), items: ['Brik', 'Tajine olives', 'Salade tunisienne'] },
    { name: t('menu.main'), items: ['Tajine poulet', 'Tauzie', 'Couscous'] },
    { name: t('menu.desserts'), items: ['Asida', 'Baklawa', "M'hanncha"] },
    { name: t('menu.drinks'), items: ['Thé à la menthe', 'Café tunisien', 'Jus de fruit'] },
  ]

  return (
    <section className="py-20 sm:py-28 bg-cream pattern-bg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <span className="font-handwriting text-lg tracking-wider text-olive">✦</span>
          <h2 className={`font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-espresso mt-2 ${isArabic ? 'font-arabic' : ''}`}>
            {t('menu.title')}
          </h2>
          <p className={`mt-3 text-stone text-sm sm:text-base max-w-md mx-auto ${isArabic ? 'font-arabic' : ''}`}>
            {t('menu.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {dishes.map((category, i) => (
            <div
              key={i}
              className={`group bg-sand/80 rounded-3xl p-6 sm:p-8 border border-gold/10 hover:border-gold/30 transition-all duration-500 hover:shadow-lg h-full`}
            >
              <h3 className={`font-display text-xl sm:text-2xl font-bold text-espresso mb-4 ${isArabic ? 'font-arabic' : ''}`}>
                {category.name}
              </h3>
              <ul className="space-y-3 text-stone text-sm ${isArabic ? 'font-arabic' : ''}">
                {category.items.map(item => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-olive/20"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}