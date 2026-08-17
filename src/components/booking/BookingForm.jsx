import { User, Phone, Mail, MessageSquare } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'

export default function BookingForm({ formData, onChange, errors }) {
  const { t, isArabic } = useLanguage()

  const fields = [
    { key: 'name', type: 'text', label: t('reservation.name'), Icon: User },
    { key: 'phone', type: 'tel', label: t('reservation.phone'), Icon: Phone, required: true },
    { key: 'email', type: 'email', label: t('reservation.email'), Icon: Mail },
    { key: 'message', type: 'textarea', label: t('reservation.message'), Icon: MessageSquare },
  ]

  return (
    <div className={`space-y-4 ${isArabic ? 'direction-rtl text-right' : ''}`}>
      {fields.map((field) => (
        <div key={field.key}>
          <label
            htmlFor={field.key}
            className={`flex items-center gap-2 text-xs font-medium text-stone mb-1.5 ${isArabic ? 'font-arabic flex-row-reverse' : ''}`}
          >
            <field.Icon size={14} className="text-olive" />
            {field.label}
          </label>
          {field.type === 'textarea' ? (
            <textarea
              id={field.key}
              name={field.key}
              value={formData[field.key] || ''}
              onChange={onChange}
              rows={3}
              className={`w-full px-4 py-3 rounded-xl bg-cream border border-gold/20 text-espresso text-sm placeholder:text-stone/40 focus:outline-none focus:ring-2 focus:ring-olive/30 focus:border-olive transition-all resize-none ${isArabic ? 'font-arabic' : ''}`}
              placeholder={field.label}
            />
          ) : (
            <input
              id={field.key}
              type={field.type}
              name={field.key}
              value={formData[field.key] || ''}
              onChange={onChange}
              required={field.required}
              autoComplete={field.key === 'email' ? 'email' : field.key === 'phone' ? 'tel' : 'name'}
              className={`w-full px-4 py-3 rounded-xl bg-cream border border-gold/20 text-espresso text-sm placeholder:text-stone/40 focus:outline-none focus:ring-2 focus:ring-olive/30 focus:border-olive transition-all ${isArabic ? 'font-arabic' : ''}`}
              placeholder={field.label}
            />
          )}
          {errors?.[field.key] && (
            <p className="text-red-500 text-xs mt-1">{errors[field.key]}</p>
          )}
        </div>
      ))}
    </div>
  )
}
