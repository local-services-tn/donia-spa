import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext'
import ServiceSelector from '../booking/ServiceSelector'
import DatePicker from '../booking/DatePicker'
import TimeSlotGrid from '../booking/TimeSlotGrid'
import BookingForm from '../booking/BookingForm'
import SuccessAnimation from '../booking/SuccessAnimation'

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwA7Tf0Wmf7Iz4o-NEQvaYWat9SaNT_-x6hbOScFibqe_v9iW-pCa16XK5m-AJDgVjt/exec'
const STEPS = ['service', 'date', 'time', 'info', 'success']

const FR_MONTHS = { 'janvier':'01','février':'02','mars':'03','avril':'04','mai':'05','juin':'06','juillet':'07','août':'08','septembre':'09','octobre':'10','novembre':'11','décembre':'12' }
const AR_MONTHS = { 'جانفي':'01','فيفري':'02','مارس':'03','أفريل':'04','ماي':'05','جوان':'06','جويلية':'07','أوت':'08','سبتمبر':'09','أكتوبر':'10','نوفمبر':'11','ديسمبر':'12' }

function convertToISO(dateStr) {
  if (!dateStr) return ''
  const clean = dateStr.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  for (const [fr, num] of Object.entries(FR_MONTHS)) {
    if (clean.includes(fr.normalize('NFD').replace(/[\u0300-\u036f]/g, ''))) {
      const day = clean.match(/(\d{1,2})/)
      if (day) return `${new Date().getFullYear()}-${num}-${day[1].padStart(2, '0')}`
    }
  }
  for (const [ar, num] of Object.entries(AR_MONTHS)) {
    if (dateStr.includes(ar)) {
      const day = dateStr.match(/(\d{1,2})/)
      if (day) return `${new Date().getFullYear()}-${num}-${day[1].padStart(2, '0')}`
    }
  }
  return ''
}

function generateRef() {
  const c = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let r = 'DNS-'
  for (let i = 0; i < 6; i++) r += c.charAt(Math.floor(Math.random() * c.length))
  return r
}

