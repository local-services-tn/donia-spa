import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { LanguageProvider } from './context/LanguageContext'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <LanguageProvider>
      <Router>
        <div className="min-h-screen bg-background font-sans antialiased">
          {/* Navigation */}
          <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

          {/* Main Content */}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/about" element={<About />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/map" element={<MapPage />} />
            </Routes>
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  )
}

export default App