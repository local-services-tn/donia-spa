import { motion } from 'framer-motion'
import { Play } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'

export default function Videos() {
  const { t, isArabic } = useLanguage()

  const videos = [
    { src: '/videos/video-1.mp4', poster: '/images/products.jpg', alt: 'Inspiration 1' },
    { src: '/videos/video-2.mp4', poster: '/images/massage-room.jpg', alt: 'Inspiration 2' },
    { src: '/videos/video-3.mp4', poster: '/images/steam-room.jpg', alt: 'Inspiration 3' },
  ]

  return (
    <section className="py-20 sm:py-28 bg-sand pattern-bg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <span className="font-handwriting text-lg tracking-wider text-olive">✦</span>
          <h2 className={`font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-espresso mt-2 ${isArabic ? 'font-arabic' : ''}`}>
            {t('videos.title')}
          </h2>
          <p className={`mt-3 text-stone text-sm sm:text-base max-w-md mx-auto ${isArabic ? 'font-arabic' : ''}`}>
            {t('videos.subtitle')}
          </p>
          <div className="mt-4 mx-auto w-16 h-0.5 bg-gold/60 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {videos.map((video, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="group relative rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 bg-espresso"
            >
              <video
                src={video.src}
                poster={video.poster}
                muted
                loop
                playsInline
                preload="none"
                className="w-full h-72 sm:h-80 object-cover group-hover:scale-105 transition-all duration-700 opacity-80 group-hover:opacity-100"
                onMouseEnter={(e) => e.target.play()}
                onMouseLeave={(e) => { e.target.pause(); e.target.currentTime = 0; }}
                onTouchStart={(e) => {
                  const vid = e.target
                  if (vid.paused) { vid.play() } else { vid.pause(); vid.currentTime = 0 }
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-14 h-14 rounded-full glass flex items-center justify-center opacity-60 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
                  <Play size={24} className="text-white ml-1" fill="white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
