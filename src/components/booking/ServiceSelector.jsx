import { motion } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext'

export default function ServiceSelector({ selected, onSelect }) {
  const { t, isArabic } = useLanguage()
  const services = t('services.items')
  const icons = ['💆', '🧖', '✨', '🌿', '💅', '💇']

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {Array.isArray(services) && services.map((service, i) => {
        const isSelected = selected === i
        return (
          <motion.button
            key={i}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(i)}
            className={`p-4 rounded-2xl text-left transition-all duration-300 border-2 ${
              isSelected
                ? 'bg-olive/10 border-olive shadow-md'
                : 'bg-cream border-gold/10 hover:border-olive/30'
            } ${isArabic ? 'text-right' : ''}`}
          >
            <span className="text-2xl">{icons[i]}</span>
            <h4 className={`font-display text-sm font-bold text-espresso mt-2 ${isArabic ? 'font-arabic text-xs' : ''}`}>
              {service.name}
            </h4>
            <p className="text-olive text-xs font-medium mt-1">{service.price}</p>
          </motion.button>
        )
      })}
    </div>
  )
}
