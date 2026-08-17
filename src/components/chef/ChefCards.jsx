import { useLanguage } from '../../context/LanguageContext'
import { User, ChefHat, Heart, MapPin, BookOpen } from 'lucide-react'

export default function ChefCards() {
  const { t, isArabic } = useLanguage()

  const chefs = [
    {
      name: t('chef.chef1'),
      role: t('chef.role1'),
      specialty: t('chef.specialty1'),
      image: '/images/chef1.jpg',
      icon: User,
    },
    {
      name: t('chef.chef2'),
      role: t('chef.role2'),
      specialty: t('chef.specialty2'),
      image: '/images/chef2.jpg',
      icon: User,
    },
    {
      name: t('chef.chef3'),
      role: t('chef.role3'),
      specialty: t('chef.specialty3'),
      image: '/images/chef3.jpg',
      icon: ChefHat,
    },
  ]

  return (
    <section className="py-20 sm:py-28 bg-background relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <span className="font-handwriting text-lg tracking-wider text-olive">✦</span>
          <h2 className={`font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-espresso mt-2 ${isArabic ? 'font-arabic' : ''}`}>
            {t('chef.title')}
          </h2>
          <p className={`mt-3 text-stone text-sm sm:text-base max-w-md mx-auto ${isArabic ? 'font-arabic' : ''}`}>
            {t('chef.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {chefs.map((chef, i) => (
            <div
              key={i}
              className={`group bg-sand/80 rounded-3xl p-6 sm:p-8 border border-gold/10 hover:border-gold/30 transition-all duration-500 hover:shadow-lg transform hover:translate-y-1 ${isArabic ? 'text-right' : ''}`}
            >
              {chef.image ? (
                <img
                  src={chef.image}
                  alt={chef.name}
                  className="w-full h-48 sm:h-64 object-cover rounded-2xl mb-4 group-hover:opacity-90 transition-opacity"
                />
              ) : (
                <div
                  className="w-full h-48 sm:h-64 rounded-2xl bg-olive/20 flex items-center justify-center mb-4"
                >
                  {chef.icon && <chef.icon size={48} className="text-olive" />}
                </div>
              )}

              <h3 className={`font-display text-xl font-bold text-espresso mb-2 ${isArabic ? 'font-arabic' : ''}`}>
                {chef.name}
              </h3>
              <p className={`text-stone text-sm mb-3 ${isArabic ? 'font-arabic' : ''}`}>
                {chef.role}
              </p>

              <div className="flex items-center gap-2">
                {chef.icon && <chef.icon size={16} className="text-olive" />}
                <span className="text-olive font-medium">{chef.specialty}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}