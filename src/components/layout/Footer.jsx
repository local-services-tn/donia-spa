import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, LayoutDashboard } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'

const InstagramIcon = () => (
  <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/>
  </svg>
)
const FacebookIcon = () => (
  <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
  </svg>
)
const TiktokIcon = () => (
  <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.51a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.43v-7.23a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-.81-.07 4.8 4.8 0 01-.38-.03z"/>
  </svg>
)

export default function Footer() {
  const { t, isArabic } = useLanguage()
  const year = new Date().getFullYear()

  return (
    <footer className="bg-espresso text-white/80 pattern-stars relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-12 ${isArabic ? 'direction-rtl text-right' : ''}`}>
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={`${import.meta.env.BASE_URL}images/logo.png`} alt="Donia Spa" className="w-10 h-10 rounded-full object-cover border border-gold/30" />
              <div>
                <span className="font-display text-xl font-bold text-white tracking-wide">DONIA</span>
                <span className="block text-[10px] font-handwriting tracking-widest text-white/50">SPA & WELLNESS</span>
              </div>
            </div>
            <p className={`text-white/60 text-sm leading-relaxed mt-4 ${isArabic ? 'font-arabic' : ''}`}>
              {t('footer.description')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className={`font-display text-lg font-semibold text-gold mb-4 ${isArabic ? 'font-arabic' : ''}`}>
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-2">
              {[
                { to: '/', label: t('nav.home') },
                { to: '/about', label: t('nav.about') },
              ].map(link => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className={`text-sm text-white/60 hover:text-gold transition-colors ${isArabic ? 'font-arabic' : ''}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="#reservation"
                  className={`text-sm text-white/60 hover:text-gold transition-colors ${isArabic ? 'font-arabic' : ''}`}
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById('reservation')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  {t('nav.booking')}
                </a>
              </li>
              <li>
                <Link
                  to="/dashboard"
                  className={`flex items-center gap-1.5 text-sm text-white/40 hover:text-gold transition-colors ${isArabic ? 'font-arabic' : ''}`}
                >
                  <LayoutDashboard size={12} />
                  {isArabic ? 'لوحة التحكم' : 'Dashboard'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className={`font-display text-lg font-semibold text-gold mb-4 ${isArabic ? 'font-arabic' : ''}`}>
              {t('footer.contact')}
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-white/60">
                <MapPin size={16} className="text-gold mt-0.5 shrink-0" />
                <span className={isArabic ? 'font-arabic' : ''}>{t('about.contact.address')}</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/60">
                <Phone size={16} className="text-gold shrink-0" />
                <span>{t('about.contact.phone1')}</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/60">
                <Mail size={16} className="text-gold shrink-0" />
                <span>{t('about.contact.email')}</span>
              </li>
            </ul>
            <div className="flex gap-3 mt-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full border border-white/20 text-white/60 hover:bg-gold hover:text-espresso hover:border-gold transition-all" aria-label="Instagram">
                <InstagramIcon />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full border border-white/20 text-white/60 hover:bg-gold hover:text-espresso hover:border-gold transition-all" aria-label="Facebook">
                <FacebookIcon />
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full border border-white/20 text-white/60 hover:bg-gold hover:text-espresso hover:border-gold transition-all" aria-label="TikTok">
                <TiktokIcon />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center">
          <p className="text-white/40 text-xs">
            &copy; {year} Donia Spa. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  )
}
