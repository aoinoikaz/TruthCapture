// src/Dashboard.tsx
import { useAuth } from './context/auth-context'
import { useTheme } from './context/theme-context'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

const Dashboard = () => {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const [isVisible, setIsVisible] = useState(false)
  const [activeTab, setActiveTab] = useState('captures')

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  // Mock data for demo
  const recentCaptures = [
    { id: 1, url: 'https://example.com/article', timestamp: '2 hours ago', status: 'verified', nodes: 5 },
    { id: 2, url: 'https://news.site/breaking', timestamp: '5 hours ago', status: 'verified', nodes: 7 },
    { id: 3, url: 'https://social.media/post/123', timestamp: '1 day ago', status: 'processing', nodes: 3 },
  ]

  const stats = {
    totalCaptures: 147,
    verifiedCaptures: 142,
    activeNodes: 10,
    avgVerificationTime: '2.3s'
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''}`}>
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-blue-900/10 to-gray-900 dark:from-gray-900 dark:via-blue-900/10 dark:to-gray-900">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>
      </div>

      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-full w-64 bg-gray-900/50 backdrop-blur-md border-r border-white/10 transform transition-transform duration-500 ${
        isVisible ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur-lg opacity-50"></div>
              <div className="relative w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">T</span>
              </div>
            </div>
            <h1 className="text-xl font-bold text-white">TruthCapture</h1>
          </div>

          <nav className="space-y-2">
            {[
              { id: 'captures', label: 'Captures', icon: '📸' },
              { id: 'verify', label: 'Verify', icon: '✓' },
              { id: 'history', label: 'History', icon: '📊' },
              { id: 'settings', label: 'Settings', icon: '⚙️' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/20 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="absolute bottom-6 left-6 right-6">
            <div className="p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-white/10 mb-4">
              <p className="text-xs text-gray-400 mb-1">Current Plan</p>
              <p className="text-white font-semibold">Professional</p>
              <p className="text-xs text-blue-400 mt-1">1,000 captures/month</p>
            </div>

            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 min-h-screen">
        {/* Top Bar */}
        <header className="sticky top-0 z-20 bg-gray-900/50 backdrop-blur-md border-b border-white/10">
          <div className="flex justify-between items-center px-8 py-4">
            <div className={`transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}>
              <h2 className="text-2xl font-bold text-white">Dashboard</h2>
              <p className="text-gray-400">Welcome back, {user?.displayName || user?.email}</p>
            </div>

            <div className="flex items-center gap-4">
              <button className="relative p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all">
                <span className="text-xl">🔔</span>
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all"
              >
                <span className="text-xl">{theme === 'dark' ? '🌙' : '☀️'}</span>
              </button>

              <div className="flex items-center gap-3 px-4 py-2 bg-white/10 rounded-lg">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">
                    {user?.displayName?.[0] || user?.email?.[0] || '?'}
                  </span>
                </div>
                <span className="text-white text-sm font-medium">
                  {user?.displayName || 'User'}
                </span>
              </div>
            </div>
          </div>
        </header>

        <div className="p-8">
          {/* Stats Grid */}
          <div className={`grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 transition-all duration-700 delay-100 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}>
            {[
              { label: 'Total Captures', value: stats.totalCaptures, icon: '📸', color: 'from-blue-500 to-cyan-500' },
              { label: 'Verified', value: stats.verifiedCaptures, icon: '✅', color: 'from-green-500 to-emerald-500' },
              { label: 'Active Nodes', value: stats.activeNodes, icon: '🌐', color: 'from-purple-500 to-pink-500' },
              { label: 'Avg Time', value: stats.avgVerificationTime, icon: '⚡', color: 'from-orange-500 to-red-500' },
            ].map((stat, index) => (
              <div
                key={index}
                className="relative group"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity`}></div>
                <div className="relative p-6 bg-gray-900/50 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/20 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl">{stat.icon}</span>
                    <span className={`text-xs px-2 py-1 rounded-full bg-gradient-to-r ${stat.color} text-white`}>
                      {index === 0 ? '+12%' : index === 1 ? '96.6%' : index === 2 ? 'Live' : 'Fast'}
                    </span>
                  </div>
                  <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Capture */}
          <div className={`mb-8 transition-all duration-700 delay-200 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <div className="relative p-8 bg-gradient-to-r from-blue-500/10 to-purple-600/10 backdrop-blur-sm rounded-2xl border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-4">Quick Capture</h3>
                <div className="flex gap-4">
                  <input
                    type="url"
                    placeholder="Enter URL to capture..."
                    className="flex-1 px-6 py-3 bg-gray-900/50 backdrop-blur-sm rounded-lg border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all"
                  />
                  <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300">
                    Capture Now
                  </button>
                </div>
                <p className="text-gray-400 text-sm mt-4">
                  💡 Pro tip: Use our browser extension for one-click captures
                </p>
              </div>
            </div>
          </div>

          {/* Recent Captures */}
          <div className={`transition-all duration-700 delay-300 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">Recent Captures</h3>
              <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                View All →
              </button>
            </div>

            <div className="space-y-4">
              {recentCaptures.map((capture, index) => (
                <div
                  key={capture.id}
                  className="p-6 bg-gray-900/50 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-[1.02]"
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-white font-medium mb-1">{capture.url}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span>📅 {capture.timestamp}</span>
                        <span>🌐 {capture.nodes} nodes</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          capture.status === 'verified' 
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                            : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                        }`}>
                          {capture.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-white/10 rounded-lg transition-all">
                        <span className="text-gray-400">👁️</span>
                      </button>
                      <button className="p-2 hover:bg-white/10 rounded-lg transition-all">
                        <span className="text-gray-400">📄</span>
                      </button>
                      <button className="p-2 hover:bg-white/10 rounded-lg transition-all">
                        <span className="text-gray-400">⬇️</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard