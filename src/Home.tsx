// src/pages/Home.tsx
import { useTheme } from './context/theme-context'
import { useAuth } from './context/auth-context'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { auth } from './config/firebase'

const Home = () => {
  const { theme, toggleTheme } = useTheme()
  const { user } = useAuth()
  const [firebaseConnected, setFirebaseConnected] = useState(false)

  useEffect(() => {
    if (auth) {
      setFirebaseConnected(true)
    }
  }, [])

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header with dark mode toggle */}
      <header className={`p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            TruthCapture
          </h1>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-all ${
                theme === 'dark' 
                  ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
              }`}
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
            {user ? (
              <Link to="/dashboard">
                <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:opacity-90">
                  Dashboard
                </button>
              </Link>
            ) : (
              <Link to="/auth">
                <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:opacity-90">
                  Sign In
                </button>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h2 className={`text-5xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Cryptographically-Verified Web Evidence
          </h2>
          <p className={`text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Capture, verify, and prove web content with distributed consensus
          </p>
        </div>

        {/* Status Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <div className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white shadow-lg'}`}>
            <h3 className={`text-lg font-semibold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              System Status
            </h3>
            <div className="space-y-2">
              <StatusItem label="Firebase" status={firebaseConnected} />
              <StatusItem label="Authentication" status={true} />
              <StatusItem label="Theme System" status={true} />
              <StatusItem label="Tailwind CSS" status={true} />
            </div>
          </div>

          {/* Add more cards here */}
        </div>
      </main>
    </div>
  )
}

// Helper component
const StatusItem = ({ label, status }: { label: string; status: boolean }) => {
  const { theme } = useTheme()
  return (
    <div className="flex items-center justify-between">
      <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>{label}</span>
      <span className={status ? 'text-green-500' : 'text-red-500'}>
        {status ? '✅ Active' : '❌ Inactive'}
      </span>
    </div>
  )
}

export default Home