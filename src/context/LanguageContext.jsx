import { createContext, useContext, useState, useCallback } from 'react'
import { translations } from '../data/translations'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('fr')

  const t = useCallback((path) => {
    const keys = path.split('.')
    let value = translations[lang]
    for (const key of keys) {
      value = value?.[key]
    }
    return value || path
  }, [lang])

  const isArabic = lang === 'ar'

  const toggleLang = useCallback(() => {
    setLang(prev => prev === 'fr' ? 'ar' : 'fr')
  }, [])

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t, isArabic }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used within LanguageProvider')
  return context
}
