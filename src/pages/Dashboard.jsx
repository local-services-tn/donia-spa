import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Lock, Search, Download, TrendingUp, Calendar, DollarSign, Users, RefreshCw } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend } from 'recharts'
import { useLanguage } from '../context/LanguageContext'

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwA7Tf0Wmf7Iz4o-NEQvaYWat9SaNT_-x6hbOScFibqe_v9iW-pCa16XK5m-AJDgVjt/exec'
const DASH_KEY = 'donia2026'

const COLORS = ['#6B7B5E', '#C9A96E', '#C4956A', '#A8B89A', '#3D2E24', '#8A7A6E']

export default function Dashboard() {
  const { t, isArabic } = useLanguage()
  const [key, setKey] = useState('')
  const [authError, setAuthError] = useState(false)
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(false)
  const [fetched, setFetched] = useState(false)
  const [search, setSearch] = useState('')
  const [sortCol, setSortCol] = useState('date')
  const [sortDir, setSortDir] = useState('desc')

  const fetchBookings = async () => {
    if (!key.trim()) return
    setLoading(true)
    setAuthError(false)
    try {
      const res = await fetch(`${SCRIPT_URL}?action=bookings&key=${encodeURIComponent(key)}`)
      const data = await res.json()
      if (data.ok) {
        setBookings(data.rows || [])
        setFetched(true)
      } else {
        setAuthError(true)
      }
    } catch {
      setAuthError(true)
    }
    setLoading(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') fetchBookings()
  }

  const filtered = useMemo(() => {
    if (!search.trim()) return bookings
    const q = search.toLowerCase()
    return bookings.filter(b =>
      b.ref.toLowerCase().includes(q) ||
      b.name.toLowerCase().includes(q) ||
      b.service.toLowerCase().includes(q) ||
      b.phone.includes(q)
    )
  }, [bookings, search])

  const sorted = useMemo(() => {
    const arr = [...filtered]
    arr.sort((a, b) => {
      let va = a[sortCol] || ''
      let vb = b[sortCol] || ''
      if (sortCol === 'price') { va = parseFloat(va) || 0; vb = parseFloat(vb) || 0 }
      if (va < vb) return sortDir === 'asc' ? -1 : 1
      if (va > vb) return sortDir === 'asc' ? 1 : -1
      return 0
    })
    return arr
  }, [filtered, sortCol, sortDir])

  const toggleSort = (col) => {
    if (sortCol === col) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortCol(col); setSortDir('desc') }
  }

  const stats = useMemo(() => {
    const total = bookings.length
    const confirmed = bookings.filter(b => b.status === 'confirmed').length
    const cancelled = bookings.filter(b => b.status === 'cancelled').length
    const revenue = bookings
      .filter(b => b.status === 'confirmed')
      .reduce((sum, b) => sum + (parseFloat(String(b.price).replace(/[^\d.]/g, '')) || 0), 0)
    return { total, confirmed, cancelled, revenue }
  }, [bookings])

  const serviceData = useMemo(() => {
    const map = {}
    bookings.forEach(b => {
      const s = b.service || 'Inconnu'
      map[s] = (map[s] || 0) + 1
    })
    return Object.entries(map).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count)
  }, [bookings])

  const monthlyData = useMemo(() => {
    const map = {}
    bookings.forEach(b => {
      if (b.status !== 'confirmed' || !b.date) return
      const month = b.date.slice(0, 7)
      const price = parseFloat(String(b.price).replace(/[^\d.]/g, '')) || 0
      if (!map[month]) map[month] = { month, revenue: 0, count: 0 }
      map[month].revenue += price
      map[month].count += 1
    })
    return Object.values(map).sort((a, b) => a.month.localeCompare(b.month))
  }, [bookings])

  const statusData = useMemo(() => [
    { name: isArabic ? 'مؤكّد' : 'Confirmé', value: stats.confirmed },
    { name: isArabic ? 'ملغى' : 'Annulé', value: stats.cancelled },
  ], [stats, isArabic])

  const exportCSV = () => {
    const headers = ['Référence', 'Service', 'Date', 'Heure', 'Nom', 'Téléphone', 'Email', 'Prix', 'Statut']
    const rows = sorted.map(b => [b.ref, b.service, b.date, b.time, b.name, b.phone, b.email, b.price, b.status])
    const csv = [headers, ...rows].map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n')
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = 'donia-spa-bookings.csv'; a.click()
    URL.revokeObjectURL(url)
  }

  const sortArrow = (col) => sortCol === col ? (sortDir === 'asc' ? ' ↑' : ' ↓') : ''

  const statCards = [
    { label: isArabic ? 'إجمالي الحجوزات' : 'Total Réservations', value: stats.total, icon: Users, color: 'bg-olive/10 text-olive' },
    { label: isArabic ? 'مؤكّدة' : 'Confirmées', value: stats.confirmed, icon: TrendingUp, color: 'bg-olive/10 text-olive' },
    { label: isArabic ? 'ملغاة' : 'Annulées', value: stats.cancelled, icon: Calendar, color: 'bg-terracotta/10 text-terracotta' },
    { label: isArabic ? 'إجمالي الإيرادات' : 'Revenu Total', value: `${stats.revenue.toLocaleString()} DT`, icon: DollarSign, color: 'bg-gold/10 text-gold' },
  ]

  if (!fetched) {
    return (
      <div className="min-h-screen bg-sand flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-cream rounded-3xl p-8 sm:p-12 border border-gold/10 shadow-xl max-w-md w-full text-center"
        >
          <div className="w-16 h-16 mx-auto rounded-full bg-olive/10 flex items-center justify-center mb-6">
            <Lock size={28} className="text-olive" />
          </div>
          <h1 className={`font-display text-2xl sm:text-3xl font-bold text-espresso mb-2 ${isArabic ? 'font-arabic' : ''}`}>
            {isArabic ? 'لوحة التحكم' : 'Tableau de Bord'}
          </h1>
          <p className={`text-stone text-sm mb-8 ${isArabic ? 'font-arabic' : ''}`}>
            {isArabic ? 'أدخل كلمة المرور للوصول' : 'Entrez le mot de passe pour accéder'}
          </p>
          <div className="space-y-4">
            <input
              type="password"
              value={key}
              onChange={(e) => { setKey(e.target.value); setAuthError(false) }}
              onKeyDown={handleKeyDown}
              className={`w-full px-4 py-3 rounded-xl bg-sand border border-gold/20 text-espresso text-sm text-center tracking-wider placeholder:text-stone/40 focus:outline-none focus:ring-2 focus:ring-olive/30 focus:border-olive transition-all ${isArabic ? 'font-arabic' : ''}`}
              placeholder={isArabic ? 'كلمة المرور' : 'Mot de passe'}
              autoFocus
            />
            {authError && (
              <p className="text-red-500 text-sm">
                {isArabic ? 'كلمة المرور غير صحيحة' : 'Clé incorrecte'}
              </p>
            )}
            <button
              onClick={fetchBookings}
              disabled={loading || !key.trim()}
              className={`w-full px-6 py-3 rounded-xl bg-olive text-white font-medium text-sm hover:bg-olive-dark transition-all duration-300 shadow-md shadow-olive/20 ${
                loading ? 'opacity-70 cursor-wait' : ''
              } ${isArabic ? 'font-arabic' : ''}`}
            >
              {loading ? (isArabic ? 'جاري التحميل...' : 'Chargement...') : (isArabic ? 'دخول' : 'Accéder')}
            </button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-sand pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className={`font-display text-3xl sm:text-4xl font-bold text-espresso ${isArabic ? 'font-arabic' : ''}`}>
              {isArabic ? 'لوحة التحكم' : 'Tableau de Bord'}
            </h1>
            <p className={`text-stone text-sm mt-1 ${isArabic ? 'font-arabic' : ''}`}>
              {isArabic ? `${bookings.length} حجز` : `${bookings.length} réservation(s)`}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchBookings}
              className="p-2.5 rounded-xl bg-cream border border-gold/10 text-stone hover:text-olive hover:border-olive/30 transition-all"
              title="Rafraîchir"
            >
              <RefreshCw size={18} />
            </button>
            <button
              onClick={exportCSV}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cream border border-gold/10 text-stone hover:text-olive hover:border-olive/30 transition-all text-sm ${isArabic ? 'font-arabic' : ''}`}
            >
              <Download size={16} />
              CSV
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statCards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-cream rounded-2xl p-5 border border-gold/10"
            >
              <div className={`w-10 h-10 rounded-xl ${card.color} flex items-center justify-center mb-3`}>
                <card.icon size={20} />
              </div>
              <p className={`text-xl sm:text-2xl font-bold text-espresso font-display ${isArabic ? 'font-arabic' : ''}`}>
                {card.value}
              </p>
              <p className={`text-xs text-stone mt-1 ${isArabic ? 'font-arabic' : ''}`}>
                {card.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue by Month */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-cream rounded-2xl p-6 border border-gold/10"
          >
            <h3 className={`font-display text-lg font-bold text-espresso mb-4 ${isArabic ? 'font-arabic' : ''}`}>
              {isArabic ? 'الإيرادات الشهرية' : 'Revenu Mensuel'}
            </h3>
            {monthlyData.length > 0 ? (
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E8E4D9" />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#8A7A6E' }} />
                  <YAxis tick={{ fontSize: 12, fill: '#8A7A6E' }} />
                  <Tooltip
                    contentStyle={{ background: '#FFF8F0', border: '1px solid #E8E4D9', borderRadius: '12px', fontSize: '13px' }}
                    formatter={(v) => [`${v.toLocaleString()} DT`, isArabic ? 'الإيراد' : 'Revenu']}
                  />
                  <Line type="monotone" dataKey="revenue" stroke="#6B7B5E" strokeWidth={2.5} dot={{ fill: '#C9A96E', r: 5 }} activeDot={{ r: 7 }} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <p className={`text-center text-stone text-sm py-12 ${isArabic ? 'font-arabic' : ''}`}>
                {isArabic ? 'لا توجد بيانات بعد' : 'Aucune donnée pour le moment'}
              </p>
            )}
          </motion.div>

          {/* Bookings by Service */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-cream rounded-2xl p-6 border border-gold/10"
          >
            <h3 className={`font-display text-lg font-bold text-espresso mb-4 ${isArabic ? 'font-arabic' : ''}`}>
              {isArabic ? 'الحجوزات حسب الخدمة' : 'Réservations par Service'}
            </h3>
            {serviceData.length > 0 ? (
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={serviceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E8E4D9" />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#8A7A6E' }} interval={0} angle={-20} textAnchor="end" height={60} />
                  <YAxis tick={{ fontSize: 12, fill: '#8A7A6E' }} allowDecimals={false} />
                  <Tooltip
                    contentStyle={{ background: '#FFF8F0', border: '1px solid #E8E4D9', borderRadius: '12px', fontSize: '13px' }}
                    formatter={(v) => [v, isArabic ? 'عدد' : 'Réservations']}
                  />
                  <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                    {serviceData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className={`text-center text-stone text-sm py-12 ${isArabic ? 'font-arabic' : ''}`}>
                {isArabic ? 'لا توجد بيانات بعد' : 'Aucune donnée pour le moment'}
              </p>
            )}
          </motion.div>

          {/* Status Pie Chart (full width) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-cream rounded-2xl p-6 border border-gold/10 lg:col-span-2"
          >
            <h3 className={`font-display text-lg font-bold text-espresso mb-4 ${isArabic ? 'font-arabic' : ''}`}>
              {isArabic ? 'توزيع الحالات' : 'Répartition des Statuts'}
            </h3>
            {stats.total > 0 ? (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                <ResponsiveContainer width="100%" height={260}>
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={4}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}`}
                    >
                      <Cell fill="#6B7B5E" />
                      <Cell fill="#C4956A" />
                    </Pie>
                    <Tooltip
                      contentStyle={{ background: '#FFF8F0', border: '1px solid #E8E4D9', borderRadius: '12px', fontSize: '13px' }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <p className={`text-center text-stone text-sm py-12 ${isArabic ? 'font-arabic' : ''}`}>
                {isArabic ? 'لا توجد بيانات بعد' : 'Aucune donnée pour le moment'}
              </p>
            )}
          </motion.div>
        </div>

        {/* Search + Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-cream rounded-2xl border border-gold/10 overflow-hidden"
        >
          <div className="p-4 border-b border-gold/10 flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <h3 className={`font-display text-lg font-bold text-espresso ${isArabic ? 'font-arabic' : ''}`}>
              {isArabic ? 'جميع الحجوزات' : 'Toutes les Réservations'}
            </h3>
            <div className="relative flex-1 sm:max-w-xs sm:ml-auto">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone/50" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={`w-full pl-9 pr-4 py-2 rounded-xl bg-sand border border-gold/10 text-espresso text-sm placeholder:text-stone/40 focus:outline-none focus:ring-2 focus:ring-olive/20 transition-all ${isArabic ? 'font-arabic pl-4 pr-9' : ''}`}
                placeholder={isArabic ? 'بحث...' : 'Rechercher...'}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gold/10">
                  {[
                    { key: 'ref', label: 'Réf.' },
                    { key: 'service', label: isArabic ? 'الخدمة' : 'Service' },
                    { key: 'date', label: isArabic ? 'التاريخ' : 'Date' },
                    { key: 'time', label: isArabic ? 'الوقت' : 'Heure' },
                    { key: 'name', label: isArabic ? 'الاسم' : 'Nom' },
                    { key: 'phone', label: isArabic ? 'الهاتف' : 'Tél.' },
                    { key: 'price', label: isArabic ? 'السعر' : 'Prix' },
                    { key: 'status', label: isArabic ? 'الحالة' : 'Statut' },
                  ].map(col => (
                    <th
                      key={col.key}
                      onClick={() => toggleSort(col.key)}
                      className={`px-4 py-3 text-left font-medium text-stone cursor-pointer hover:text-espresso transition-colors whitespace-nowrap ${isArabic ? 'text-right' : ''}`}
                    >
                      {col.label}{sortArrow(col.key)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sorted.length === 0 ? (
                  <tr>
                    <td colSpan={8} className={`text-center py-12 text-stone ${isArabic ? 'font-arabic' : ''}`}>
                      {isArabic ? 'لا توجد نتائج' : 'Aucun résultat'}
                    </td>
                  </tr>
                ) : (
                  sorted.map((b, i) => (
                    <tr key={i} className="border-b border-gold/5 hover:bg-sand/50 transition-colors">
                      <td className="px-4 py-3 font-mono text-xs text-olive whitespace-nowrap">{b.ref}</td>
                      <td className={`px-4 py-3 text-espresso whitespace-nowrap ${isArabic ? 'font-arabic' : ''}`}>{b.service}</td>
                      <td className="px-4 py-3 text-stone whitespace-nowrap">{b.date}</td>
                      <td className="px-4 py-3 text-stone whitespace-nowrap">{b.time}</td>
                      <td className={`px-4 py-3 text-espresso whitespace-nowrap ${isArabic ? 'font-arabic' : ''}`}>{b.name}</td>
                      <td className="px-4 py-3 text-stone whitespace-nowrap" dir="ltr">{b.phone}</td>
                      <td className="px-4 py-3 font-medium text-olive whitespace-nowrap">{b.price}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          b.status === 'confirmed'
                            ? 'bg-olive/10 text-olive'
                            : 'bg-terracotta/10 text-terracotta'
                        }`}>
                          {b.status === 'confirmed' ? (isArabic ? 'مؤكّد' : 'Confirmé') : (isArabic ? 'ملغى' : 'Annulé')}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
