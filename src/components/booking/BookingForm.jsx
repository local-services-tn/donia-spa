import { useState } from 'react'
import { useLanguage } from '../../context/LanguageContext'
import { Sun, Moon, Calendar, Clock, X, Check, MapPin, Phone, Mail } from 'lucide-react'

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

  const [tables, setTables] = useState(createTables())
  const [selectedTable, setSelectedTable] = useState(null)
  const [availableTimes, setAvailableTimes] = useState([])
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false)

  // Create 15 tables: 5 for 6 people, 10 for 2-4 people
  function createTables() {
    const tables = []
    // 5 tables for 6 people
    for (let i = 1; i <= 5; i++) {
      tables.push({ id: `t6-${i}`, size: 6, status: 'available', x: (i - 1) * 60 + 100, y: 100 })
    }
    // 10 tables for 2-4 people
    for (let i = 1; i <= 10; i++) {
      tables.push({ id: `t4-${i}`, size: 4, status: 'available', x: (i - 1) * 50 + 50, y: 250 })
    }
    return tables
  }

  // Generate available times (every 30 min from 6am to 1am next day)
  function generateAvailableTimes(selectedDate) {
    const times = []
    let current = new Date(selectedDate)
    current.setHours(6, 0, 0) // 6am start

    while (current.getHours() < 27) { // 1am next day = 27:00
      times.push(formatTime(current))
      current = new Date(current.getTime() + 30 * 60000) // +30min
    }
    return times
  }

  function formatTime(date) {
    const h = date.getHours() % 12 || 12
    const m = date.getMinutes()
    const ampm = date.getHours() < 12 ? 'AM' : 'PM'
    return `${h}:${m < 10 ? '0' : ''}${m} ${ampm}`
  }

  // Check if table is available at given time
  function isTableAvailable(table, dateTimeStr) {
    // Simplified: table is available if not already booked at that time
    // In a real app, would check against bookings database
    const bookings = getBookingsForDate(date)
    return !bookings.some(b => b.tableId === table.id && b.time === dateTimeStr)
  }

  // Get bookings for a date (mock data)
  function getBookingsForDate(dateStr) {
    // Mock - would come from API
    return []
  }

  // Merge tables logic
  function mergeTables(tableId1, tableId2) {
    const t1 = tables.find(t => t.id === tableId1)
    const t2 = tables.find(t => t.id === tableId2)
    if (!t1 || !t2) return null

    // 8 = 2 four-tables → one six-table
    // 12 = 2 six-tables → one... well, we don't have that combo, but logic would be
    const newSize = t1.size + t2.size
    return { id: `merged-${t1.id}-${t2.id}`, size: newSize, status: 'merged', x: t1.x, y: t1.y }
  }

  // Handle table click
  function handleTableClick(table) {
    if (table.status === 'merged') {
      // If merged, split back
      setSelectedTable(null)
      return
    }
    setSelectedTable(table)
    // Generate available times for this table and date
    if (form.date && selectedTable) {
      setAvailableTimes(generateAvailableTimes(form.date))
    }
  }

  // Handle time selection
  function handleTimeSelect(time) {
    setForm(prev => ({
      ...prev,
      time,
      status: 'confirmed'
    }))
    // Mark table as booked
    if (selectedTable) {
      setTables(prev =>
        prev.map(t =>
          t.id === selectedTable.id
            ? { ...t, status: 'booked' }
            : t
        )
      )
    }
    setStep(4)
  }

  // Cancel reservation
  function cancelReservation(bookingId) {
    setTables(prev =>
      prev.map(t =>
        t.id.includes('merged')
          ? prev.map(tt => tt.id === bookingId ? { ...t, status: 'available' } : t)
          : t.id === bookingId ? { ...t, status: 'available' } : t
      )
    )
  }

  return (
    <section className="py-20 sm:py-28 bg-background relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Stepper */}
        <div className="flex justify-center mb-8">
          {[1, 2, 3, 4].map((stepNum, i) => (
            <div key={stepNum} className={`flex flex-col items-center ${step <= stepNum ? 'text-olive' : 'text-stone/60'}`}>
              <span className="w-8 h-8 rounded-full bg-gold text-espresso flex items-center justify-center text-sm font-bold mb-2">
                {stepNum}
              </span>
              {stepNum < 4 ? <span className={`border-b ${step <= stepNum + 1 ? 'olive' : 'transparent'}`}/> : null}
            </div>
          ))}
        </div>

        {/* Form Steps */}
        {step === 1 && <Step1 setStep={setStep} />}
        {step === 2 && <Step2 setStep={setStep} form={form} setForm={setForm} />}
        {step === 3 && <Step3 setStep={setStep} form={form} selectedTable={selectedTable} availableTimes={availableTimes} />}
        {step === 4 && <Step4 setStep={setStep} form={form} tables={tables} selectedTable={selectedTable} onCancel={cancelReservation} />}
      </div>
    </section>
  )
}