export default function Reservation() {
  const { t, isArabic } = useLanguage()
  const [step, setStep] = useState(0)
  const [selectedService, setSelectedService] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [takenSlots, setTakenSlots] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const services = t('services.items')

  useEffect(() => {
    if (!selectedDate) return
    const isoDate = convertToISO(selectedDate)
    if (!isoDate) return
    setTakenSlots([])
    fetch(`${SCRIPT_URL}?action=avail&date=${isoDate}`)
      .then(r => r.json())
      .then(data => {
        if (data.ok) setTakenSlots(Array.isArray(data.bookings) ? data.bookings : [])
      })
      .catch(() => setTakenSlots([]))
  }, [selectedDate])

  const handleFormChange = useCallback((e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }, [errors])

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = isArabic ? 'الاسم مطلوب' : 'Le nom est requis'
    if (!formData.phone.trim()) newErrors.phone = isArabic ? 'الهاتف مطلوب' : 'Le téléphone est requis'
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = isArabic ? 'البريد الإلكتروني غير صحيح' : 'Email invalide'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validate()) return
    setIsSubmitting(true)
    const isoDate = convertToISO(selectedDate)
    const payload = {
      ref: generateRef(),
      service: summaryService,
      durationMin: 70,
      price: Array.isArray(services) ? services[selectedService]?.price : '',
      date: isoDate,
      time: selectedTime,
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      notes: formData.message,
    }
    try {
      const res = await fetch(SCRIPT_URL, { method: 'POST', body: JSON.stringify(payload) })
      const text = await res.text()
      let data
      try { data = JSON.parse(text) } catch { data = { ok: false } }
      setIsSubmitting(false)
      if (data.ok) {
        setStep(4)
      } else {
        alert(isArabic ? 'هذا الموعد محجوز بالفعل، اختر وقتاً آخر' : 'Ce créneau est déjà pris, veuillez choisir une autre heure')
      }
    } catch {
      setIsSubmitting(false)
      alert(isArabic ? 'خطأ في الاتصال، حاول مرة أخرى' : 'Erreur de connexion, veuillez réessayer')
    }
  }

  const canNext = () => {
    switch (step) {
      case 0: return selectedService !== null
      case 1: return selectedDate !== null
      case 2: return selectedTime !== null
      case 3: return true
      default: return false
    }
  }

  const goNext = () => {
    if (canNext() && step < 4) setStep(s => s + 1)
  }

  const goBack = () => {
    if (step > 0 && step < 4) setStep(s => s - 1)
  }

  const reset = () => {
    setStep(0)
    setSelectedService(null)
    setSelectedDate(null)
    setSelectedTime(null)
    setFormData({ name: '', phone: '', email: '', message: '' })
    setErrors({})
    document.getElementById('reservation')?.scrollIntoView({ behavior: 'smooth' })
  }

  const stepLabels = [
    t('reservation.selectService'),
    t('reservation.selectDate'),
    t('reservation.selectTime'),
    t('reservation.yourInfo'),
  ]

  const summaryDate = selectedDate
  const summaryService = Array.isArray(services) ? services[selectedService]?.name : ''
  const summaryTime = selectedTime

  return (
    <section id="reservation" className="py-20 sm:py-28 bg-sand pattern-bg relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <span className="font-handwriting text-lg tracking-wider text-olive">✦</span>
          <h2 className={`font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-espresso mt-2 ${isArabic ? 'font-arabic' : ''}`}>
            {t('reservation.title')}
          </h2>
          <p className={`mt-3 text-stone text-sm sm:text-base max-w-md mx-auto ${isArabic ? 'font-arabic' : ''}`}>
            {t('reservation.subtitle')}
          </p>
          <div className="mt-4 mx-auto w-16 h-0.5 bg-gold/60 rounded-full" />
        </div>

        {step < 4 && (
          <>
            {/* Step indicators */}
            <div className="flex items-center justify-center gap-2 mb-10">
              {STEPS.slice(0, 4).map((_, i) => (
                <div key={i} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                      i < step
                        ? 'bg-olive text-white'
                        : i === step
                        ? 'bg-olive text-white ring-4 ring-olive/20'
                        : 'bg-sage/50 text-stone'
                    }`}
                  >
                    {i < step ? '✓' : i + 1}
                  </div>
                  {i < 3 && (
                    <div className={`w-8 sm:w-12 h-0.5 mx-1 transition-colors duration-300 ${
                      i < step ? 'bg-olive' : 'bg-sage/50'
                    }`} />
                  )}
                </div>
              ))}
            </div>

            {/* Step title */}
            <h3 className={`text-center font-display text-lg font-bold text-espresso mb-6 ${isArabic ? 'font-arabic' : ''}`}>
              {stepLabels[step]}
            </h3>
          </>
        )}

        <div className="bg-cream/60 rounded-3xl p-6 sm:p-8 border border-gold/10">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div key="service" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <ServiceSelector selected={selectedService} onSelect={setSelectedService} />
              </motion.div>
            )}

            {step === 1 && (
              <motion.div key="date" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <DatePicker selectedDate={selectedDate} onSelect={(d) => { setSelectedDate(d); setSelectedTime(null); }} />
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="time" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <TimeSlotGrid selectedTime={selectedTime} onSelect={setSelectedTime} takenSlots={takenSlots} />
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="info" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                {/* Summary */}
                <div className="bg-sage/30 rounded-2xl p-4 mb-6">
                  <h4 className={`font-display text-sm font-bold text-espresso mb-2 ${isArabic ? 'font-arabic' : ''}`}>
                    {t('reservation.summary')}
                  </h4>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div>
                      <span className="text-stone">{isArabic ? 'الخدمة' : 'Service'}</span>
                      <p className="font-medium text-espresso">{summaryService}</p>
                    </div>
                    <div>
                      <span className="text-stone">{isArabic ? 'التاريخ' : 'Date'}</span>
                      <p className="font-medium text-espresso">{summaryDate?.split(' ').slice(0, 3).join(' ')}</p>
                    </div>
                    <div>
                      <span className="text-stone">{isArabic ? 'الوقت' : 'Heure'}</span>
                      <p className="font-medium text-espresso">{summaryTime}</p>
                    </div>
                  </div>
                </div>
                <BookingForm formData={formData} onChange={handleFormChange} errors={errors} />
              </motion.div>
            )}

            {step === 4 && (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                <SuccessAnimation
                  booking={{ date: summaryDate?.split(' ').slice(0, 3).join(' '), time: summaryTime, service: summaryService }}
                  onReset={reset}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation buttons */}
        {step < 4 && (
          <div className="flex justify-between mt-6">
            <button
              onClick={goBack}
              disabled={step === 0}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                step === 0
                  ? 'opacity-0 pointer-events-none'
                  : 'bg-sage/50 text-stone hover:bg-sage'
              } ${isArabic ? 'font-arabic' : ''}`}
            >
              ← {isArabic ? 'رجوع' : 'Retour'}
            </button>

            {step < 3 ? (
              <button
                onClick={goNext}
                disabled={!canNext()}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  canNext()
                    ? 'bg-olive text-white hover:bg-olive-dark shadow-md shadow-olive/20'
                    : 'bg-stone/20 text-stone/40 cursor-not-allowed'
                } ${isArabic ? 'font-arabic' : ''}`}
              >
                {isArabic ? 'التالي' : 'Suivant'} →
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`px-6 py-2.5 rounded-full text-sm font-medium bg-olive text-white hover:bg-olive-dark transition-all duration-300 shadow-md shadow-olive/20 ${
                  isSubmitting ? 'opacity-70 cursor-wait' : ''
                } ${isArabic ? 'font-arabic' : ''}`}
              >
                {isSubmitting
                  ? (isArabic ? 'جاري التأكيد...' : 'Envoi...')
                  : t('reservation.confirm')
                }
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
