import { useState, useMemo } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'

const MONTHS_FR = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
const MONTHS_AR = ['جانفي', 'فيفري', 'مارس', 'أفريل', 'ماي', 'جوان', 'جويلية', 'أوت', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر']
const DAYS_FR = ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di']
const DAYS_AR = ['إثن', 'ثلا', 'أرب', 'خمي', 'جمع', 'سبت', 'أحد']

export default function DatePicker({ selectedDate, onSelect }) {
  const { lang, isArabic } = useLanguage()
  const today = new Date()
  const [currentMonth, setCurrentMonth] = useState(today.getMonth())
  const [currentYear, setCurrentYear] = useState(today.getFullYear())

  const months = isArabic ? MONTHS_AR : MONTHS_FR
  const days = isArabic ? DAYS_AR : DAYS_FR

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const firstDay = (new Date(currentYear, currentMonth, 1).getDay() + 6) % 7

  const calendarDays = useMemo(() => {
    const arr = []
    for (let i = 0; i < firstDay; i++) arr.push(null)
    for (let d = 1; d <= daysInMonth; d++) arr.push(d)
    return arr
  }, [firstDay, daysInMonth])

  const formatDate = (day) => {
    const d = new Date(currentYear, currentMonth, day)
    return d.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
  }

  const isPast = (day) => {
    const d = new Date(currentYear, currentMonth, day)
    const t = new Date()
    t.setHours(0, 0, 0, 0)
    return d < t
  }

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(y => y - 1)
    } else {
      setCurrentMonth(m => m - 1)
    }
  }

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(y => y + 1)
    } else {
      setCurrentMonth(m => m + 1)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          className="p-2 rounded-lg hover:bg-sage/50 transition-colors text-stone"
          aria-label="Previous month"
        >
          <ChevronLeft size={18} />
        </button>
        <h4 className="font-display text-lg font-bold text-espresso">
          {months[currentMonth]} {currentYear}
        </h4>
        <button
          onClick={nextMonth}
          className="p-2 rounded-lg hover:bg-sage/50 transition-colors text-stone"
          aria-label="Next month"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {days.map((day) => (
          <div key={day} className={`text-center text-xs font-medium text-stone py-1 ${isArabic ? 'font-arabic' : ''}`}>
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((day, i) => {
          if (day === null) return <div key={`empty-${i}`} />
          const past = isPast(day)
          const isSelected = selectedDate === formatDate(day)
          return (
            <button
              key={day}
              disabled={past}
              onClick={() => onSelect(formatDate(day))}
              className={`py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                past
                  ? 'text-stone/25 cursor-not-allowed'
                  : isSelected
                  ? 'bg-olive text-white shadow-md'
                  : 'text-espresso hover:bg-sage/50 cursor-pointer'
              }`}
              aria-label={formatDate(day)}
              aria-pressed={isSelected}
            >
              {day}
            </button>
          )
        })}
      </div>
    </div>
  )
}