// Step 1: Service/Table type selection
function Step1({ setStep }) {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-espresso mb-8">{t('booking.title')}</h2>

      <div className="grid grid-cols-2 gap-4 mb-12">
        <div
          onClick={() => setStep(2)}
          className={`group bg-sand/80 rounded-3xl p-8 text-center transition-all duration-300 hover:border-gold/30 ${isArabic ? 'cursor-pointer' : ''}`}
        >
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-olive/10 flex items-center justify-center">
            <MapPin className="w-6 h-6 text-olive" />
          </div>
          <h3>{t('booking.tableSelection')}</h3>
          <p className="mt-2 text-stone">{t('booking.chooseTable')}</p>
        </div>

        <div
          onClick={() => setStep(3)}
          className={`group bg-sand/80 rounded-3xl p-8 text-center transition-all duration-300 hover:border-gold/30 ${isArabic ? 'cursor-pointer' : ''}`}
        >
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-olive/10 flex items-center justify-center">
            <Calendar className="w-6 h-6 text-olive" />
          </div>
          <h3>{t('booking.date')}</h3>
          <p className="mt-2 text-stone">{t('booking.selectDate')}</p>
        </div>
      </div>

      <div className="mt-8">
        <button
          onClick={() => setStep(2)}
          className={`px-6 py-3 rounded-full bg-olive text-white font-medium hover:bg-olive-dark transition-all duration-300 ${isArabic ? 'font-arabic' : ''}`}
        >
          {t('booking.chooseTable')}
        </button>
        <button
          onClick={() => setStep(3)}
          className={`px-6 py-3 rounded-full bg-gold text-espresso font-medium hover:bg-gold-dark transition-all duration-300 ms-3 ${isArabic ? 'font-arabic' : ''}`}
        >
          {t('booking.selectDate')}
        </button>
      </div>
    </div>
  )
}

// Step 2: Date selection
function Step2({ setStep, form, setForm }) {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-espresso mb-8">{t('booking.selectDate')}</h2>

      <div className="flex justify-center gap-4">
        <button
          onClick={() => setStep(1)}
          className={`px-4 py-2 rounded bg-white/20 backdrop-blur-sm text-sm ${form.date ? 'opacity-100' : 'opacity-50'} ${isArabic ? 'font-arabic' : ''}`}
        >
          ← {t('booking.back')}
        </button>
        <span className="text-lg font-medium">{form.date || t('booking.selectDate')}</span>
        <button
          onClick={() => setIsDatePickerOpen(true)}
          className={`px-4 py-2 rounded bg-olive text-white font-medium hover:bg-olive-dark transition-all duration-300 ${isArabic ? 'font-arabic' : ''}`}
        >
          {t('booking.chooseDate')}
        </button>
      </div>

      <div id="date-picker" className="absolute top-full left-1/2 -translate-x-1/2 mt-4 bg-cream rounded-xl p-6 shadow-lg max-w-md w-full ${isArabic ? 'direction-rtl' : ''}">
        <button onClick={() => setIsDatePickerOpen(false)} className="absolute top-right p-2 hover:bg-gold transition-all">
          <X size={20} />
        </button>
        <p className="text-olive text-semibold mb-4">{t('booking.selectDate')}</p>
        <div className="grid grid-cols-7 mt-4">
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              className={`p-3 rounded ${isArabic ? 'text-right' : ''} ${isDatePickerOpen && new Date().getDay() === i ? 'bg-olive text-white' : 'text-stone/50 hover:bg-gold transition-all'}`}
            >
              {i + 1}
            </div>
          ))}
        </div>
        <div className="mt-6 pt-6 border-t border-gold/20">
          <button
            onClick={() => {
              const today = new Date()
              const selected = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)
              const formatted = `${selected.getDate().toString().padStart(2, '0')}/${(selected.getMonth() + 1).toString().padStart(2, '0')}/${selected.getFullYear()}`
              setForm(prev => ({ ...prev, date: formatted }))
              setIsDatePickerOpen(false)
            }}
            className="w-full py-3 rounded bg-olive text-white font-medium hover:bg-olive-dark transition-all duration-300"
          >
            {t('booking.today')}
          </button>
        </div>
      </div>
    </div>
  )
}

