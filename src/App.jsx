import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import { LanguageProvider } from './context/LanguageContext'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import MenuPage from './pages/Menu'
import AboutPage from './pages/About'
import BookingPage from './pages/Booking'
import MapPage from './pages/MapPage'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <LanguageProvider>
      <Router basename="/donia-spa">
        <div className="min-h-screen bg-background font-sans antialiased">
          <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/booking" element={<BookingPage />} />
              <Route path="/map" element={<MapPage />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  )
}

export default App
