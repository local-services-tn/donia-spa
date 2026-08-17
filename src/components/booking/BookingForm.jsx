import { useState } from 'react'
import { useLanguage } from '../../context/LanguageContext'
import { Sun, Moon, Calendar, Clock, X, Check, MapPin, Phone, Mail } from 'lucide-react'

function createTables() {
  const tables = []
  for (let i = 1; i <= 5; i++) {
    tables.push({ id: `t6-${i}`, size: 6, status: 'available', x: (i - 1) * 60 + 100, y: 100 })
  }
  for (let i = 1; i <= 10; i++) {
    tables.push({ id: `t4-${i}`, size: 4, status: 'available', x: (i - 1) * 50 + 50, y: 250 })
  }
  return tables
}

function generateAvailableTimes() {
  const times = []
  for (let h = 6; h < 27; h++) {
    for (let m = 0; m < 60; m += 30) {
      if (h === 27 && m > 0) break
      const hr = h % 24
      const ampm = h < 12 ? 'AM' : 'PM'
      const display = h > 12 ? h - 12 : h === 0 ? 12 : h
      times.push(`${display}:${m < 10 ? '0' : ''}${m} ${ampm}`)
    }
  }
  return times
}

export default function BookingForm() {
  const { t, isArabic } = useLanguage()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    name: '',
    phone: '',
    date: '',
    time: '',
    guests: 2,
    specialRequests: ''
  })
  const [tables, setTables] = useState(createTables)
  const [selectedTable, setSelectedTable] = useState(null)

  function handleTableClick(table) {
    if (table.status === 'booked') return
    setSelectedTable(table)
    setStep(2)
  }

  function handleTimeSelect(time) {
    setForm(prev => ({ ...prev, time }))
    setTables(prev =>
      prev.map(t =>
        t.id === selectedTable.id ? { ...t, status: 'booked' } : t
      )
    )
    setStep(4)
  }

  function cancelReservation() {
    setTables(prev =>
      prev.map(t =>
        t.id === selectedTable?.id ? { ...t, status: 'available' } : t
      )
    )
    setSelectedTable(null)
    setStep(1)
    setForm({ name: '', phone: '', date: '', time: '', guests: 2, specialRequests: '' })
  }

  const availableTimes = generateAvailableTimes()

  return (
    <section className="py-20 sm:py-28 bg-background relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-12">
          <span className="font-handwriting text-lg tracking-wider text-olive">✦</span>
          <h2 className={`font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-espresso mt-2 ${isArabic ? 'font-arabic' : ''}`}>
            {t('booking.title')}
          </h2>
          <p className={`mt-3 text-stone text-sm sm:text-base max-w-md mx-auto ${isArabic ? 'font-arabic' : ''}`}>
            {t('booking.subtitle')}
          </p>
        </div>

        {/* Stepper */}
        <div className="flex justify-center items-center gap-2 mb-10">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                step >= s ? 'bg-olive text-white' : 'bg-stone/20 text-stone/60'
              }`}>
                {step > s ? <Check size={14} /> : s}
              </div>
              {s < 4 && <div className={`w-8 h-0.5 mx-1 ${step > s ? 'bg-olive' : 'bg-stone/20'}`} />}
            </div>
          ))}
        </div>

        {step === 1 && (
          <Step1
            isArabic={isArabic}
            t={t}
            tables={tables}
            selectedTable={selectedTable}
            onTableClick={handleTableClick}
            onDateSelect={(date) => { setForm(prev => ({ ...prev, date })); setStep(2) }}
            form={form}
            setForm={setForm}
            setStep={setStep}
          />
        )}
        {step === 2 && (
          <Step2
            isArabic={isArabic}
            t={t}
            form={form}
            setForm={setForm}
            setStep={setStep}
          />
        )}
        {step === 3 && (
          <Step3
            isArabic={isArabic}
            t={t}
            availableTimes={availableTimes}
            form={form}
            onTimeSelect={handleTimeSelect}
            setStep={setStep}
          />
        )}
        {step === 4 && (
          <Step4
            isArabic={isArabic}
            t={t}
            form={form}
            selectedTable={selectedTable}
            onCancel={cancelReservation}
            onNew={() => { cancelReservation() }}
          />
        )}
      </div>
    </section>
  )
}

function Step1({ isArabic, t, tables, selectedTable, onTableClick, form, setForm, setStep }) {
  return (
    <div>
      <h3 className={`text-xl font-bold text-espresso mb-6 text-center ${isArabic ? 'font-arabic' : ''}`}>
        {t('booking.tableSelection')}
      </h3>
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-8 max-w-3xl mx-auto">
        {tables.map(table => (
          <button
            key={table.id}
            onClick={() => onTableClick(table)}
            disabled={table.status === 'booked'}
            className={`rounded-2xl p-4 border text-center transition-all duration-300 ${
              table.status === 'booked'
                ? 'bg-red-50 border-red-200 text-red-400 cursor-not-allowed opacity-50'
                : selectedTable?.id === table.id
                ? 'bg-olive/10 border-olive text-olive shadow-lg'
                : 'bg-sand/80 border-gold/10 hover:border-gold/30 hover:shadow-md cursor-pointer'
            }`}
          >
            <div className="text-lg font-bold">{table.size}</div>
            <div className="text-xs mt-1">{t('booking.people')}</div>
          </button>
        ))}
      </div>
      <div className="flex items-center justify-center gap-6 text-sm text-stone mb-6">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded bg-sand border border-gold/10"></span>
          {t('map.available')}
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded bg-red-50"></span>
          {t('map.booked')}
        </div>
      </div>
      <div className="flex justify-center gap-3">
        <button
          onClick={() => setStep(2)}
          disabled={!selectedTable}
          className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
            selectedTable ? 'bg-olive text-white hover:bg-olive-dark' : 'bg-stone/20 text-stone/50 cursor-not-allowed'
          }`}
        >
          {t('booking.next')} →
        </button>
      </div>
    </div>
  )
}

