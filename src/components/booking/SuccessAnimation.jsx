import { motion } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext'

const successStyles = {
  circle: {
    strokeDasharray: 314,
    strokeDashoffset: 314,
  },
  check: {
    strokeDasharray: 100,
    strokeDashoffset: 100,
  },
}

export default function SuccessAnimation({ booking, onReset }) {
  const { t, isArabic } = useLanguage()

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center py-12"
    >
      {/* Animated Checkmark */}
      <div className="relative w-32 h-32 mx-auto mb-8">
        <svg viewBox="0 0 120 120" className="w-full h-full">
          {/* Background circle */}
          <circle
            cx="60"
            cy="60"
            r="50"
            fill="none"
            stroke="#E8E4D9"
            strokeWidth="3"
          />
          {/* Animated circle */}
          <circle
            cx="60"
            cy="60"
            r="50"
            fill="none"
            stroke="#6B7B5E"
            strokeWidth="3"
            strokeLinecap="round"
            className="animate-draw-circle"
            style={successStyles.circle}
          />
          {/* Animated check */}
          <path
            d="M35 60 L52 77 L85 44"
            fill="none"
            stroke="#6B7B5E"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-draw-check"
            style={successStyles.check}
          />
        </svg>

        {/* Confetti particles */}
        {[
          { color: '#C9A96E', delay: 0, x: 20, y: -15 },
          { color: '#6B7B5E', delay: 0.1, x: -25, y: -10 },
          { color: '#C4956A', delay: 0.2, x: 15, y: 20 },
          { color: '#A8B89A', delay: 0.15, x: -18, y: -20 },
          { color: '#C9A96E', delay: 0.25, x: 25, y: 10 },
          { color: '#6B7B5E', delay: 0.05, x: -10, y: 25 },
        ].map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 0, y: 0, scale: 1 }}
            animate={{
              opacity: [0, 1, 0],
              x: p.x * 3,
              y: p.y * 3,
              scale: [1, 1.2, 0.5],
            }}
            transition={{
              delay: 0.8 + p.delay,
              duration: 1.2,
              ease: 'easeOut',
            }}
            className="absolute top-1/2 left-1/2 w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: p.color }}
          />
        ))}
      </div>

      {/* Success Text */}
      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className={`font-display text-2xl sm:text-3xl font-bold text-espresso mb-3 ${isArabic ? 'font-arabic' : ''}`}
      >
        {t('reservation.success')}
      </motion.h3>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="space-y-2"
      >
        <p className={`text-stone text-sm ${isArabic ? 'font-arabic' : ''}`}>
          {t('reservation.successMsg')}
        </p>
        <p className="font-display text-xl font-bold text-olive">
          {booking.date} {t('reservation.at')} {booking.time}
        </p>
        <p className={`text-stone text-sm ${isArabic ? 'font-arabic' : ''}`}>
          {booking.service}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="mt-8"
      >
        <button
          onClick={onReset}
          className={`px-6 py-3 rounded-full bg-olive text-white font-medium hover:bg-olive-dark transition-all duration-300 ${
            isArabic ? 'font-arabic' : ''
          }`}
        >
          {t('reservation.backToHome')}
        </button>
      </motion.div>
    </motion.div>
  )
}
