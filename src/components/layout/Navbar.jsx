import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'
import LanguageToggle from './LanguageToggle'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { t, isArabic } = useLanguage()
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [location])

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/about', label: t('nav.about') },
    { to: '/#services', label: t('nav.services') },
    { to: '/#reservation', label: t('nav.booking') },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-cream/90 backdrop-blur-md shadow-md py-3'
          : isHome
          ? 'bg-transparent py-5'
          : 'bg-cream/90 backdrop-blur-md py-3'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
              <img
                src={`${import.meta.env.BASE_URL}images/logo.png`}
                alt="Donia Spa"
                className="w-10 h-10 rounded-full object-cover border-2 border-gold/40 group-hover:border-gold transition-colors"
              />
            <div>
              <span
                className={`font-display text-xl font-bold tracking-wide transition-colors ${
                  scrolled || !isHome ? 'text-espresso' : 'text-white'
                }`}
              >
                DONIA
              </span>
              <span className={`block text-[10px] font-handwriting tracking-widest ${
                scrolled || !isHome ? 'text-stone' : 'text-white/70'
              }`}>
                SPA & WELLNESS
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to.startsWith('/#') ? '/' : link.to}
                onClick={() => {
                  if (link.to.startsWith('/#')) {
                    const id = link.to.replace('/#', '')
                    if (location.pathname !== '/') {
                      setTimeout(() => {
                        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
                      }, 100)
                    } else {
                      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
                    }
                  }
                }}
                className={`group relative text-sm font-medium tracking-wide transition-colors hover:opacity-80 ${
                  isArabic ? 'font-arabic text-base' : ''
                } ${
                  scrolled || !isHome ? 'text-espresso' : 'text-white'
                }`}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
            <LanguageToggle scrolled={scrolled} isHome={isHome} />
            <a
              href="#reservation"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('reservation')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                scrolled || !isHome
                  ? 'bg-olive text-white hover:bg-olive-dark'
                  : 'glass text-white hover:bg-white/20'
              }`}
            >
              {t('nav.booking')}
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              scrolled || !isHome ? 'text-espresso' : 'text-white'
            }`}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-cream/95 backdrop-blur-lg border-t border-gold/10 ${isOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0 border-t-0'}`}>
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to.startsWith('/#') ? '/' : link.to}
                  onClick={() => {
                    if (link.to.startsWith('/#')) {
                      const id = link.to.replace('/#', '')
                      if (location.pathname !== '/') {
                        setTimeout(() => {
                          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
                        }, 100)
                      } else {
                        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
                      }
                    }
                    setIsOpen(false)
                  }}
                  className={`block text-espresso font-medium text-lg ${
                    isArabic ? 'font-arabic text-xl' : ''
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex items-center gap-3 pt-2">
                <LanguageToggle scrolled={true} isHome={false} />
              </div>
              <a
                href="#reservation"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById('reservation')?.scrollIntoView({ behavior: 'smooth' })
                  setIsOpen(false)
                }}
                className="block text-center px-5 py-3 bg-olive text-white rounded-full font-medium hover:bg-olive-dark transition-colors"
              >
                {t('nav.booking')}
              </a>
            </div>
      </div>
    </nav>
  )
}