// Step 3: Table selection and time slots
function Step3({ setStep, form, selectedTable, availableTimes }) {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-espresso mb-8">
        {t('booking.tableSelection')} {form.date ? ` - ${form.date}` : ''}
      </h2>

      {selectedTable && selectedTable.status !== 'merged' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-12">
          {tables.map(table => (
            <div
              key={table.id}
              onClick={() => handleTableClick(table)}
              className={`group bg-cream rounded-3xl p-6 sm:p-8 border border-gold/10 hover:border-gold/30 transition-all duration-300 ${
                selectedTable?.id === table.id ? 'border-olive/50 shadow-lg' : ''
              } ${table.status === 'booked' ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className="w-14 h-14 rounded-full mx-auto mb-3 bg-${table.size <= 4 ? 'olive/10' : 'gold/10'} flex items-center justify-center">
                {table.size <= 4 ? (
                  <span className="text-olive text-xl">{table.size}+</span>
                ) : (
                  <span className="text-gold text-xl">6</span>
                )}
              </div>
              <p className="text-espresso font-medium text-sm">{t('booking.table')} {table.size}+ {t('booking.people')}</p>
            </div>
          ))}
        </div>
      )}

      {/* Time slots */}
      {availableTimes.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {availableTimes.map(time => (
            <button
              key={time}
              onClick={() => handleTimeSelect(time)}
              className={`p-2 rounded bg-white/20 text-sm ${form.time === time ? 'bg-olive/20 text-olive' : ''} transition-colors hover:bg-gold/30 ${isArabic ? 'text-right' : ''}`}
            >
              {time}
            </button>
          ))}
        </div>
      )}

      <button
        onClick={() => setStep(2)}
        className="mt-8 px-6 py-3 rounded-full bg-olive text-white font-medium hover:bg-olive-dark transition-all duration-300 mb-4"
      >
        ← {t('booking.back')}
      </button>
    </div>
  )
}

// Step 4: Confirmation
function Step4({ setStep, form, tables, selectedTable, onCancel }) {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-espresso mb-8">Réservation confirmée</h2>

      <div className="bg-sand/80 rounded-3xl p-8 sm:p-12 max-w-md mx-auto mb-12">
        <p className="text-espresso font-medium mb-2">Table {selectedTable?.size}+ personnes</p>
        <p className="text-lg font-bold text-olive">{form.date}</p>
        <p className="text-lg font-bold text-olive">{form.time}</p>
        <p className="text-stone mb-4">{form.guests} {t('booking.people')}</p>
        <p className="text-stone">{t('booking.duration')} 2h</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <button
          onClick={() => setStep(1)}
          className={`px-6 py-3 rounded-full bg-white/20 text-espresso font-medium hover:bg-white/30 transition-all duration-300 ${isArabic ? 'font-arabic' : ''}`}
        >
          {t('booking.modify')}
        </button>
        <button
          onClick={() => onCancel(selectedTable?.id)}
          className={`px-6 py-3 rounded-full bg-red/20 text-white font-medium hover:bg-red/30 transition-all duration-300 ${isArabic ? 'font-arabic' : ''}`}
        >
          {t('booking.cancel')}
        </button>
      </div>

      <button
        onClick={() => setStep(1)}
        className="mt-6 px-8 py-3.5 rounded-full bg-gold text-espresso font-medium text-sm tracking-wide hover:bg-gold-dark transition-all duration-300"
      >
        Nouvelle réservation
      </button>
    </div>
  )
}