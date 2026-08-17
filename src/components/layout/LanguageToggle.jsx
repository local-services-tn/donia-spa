import { useLanguage } from '../../context/LanguageContext'

export default function LanguageToggle({ scrolled, isHome }) {
  const { lang, toggleLang, isArabic } = useLanguage()

  return (
    <button
      onClick={toggleLang}
      className={`px-3 py-1.5 rounded-full text-xs font-bold tracking-wider transition-all duration-300 border ${
        scrolled || !isHome
          ? 'border-espresso/20 text-espresso hover:bg-espresso hover:text-white'
          : 'border-white/30 text-white hover:bg-white/20'
      }`}
      aria-label={`Switch to ${isArabic ? 'French' : 'Arabic'}`}
    >
      {isArabic ? 'FR' : 'ع'}
    </button>
  )
}
