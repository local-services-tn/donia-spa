import FadeIn from '../ui/FadeIn'
import { useLanguage } from '../../context/LanguageContext'

export default function Team() {
  const { t, isArabic } = useLanguage()
  const members = t('team.members')
  const colors = ['#6B7B5E', '#C4956A', '#8A7A6E', '#C9A96E', '#A8B89A', '#4A5A3F']

  return (
    <section className="py-20 sm:py-28 bg-sand pattern-bg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <span className="font-handwriting text-lg tracking-wider text-olive">✦</span>
          <h2 className={`font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-espresso mt-2 ${isArabic ? 'font-arabic' : ''}`}>
            {t('team.title')}
          </h2>
          <p className={`mt-3 text-stone text-sm sm:text-base max-w-md mx-auto ${isArabic ? 'font-arabic' : ''}`}>
            {t('team.subtitle')}
          </p>
          <div className="mt-4 mx-auto w-16 h-0.5 bg-gold/60 rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(members) && members.map((member, i) => (
            <FadeIn key={i} delay={i * 100}>
              <div className={`group bg-cream rounded-3xl p-6 sm:p-8 border border-gold/10 hover:shadow-lg hover:-translate-y-1 transition-all duration-500 text-center`}>
                {/* Avatar placeholder */}
                <div
                  className="w-24 h-24 mx-auto rounded-full flex items-center justify-center text-white text-3xl font-display font-bold mb-4 group-hover:scale-105 transition-transform duration-500"
                  style={{ backgroundColor: colors[i] }}
                >
                  {member.name?.charAt(0)}
                </div>
                <h3 className={`font-display text-xl font-bold text-espresso ${isArabic ? 'font-arabic' : ''}`}>
                  {member.name}
                </h3>
                <p className="text-olive text-sm font-medium mt-1">{member.role}</p>
                <p className={`text-stone text-xs mt-3 leading-relaxed ${isArabic ? 'font-arabic' : ''}`}>
                  {member.bio}
                </p>
                <div className="mt-3 inline-block px-3 py-1 bg-sage/50 rounded-full">
                  <span className={`text-xs text-olive-dark font-medium ${isArabic ? 'font-arabic' : ''}`}>
                    {member.specialty}
                  </span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
