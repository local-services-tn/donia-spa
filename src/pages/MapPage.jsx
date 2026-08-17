import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { MapPin, X } from 'lucide-react'

export default function MapPage() {
  const { t, isArabic } = useLanguage()

  // Mock table positions for top view
  const tables = [
    { id: 't1', x: 100, y: 100, size: 4, status: 'available' },
    { id: 't2', x: 200, y: 100, size: 4, status: 'available' },
    { id: 't3', x: 300, y: 100, size: 4, status: 'available' },
    { id: 't4', x: 400, y: 100, size: 4, status: 'available' },
    { id: 't5', x: 500, y: 100, size: 6, status: 'available' },
    { id: 't6', x: 100, y: 200, size: 4, status: 'booked' },
    { id: 't7', x: 200, y: 200, size: 4, status: 'available' },
    { id: 't8', x: 300, y: 200, size: 6, status: 'available' },
    { id: 't9', x: 400, y: 200, size: 4, status: 'available' },
    { id: 't10', x: 500, y: 200, size: 4, status: 'available' },
    { id: 't11', x: 100, y: 300, size: 4, status: 'available' },
    { id: 't12', x: 200, y: 300, size: 6, status: 'available' },
  ]

  const [selectedTable, setSelectedTable] = useState(null)
  const [zoom, setZoom] = useState(1)

  return (
    <section className="py-20 sm:py-28 bg-background relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Back button */}
        <button
          onClick={() => window.history.back()}
          className="fixed top-6 left-6 bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-gold transition-all"
        >
          <X size={24} className="text-white" />
        </button>

        {/* Map illustration - top view */}
        <div className="relative h-[600px] sm:h-[700px] md:h-[800px] rounded-2xl overflow-hidden shadow-2xl mt-20">
          {/* Restaurant outline */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 400">
            <path
              fill="var(--bg, #f5ede4)"
              d="M100 50 L500 50 L550 350 L100 350 Z"
            />
            <path
              fill="var(--fg, #espresso)"
              d="M150 80 L450 80 L470 320 L150 320 Z"
            />
          </svg>

          {/* Tables - top view */}
          {tables.map(table => (
            <circle
              key={table.id}
              cx={table.x}
              cy={table.y}
              r={table.size === 6 ? 18 : 14}
              fill={table.status === 'available' ? 'var(--primary)' : 'var(--muted)'}
              stroke="white"
              strokeWidth={2}
              className="cursor-pointer hover:scale-110 transition-transform"
              onClick={() => setSelectedTable(table)}
            />
          ))}

          {/* Selected table highlight */}
          {selectedTable && (
            <circle
              cx={selectedTable.x}
              cy={selectedTable.y}
              r={selectedTable.size === 6 ? 22 : 18}
              fill="var(--accent, #c9a96e)"
              stroke="var(--card, #fff)"
              strokeWidth={3}
              className="opacity-80"
            />
          )}

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-cream/90 rounded-xl p-4 shadow-lg max-w-sm">
            <div className="flex items-center gap-2 text-sm">
              <span className="w 12 h 12 rounded bg-green-500"></span>
              <span>{t('map.available')}</span>
            </div>
            <div className="flex items-center gap-2 text-sm mt-1">
              <span className="w 12 h 12 rounded bg-red-500"></span>
              <span>{t('map.booked')}</span>
            </div>
          </div>
        </div>

        {/* Selected table details */}
        {selectedTable && (
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-cream rounded-xl p-6 max-w-sm text-center shadow-lg">
            <p className="text-olive text-semibold mb-2">{t('map.selectedTable')}</p>
            <p className="text-2xl font-bold text-espresso">{selectedTable.size}+ {t('booking.people')}</p>
            <button
              onClick={() => setSelectedTable(null)}
              className="mt-4 px-4 py-2 rounded bg-olive text-white text-sm hover:bg-olive-dark transition-all"
            >
              {t('map.chooseTable')}
            </button>
          </div>
        )}

        {/* Google Maps embed - temporary placeholder */}
        <div className="mt-12 pt-12 border-t border-white/5">
          <h3 className="text-espresso text-lg font-bold mb-4">{t('map.location')}</h3>
          <iframe
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3247.8!2d10.18!3d36.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzbCsDQ4JzAwLjAiTiAxMMKwMTAnMTIuMCJF!5e0!3m2!1sfr!4sfr!4sTunisia!5e0!3m2!1sfr!4stn!4v1"
            title="Donia Restaurant Location"
          />
        </div>
      </div>
    </section>
  )
}