import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './context/LanguageContext'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Dashboard from './pages/Dashboard'

function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}

function App() {
  return (
    <LanguageProvider>
      <Router basename={import.meta.env.BASE_URL === '/donia-spa/' ? '/donia-spa' : ''}>
        <div className="min-h-screen bg-sand">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<MainLayout><Home /></MainLayout>} />
            <Route path="/about" element={<MainLayout><About /></MainLayout>} />
          </Routes>
        </div>
      </Router>
    </LanguageProvider>
  )
}

export default App
