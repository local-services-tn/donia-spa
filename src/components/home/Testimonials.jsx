import FadeIn from '../ui/FadeIn'
import { Star } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'

export default function Testimonials() {
  const { t, isArabic } = useLanguage()
  const testimonials = t('testimonials.items')

  return (
    <section className="py-20 sm:py-28 bg-cream pattern-stars relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <span className="font-handwriting text-lg tracking-wider text-olive">✦</span>
          <h2 className={`font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-espresso mt-2 ${isArabic ? 'font-arabic' : ''}`}>
            {t('testimonials.title')}
          </h2>
          <p className={`mt-3 text-stone text-sm sm:text-base max-w-md mx-auto ${isArabic ? 'font-arabic' : ''}`}>
            {t('testimonials.subtitle')}
          </p>
          <div className="mt-4 mx-auto w-16 h-0.5 bg-gold/60 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.isArray(testimonials) && testimonials.map((item, i) => (
            <FadeIn key={i} delay={i * 150}>
              <div className={`bg-sand/80 rounded-3xl p-6 sm:p-8 border border-gold/10 hover:shadow-lg transition-all duration-500 h-full ${
                isArabic ? 'text-right' : ''
              }`}>
                {/* Stars */}
                <div className={`flex gap-1 mb-4 ${isArabic ? 'justify-end' : ''}`}>
                  {Array.from({ length: 5 }, (_, j) => (
                    <Star
                      key={j}
                      size={16}
                      className={j < item.rating ? 'fill-gold text-gold' : 'text-stone/30'}
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className={`text-espresso/80 text-sm sm:text-base leading-relaxed italic mb-6 ${isArabic ? 'font-arabic not-italic' : ''}`}>
                  "{item.text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 border-t border-gold/10 pt-4">
                  <div className="w-10 h-10 rounded-full bg-olive/20 flex items-center justify-center text-olive font-display font-bold text-sm">
                    {item.name.charAt(0)}
                  </div>
                  <span className="font-display font-semibold text-espresso">{item.name}</span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
