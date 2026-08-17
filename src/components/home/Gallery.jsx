import FadeIn from '../ui/FadeIn'
import { useLanguage } from '../../context/LanguageContext'

export default function Gallery() {
  const { t, isArabic } = useLanguage()

  const images = t('gallery.images')

  return (
    <section className="py-20 sm:py-28 bg-sand pattern-bg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <span className="font-handwriting text-lg tracking-wider text-olive">✦</span>
          <h2 className={`font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-espresso mt-2 ${isArabic ? 'font-arabic' : ''}`}>
            {t('gallery.title')}
          </h2>
          <p className={`mt-3 text-stone text-sm sm:text-base max-w-md mx-auto ${isArabic ? 'font-arabic' : ''}`}>
            {t('gallery.subtitle')}
          </p>
          <div className="mt-4 mx-auto w-16 h-0.5 bg-gold/60 rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {Array.isArray(images) && images.map((img, i) => (
            <FadeIn key={i} delay={i * 100} direction="scale-up">
              <div className="group relative rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500">
                <img
                  src={`${import.meta.env.BASE_URL}${img.src.startsWith('/') ? img.src.slice(1) : img.src}`}
                  alt={img.caption}
                  loading="lazy"
                  className="w-full h-64 sm:h-72 lg:h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-espresso/0 group-hover:bg-espresso/20 transition-all duration-500 rounded-3xl flex items-center justify-center">
                  <span className={`text-white font-display text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0 ${isArabic ? 'font-arabic' : ''}`}>
                    {img.caption}
                  </span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