function Step2({ isArabic, t, form, setForm, setStep }) {
  const today = new Date()
  const dates = []
  for (let i = 0; i < 7; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    dates.push(d)
  }

  function formatDate(d) {
    return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`
  }

  function displayDate(d) {
    const days = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam']
    const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc']
    return `${days[d.getDay()]} ${d.getDate()} ${months[d.getMonth()]}`
  }

  return (
    <div className="text-center">
      <h3 className={`text-xl font-bold text-espresso mb-6 ${isArabic ? 'font-arabic' : ''}`}>
        {t('booking.selectDate')}
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-8 max-w-4xl mx-auto">
        {dates.map((d, i) => (
          <button
            key={i}
            onClick={() => setForm(prev => ({ ...prev, date: formatDate(d) }))}
            className={`rounded-2xl p-4 border text-center transition-all duration-300 ${
              form.date === formatDate(d)
                ? 'bg-olive text-white border-olive shadow-lg'
                : 'bg-sand/80 border-gold/10 hover:border-gold/30 hover:shadow-md'
            }`}
          >
            <div className="text-xs opacity-60">{days[d.getDay()]}</div>
            <div className="text-2xl font-bold mt-1">{d.getDate()}</div>
            <div className="text-xs mt-1">{months[d.getMonth()]}</div>
          </button>
        ))}
      </div>
      <div className="flex justify-center gap-3">
        <button onClick={() => setStep(1)} className="px-6 py-3 rounded-full bg-white/20 text-espresso font-medium hover:bg-white/30 transition-all">
          ← {t('booking.back')}
        </button>
        <button
          onClick={() => setStep(3)}
          disabled={!form.date}
          className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
            form.date ? 'bg-olive text-white hover:bg-olive-dark' : 'bg-stone/20 text-stone/50 cursor-not-allowed'
          }`}
        >
          {t('booking.next')} →
        </button>
      </div>
    </div>
  )
}

function Step3({ isArabic, t, availableTimes, form, onTimeSelect, setStep }) {
  return (
    <div className="text-center">
      <h3 className={`text-xl font-bold text-espresso mb-2 ${isArabic ? 'font-arabic' : ''}`}>
        {t('booking.selectTime')}
      </h3>
      <p className="text-stone text-sm mb-6">{form.date}</p>
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3 mb-8 max-w-4xl mx-auto">
        {availableTimes.map(time => (
          <button
            key={time}
            onClick={() => onTimeSelect(time)}
            className={`p-3 rounded-xl border text-sm font-medium transition-all duration-300 ${
              form.time === time
                ? 'bg-olive text-white border-olive'
                : 'bg-sand/80 border-gold/10 hover:border-gold/30 hover:shadow-sm'
            }`}
          >
            {time}
          </button>
        ))}
      </div>
      <button onClick={() => setStep(2)} className="px-6 py-3 rounded-full bg-white/20 text-espresso font-medium hover:bg-white/30 transition-all">
        ← {t('booking.back')}
      </button>
    </div>
  )
}

function Step4({ isArabic, t, form, selectedTable, onCancel, onNew }) {
  return (
    <div className="text-center max-w-md mx-auto">
      <div className="w-16 h-16 rounded-full bg-olive/10 flex items-center justify-center mx-auto mb-6">
        <Check size={32} className="text-olive" />
      </div>
      <h3 className={`text-2xl font-bold text-espresso mb-4 ${isArabic ? 'font-arabic' : ''}`}>
        {t('booking.confirmed')}
      </h3>
      <div className="bg-sand/80 rounded-3xl p-6 sm:p-8 border border-gold/10 mb-6">
        <div className="flex items-center justify-center gap-3 mb-3">
          <Calendar size={18} className="text-olive" />
          <span className="text-lg font-bold text-olive">{form.date}</span>
        </div>
        <div className="flex items-center justify-center gap-3 mb-3">
          <Clock size={18} className="text-olive" />
          <span className="text-lg font-bold text-olive">{form.time}</span>
        </div>
        {selectedTable && (
          <div className="flex items-center justify-center gap-3 mb-3">
            <MapPin size={18} className="text-olive" />
            <span className="text-stone">Table {selectedTable.size}+ {t('booking.people')}</span>
          </div>
        )}
        <p className="text-stone text-sm mt-4">{t('booking.duration')} 2h</p>
      </div>
      <div className="flex gap-3 justify-center">
        <button
          onClick={onCancel}
          className="px-6 py-3 rounded-full bg-red-50 text-red-500 font-medium hover:bg-red-100 transition-all"
        >
          {t('booking.cancel')}
        </button>
        <button
          onClick={onNew}
          className="px-6 py-3 rounded-full bg-olive text-white font-medium hover:bg-olive-dark transition-all"
        >
          {t('booking.newReservation')}
        </button>
      </div>
    </div>
  )
}
