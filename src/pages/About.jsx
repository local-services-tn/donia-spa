import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, ExternalLink } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const InstagramIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/>
  </svg>
)
const FacebookIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
  </svg>
)
const TiktokIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.51a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.43v-7.23a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-.81-.07 4.8 4.8 0 01-.38-.03z"/>
  </svg>
)

export default function About() {
  const { t, isArabic } = useLanguage()

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[350px] flex items-center justify-center overflow-hidden">
        <img
          src="/images/steam-room.jpg"
          alt="Donia Spa"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-espresso/50" />
        <div className="absolute inset-0 video-tint opacity-50" />
        <div className="relative z-10 text-center px-4">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-handwriting text-xl text-gold/90"
          >
            ✦
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mt-3 ${isArabic ? 'font-arabic' : ''}`}
          >
            {t('about.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={`text-white/70 text-lg mt-4 ${isArabic ? 'font-arabic' : ''}`}
          >
            {t('about.subtitle')}
          </motion.p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 sm:py-28 bg-cream pattern-bg relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${isArabic ? 'direction-rtl' : ''}`}>
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden shadow-xl">
                <img src="/images/products.jpg" alt="Donia Spa Products" className="w-full h-[400px] object-cover" />
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-2 border-gold/30 rounded-3xl -z-10" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <span className="font-handwriting text-lg text-olive">✦</span>
              <h2 className={`font-display text-3xl sm:text-4xl font-bold text-espresso mt-2 mb-6 ${isArabic ? 'font-arabic' : ''}`}>
                {isArabic ? 'قصتنا' : 'Notre Histoire'}
              </h2>
              <div className="space-y-4">
                {[t('about.story.p1'), t('about.story.p2'), t('about.story.p3')].map((p, i) => (
                  <p key={i} className={`text-stone text-sm sm:text-base leading-relaxed ${isArabic ? 'font-arabic' : ''}`}>
                    {p}
                  </p>
                ))}
              </div>
              <div className="mt-6 p-4 bg-olive/5 border-l-4 border-olive rounded-r-xl">
                <p className={`text-espresso text-sm italic ${isArabic ? 'font-arabic not-italic' : ''}`}>
                  {t('about.mission')}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-20 sm:py-28 bg-sand pattern-stars relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <span className="font-handwriting text-lg tracking-wider text-olive">✦</span>
            <h2 className={`font-display text-3xl sm:text-4xl font-bold text-espresso mt-2 ${isArabic ? 'font-arabic' : ''}`}>
              {t('about.contact.title')}
            </h2>
            <div className="mt-4 mx-auto w-16 h-0.5 bg-gold/60 rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Address */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-cream rounded-3xl p-6 border border-gold/10 text-center"
            >
              <div className="w-12 h-12 mx-auto rounded-full bg-olive/10 flex items-center justify-center mb-4">
                <MapPin size={20} className="text-olive" />
              </div>
              <h3 className={`font-display text-lg font-bold text-espresso mb-2 ${isArabic ? 'font-arabic' : ''}`}>
                {isArabic ? 'العنوان' : 'Adresse'}
              </h3>
              <p className={`text-stone text-sm ${isArabic ? 'font-arabic' : ''}`}>
                {t('about.contact.address')}
              </p>
            </motion.div>

            {/* Phone */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-cream rounded-3xl p-6 border border-gold/10 text-center"
            >
              <div className="w-12 h-12 mx-auto rounded-full bg-olive/10 flex items-center justify-center mb-4">
                <Phone size={20} className="text-olive" />
              </div>
              <h3 className={`font-display text-lg font-bold text-espresso mb-2 ${isArabic ? 'font-arabic' : ''}`}>
                {isArabic ? 'الهاتف' : 'Téléphone'}
              </h3>
              <p className="text-stone text-sm">{t('about.contact.phone1')}</p>
              <p className="text-stone text-sm">{t('about.contact.phone2')}</p>
            </motion.div>

            {/* Hours & Email */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-cream rounded-3xl p-6 border border-gold/10 text-center sm:col-span-2 lg:col-span-1"
            >
              <div className="w-12 h-12 mx-auto rounded-full bg-olive/10 flex items-center justify-center mb-4">
                <Clock size={20} className="text-olive" />
              </div>
              <h3 className={`font-display text-lg font-bold text-espresso mb-2 ${isArabic ? 'font-arabic' : ''}`}>
                {isArabic ? 'المواعيد' : 'Horaires'}
              </h3>
              <p className={`text-stone text-sm ${isArabic ? 'font-arabic' : ''}`}>{t('about.contact.hours')}</p>
              <p className={`text-stone text-sm ${isArabic ? 'font-arabic' : ''}`}>{t('about.contact.hoursDim')}</p>
              <div className="mt-3 flex items-center justify-center gap-2 text-stone text-sm">
                <Mail size={14} />
                <span>{t('about.contact.email')}</span>
              </div>
            </motion.div>
          </div>

          {/* Social Media */}
          <div className="mt-12">
            <h3 className={`text-center font-display text-xl font-bold text-espresso mb-6 ${isArabic ? 'font-arabic' : ''}`}>
              {t('about.social.title')}
            </h3>
            <div className="flex justify-center gap-4">
              <a
                href="https://instagram.com/donia.spaby"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex items-center gap-2 px-5 py-3 bg-cream rounded-full border border-gold/10 hover:border-olive/30 hover:shadow-md transition-all duration-300 group"
              >
                <span className="text-olive group-hover:scale-110 transition-transform"><InstagramIcon /></span>
                <span className="text-sm text-espresso font-medium">{t('about.social.instagram')}</span>
              </a>
              <a
                href="https://tiktok.com/@doniaspa"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="flex items-center gap-2 px-5 py-3 bg-cream rounded-full border border-gold/10 hover:border-olive/30 hover:shadow-md transition-all duration-300 group"
              >
                <span className="text-olive group-hover:scale-110 transition-transform"><TiktokIcon /></span>
                <span className="text-sm text-espresso font-medium">{t('about.social.tiktok')}</span>
              </a>
              <a
                href="https://facebook.com/DoniaSpaTunis"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex items-center gap-2 px-5 py-3 bg-cream rounded-full border border-gold/10 hover:border-olive/30 hover:shadow-md transition-all duration-300 group"
              >
                <span className="text-olive group-hover:scale-110 transition-transform"><FacebookIcon /></span>
                <span className="text-sm text-espresso font-medium">{t('about.social.facebook')}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps */}
      <section className="py-20 sm:py-28 bg-cream pattern-bg relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-8">
            <span className="font-handwriting text-lg tracking-wider text-olive">✦</span>
            <h2 className={`font-display text-3xl sm:text-4xl font-bold text-espresso mt-2 ${isArabic ? 'font-arabic' : ''}`}>
              {t('about.mapTitle')}
            </h2>
            <div className="mt-4 mx-auto w-16 h-0.5 bg-gold/60 rounded-full" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl overflow-hidden shadow-xl border border-gold/10"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3247.8!2d10.17!3d36.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzbCsDQ4JzAwLjAiTiAxMMKwMTAnMTIuMCJF!5e0!3m2!1sfr!2stn!4v1"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Donia Spa Location"
              className="w-full"
            />
          </motion.div>

          <div className="text-center mt-6">
            <a
              href="https://maps.app.goo.gl/sr32FdDsC6G4hKQj8"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 bg-olive text-white rounded-full text-sm font-medium hover:bg-olive-dark transition-all duration-300 shadow-md shadow-olive/20"
            >
              <ExternalLink size={16} />
              {isArabic ? 'افتح في خرائط جوجل' : 'Ouvrir dans Google Maps'}
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
