import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { X, Menu } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'

export default function Navbar({ isMenuOpen, setIsMenuOpen }) {
  const { t, isArabic } = useLanguage()
  const location = useLocation()

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/menu', label: t('nav.menu') },
    { to: '/about', label: t('nav.about') },
    { to: '/booking', label: t('nav.booking') },
  ]

  // Auto-close menu on link click
  useEffect(() => {
    setIsMenuOpen(false)
  }, [location])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isMenuOpen
          ? 'bg-cream/95 backdrop-blur-md shadow-md py-6'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group"
          >
            <img
              src="/images/logo.png"
              alt="Donia Restaurant"
              className="w-10 h-10 rounded-full object-cover border-2 border-gold/40 group-hover:border-gold transition-colors"
            />
            <div>
              <span
                className={`font-display text-xl font-bold tracking-wide transition-colors ${
                  isMenuOpen || !location.pathname.startsWith('/') ? 'text-espresso' : 'text-white'
                }`}
              >
                DONIA
              </span>
              <span className={`block text-[10px] font-handwriting tracking-widest ${
                isMenuOpen || !location.pathname.startsWith('/') ? 'text-stone' : 'text-white/70'
              }`}>
                RESTAURANT
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to === '/' ? '/' : link.to}
                className={`group relative text-sm font-medium tracking-wide transition-colors hover:opacity-80 ${
                  isArabic ? 'font-arabic text-base' : ''
                } ${
                  location.pathname === link.to ? 'text-espresso' : 'text-white'
                }`}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
            <a
              href="#booking"
              onClick={(e) => {
                e.preventDefault()
                window.scrollBy({ top: 600, behavior: 'smooth' })
              }}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 bg-olive text-white hover:bg-olive-dark`}
            >
              {t('nav.booking')}
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              isMenuOpen ? 'text-espresso' : 'text-white'
            }`}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-cream/95 backdrop-blur-lg border-t border-gold/10">
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to === '/' ? '/' : link.to}
                className={`block text-espresso font-medium text-lg ${
                  isArabic ? 'font-arabic text-xl' : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="#booking"
              onClick={(e) => {
                e.preventDefault()
                window.scrollBy({ top: 600, behavior: 'smooth' })
                setIsMenuOpen(false)
              }}
              className="block text-center px-5 py-3 bg-olive text-white rounded-full font-medium hover:bg-olive-dark transition-colors"
            >
              {t('nav.booking')}
            </a>
            <div className="flex items-center gap-3 pt-2" />
          </div>
        </div>
      )}
    </nav>
  )
}