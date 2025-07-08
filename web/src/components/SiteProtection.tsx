// src/components/SiteProtection.tsx
import { useState, useEffect } from 'react'
import { useTheme } from '../context/theme-context'

interface SiteProtectionProps {
  children: React.ReactNode
}

const SiteProtection: React.FC<SiteProtectionProps> = ({ children }) => {
  const { theme } = useTheme()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  // Hard-coded password - you can change this or use env variable
  const SITE_PASSWORD = 'fuckjews1234!' // Change this!

  useEffect(() => {
    // Check if already authenticated
    const authToken = localStorage.getItem('site-access-token')
    if (authToken === 'authenticated') {
      setIsAuthenticated(true)
    }
    setLoading(false)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (password === SITE_PASSWORD) {
      localStorage.setItem('site-access-token', 'authenticated')
      setIsAuthenticated(true)
      setError(false)
    } else {
      setError(true)
      setPassword('')
      // Clear error after 3 seconds
      setTimeout(() => setError(false), 3000)
    }
  }

  // Show loading briefly to prevent flash
  if (loading) {
    return (
      <div className={`min-h-screen ${theme === 'dark' ? 'dark bg-gray-950' : 'bg-gray-50'} flex items-center justify-center`}>
        <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  // Show password form if not authenticated
  if (!isAuthenticated) {
    return (
      <div className={`min-h-screen ${theme === 'dark' ? 'dark bg-gray-950' : 'bg-gray-50'} relative`}>
        {/* Background gradient */}
        <div className="gradient-bg" />
        
        <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
          <div className={`w-full max-w-md p-8 rounded-2xl ${
            theme === 'dark' 
              ? 'bg-gray-900/50 backdrop-blur-xl' 
              : 'bg-white/80 backdrop-blur-xl shadow-xl'
          }`}>
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-2xl">T</span>
              </div>
            </div>

            <h2 className={`text-2xl font-bold text-center mb-2 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              TruthCapture
            </h2>
            
            <p className={`text-center mb-8 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              This site is currently in private beta
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter access password"
                  className={`w-full px-4 py-3 rounded-xl border transition-all ${
                    theme === 'dark'
                      ? 'bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-purple-500'
                      : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 focus:border-purple-500'
                  } focus:outline-none focus:ring-2 focus:ring-purple-500/20 ${
                    error ? 'border-red-500 animate-shake' : ''
                  }`}
                  autoFocus
                />
                
                {error && (
                  <p className="text-red-500 text-sm mt-2">
                    Incorrect password. Please try again.
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full btn btn-gradient"
              >
                Access Site
              </button>
            </form>

            <p className={`text-center text-sm mt-6 ${
              theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
            }`}>
              Need access? Contact the administrator.
            </p>
          </div>
        </div>
      </div>
    )
  }

  // If authenticated, show the actual app
  return <>{children}</>
}

export default SiteProtection