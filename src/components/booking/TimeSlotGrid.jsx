import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext'

export default function TimeSlotGrid({ selectedTime, onSelect, takenSlots }) {
  const { t, isArabic } = useLanguage()

  const timeSlots = useMemo(() => {
    const slots = []
    let hour = 8
    let minute = 0
    while (hour < 22 || (hour === 22 && minute === 0)) {
      const timeStr = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
      if (hour === 22 && minute > 0) break
      slots.push(timeStr)
      minute += 70
      while (minute >= 60) {
        hour += 1
        minute -= 60
      }
    }
    return slots
  }, [])

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className={`text-stone text-xs ${isArabic ? 'font-arabic' : ''}`}>
          {t('reservation.sessions')} | {t('reservation.workingHours')}
        </p>
        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-olive" />
            <span className={`text-stone ${isArabic ? 'font-arabic' : ''}`}>{t('reservation.available')}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-stone/20" />
            <span className={`text-stone ${isArabic ? 'font-arabic' : ''}`}>{t('reservation.unavailable')}</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
        {timeSlots.map((slot, i) => {
          const isTaken = takenSlots?.includes(slot)
          const isSelected = selectedTime === slot

          return (
            <motion.button
              key={slot}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.03, duration: 0.3 }}
              disabled={isTaken}
              onClick={() => onSelect(slot)}
              className={`relative py-3 px-2 rounded-xl text-sm font-medium transition-all duration-300 border-2 ${
                isTaken
                  ? 'bg-stone/5 border-stone/10 text-stone/30 cursor-not-allowed'
                  : isSelected
                  ? 'bg-olive border-olive text-white shadow-lg shadow-olive/20 scale-105'
                  : 'bg-cream border-gold/10 text-espresso hover:border-olive/40 hover:shadow-md cursor-pointer'
              }`}
              aria-label={`${slot} - ${isTaken ? t('reservation.unavailable') : t('reservation.available')}`}
              aria-pressed={isSelected}
            >
              {slot}
              {isSelected && (
                <motion.div
                  layoutId="time-selected"
                  className="absolute inset-0 rounded-xl border-2 border-olive"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
