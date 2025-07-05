// src/Dashboard.tsx
import { useAuth } from './context/auth-context'
import { useTheme } from './context/theme-context'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className={`p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            TruthCapture Dashboard
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
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6">
        <div className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white shadow-lg'}`}>
          <h2 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Welcome, {user?.displayName || user?.email}!
          </h2>
          <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
            You're logged in to TruthCapture. Start capturing and verifying web content.
          </p>
          
          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-4 mt-8">
            <button className="p-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all">
              <h3 className="text-lg font-semibold mb-2">New Capture</h3>
              <p className="text-sm opacity-90">Start a new web capture</p>
            </button>
            
            <button className={`p-6 rounded-lg transition-all ${
              theme === 'dark' 
                ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
            }`}>
              <h3 className="text-lg font-semibold mb-2">History</h3>
              <p className="text-sm opacity-75">View past captures</p>
            </button>
            
            <button className={`p-6 rounded-lg transition-all ${
              theme === 'dark' 
                ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
            }`}>
              <h3 className="text-lg font-semibold mb-2">Settings</h3>
              <p className="text-sm opacity-75">Manage your account</p>
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard