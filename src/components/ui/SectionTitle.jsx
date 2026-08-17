import { useLanguage } from '../../context/LanguageContext'

export default function SectionTitle({ title, subtitle, light = false }) {
  const { isArabic } = useLanguage()
  return (
    <div className={`text-center mb-12 ${isArabic ? 'direction-rtl' : ''}`}>
      <span className={`font-handwriting text-lg tracking-wider ${light ? 'text-gold' : 'text-olive'}`}>
        ✦
      </span>
      <h2 className={`font-display text-3xl sm:text-4xl lg:text-5xl font-bold mt-2 ${
        light ? 'text-white' : 'text-espresso'
      } ${isArabic ? 'font-arabic' : ''}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-3 text-sm sm:text-base max-w-md mx-auto ${
          light ? 'text-white/70' : 'text-stone'
        } ${isArabic ? 'font-arabic' : ''}`}>
          {subtitle}
        </p>
      )}
      <div className={`mt-4 mx-auto w-16 h-0.5 rounded-full ${light ? 'bg-gold' : 'bg-gold/60'}`} />
    </div>
  )
}
