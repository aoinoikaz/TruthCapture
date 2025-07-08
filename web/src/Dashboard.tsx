// src/Dashboard.tsx
import { useAuth } from './context/auth-context'
import { useTheme } from './context/theme-context'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { 
  Clock, Globe, CheckCircle,
  FileText, Download,
  Zap, Sun, Moon,
  Plus, MoreVertical, Copy, Check
} from 'lucide-react'

const Dashboard = () => {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const [isVisible, setIsVisible] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  const handleCopy = (id: string) => {
    navigator.clipboard.writeText(`https://truthcapture.ai/verify/${id}`)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  // Mock data
  const stats = {
    totalCaptures: 1247,
    verifiedToday: 89,
    activeNodes: 10,
    avgResponseTime: 2.3
  }

  const recentCaptures = [
    {
      id: 'cap_1',
      url: 'https://example.com/article/breaking-news',
      timestamp: '2 hours ago',
      status: 'verified',
      nodes: 7,
      hash: '0x7f83...4d2a',
      type: 'webpage'
    },
    {
      id: 'cap_2',
      url: 'https://social.media/post/123456',
      timestamp: '5 hours ago',
      status: 'verified',
      nodes: 5,
      hash: '0x9a2f...8b3c',
      type: 'social'
    },
    {
      id: 'cap_3',
      url: 'https://news.site/2025/article',
      timestamp: '1 day ago',
      status: 'processing',
      nodes: 3,
      hash: null,
      type: 'webpage'
    }
  ]

  const activities = [
    { type: 'capture', message: 'New capture verified', time: '2 min ago', status: 'success' },
    { type: 'export', message: 'Certificate exported', time: '1 hour ago', status: 'default' },
    { type: 'api', message: 'API key generated', time: '3 hours ago', status: 'default' },
    { type: 'capture', message: 'Capture processing', time: '5 hours ago', status: 'warning' }
  ]

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark bg-gray-950' : 'bg-gray-50'} relative`}>
      {/* Background gradient */}
      <div className="gradient-bg" />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className={`${
          theme === 'dark' 
            ? 'bg-gray-900/80 border-gray-800' 
            : 'bg-white/80 border-gray-200'
        } backdrop-blur-xl border-b`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-8">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-lg">T</span>
                  </div>
                  <span className="hidden sm:block font-semibold text-lg">TruthCapture</span>
                </div>
                
                <nav className="hidden md:flex items-center space-x-1">
                  <a href="#" className={`px-4 py-2 text-sm font-medium rounded-lg ${
                    theme === 'dark'
                      ? 'text-gray-100 bg-gray-800'
                      : 'text-gray-900 bg-gray-100'
                  }`}>
                    Overview
                  </a>
                  <a href="#" className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    theme === 'dark'
                      ? 'text-gray-400 hover:text-gray-100 hover:bg-gray-800'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}>
                    Captures
                  </a>
                  <a href="#" className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    theme === 'dark'
                      ? 'text-gray-400 hover:text-gray-100 hover:bg-gray-800'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}>
                    API Keys
                  </a>
                  <a href="#" className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    theme === 'dark'
                      ? 'text-gray-400 hover:text-gray-100 hover:bg-gray-800'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}>
                    Settings
                  </a>
                </nav>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={toggleTheme}
                  className={`p-2 rounded-lg transition-colors ${
                    theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                  }`}
                  aria-label="Toggle theme"
                >
                  {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
                
                <div className="flex items-center space-x-3">
                  <span className={`text-sm ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>{user?.displayName || 'User'}</span>
                  <button
                    onClick={handleLogout}
                    className={`text-sm font-medium transition-colors ${
                      theme === 'dark'
                        ? 'text-gray-400 hover:text-gray-100'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className={`mb-8 animate-fade-up ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <h1 className={`text-4xl font-bold mb-2 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Welcome back, {user?.displayName || 'User'}
            </h1>
            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
              Here's what's happening with your captures today.
            </p>
          </div>

          {/* Capture Input */}
          <div className={`card mb-8 p-6 animate-fade-up stagger-1 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex gap-4">
              <input
                type="url"
                placeholder="Enter URL to capture..."
                className={`flex-1 px-4 py-3 rounded-xl border transition-all ${
                  theme === 'dark'
                    ? 'bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-purple-500'
                    : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 focus:border-purple-500'
                } focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
              />
              <button className="btn btn-gradient flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Capture Now
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="stat-card animate-fade-up stagger-1">
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 bg-purple-500/10 rounded-lg">
                  <FileText className="w-5 h-5 text-purple-500" />
                </div>
                <span className="text-sm font-medium text-green-500">+12%</span>
              </div>
              <h3 className={`text-2xl font-bold mb-1 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>{stats.totalCaptures.toLocaleString()}</h3>
              <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                Total Captures
              </p>
            </div>

            <div className="stat-card animate-fade-up stagger-2">
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
                <span className="text-sm font-medium text-green-500">+23%</span>
              </div>
              <h3 className={`text-2xl font-bold mb-1 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>{stats.verifiedToday}</h3>
              <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                Verified Today
              </p>
            </div>

            <div className="stat-card animate-fade-up stagger-3">
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <Globe className="w-5 h-5 text-blue-500" />
                </div>
                <span className="tag tag-green text-xs">operational</span>
              </div>
              <h3 className={`text-2xl font-bold mb-1 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>{stats.activeNodes}</h3>
              <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                Active Nodes
              </p>
            </div>

            <div className="stat-card animate-fade-up stagger-4">
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 bg-yellow-500/10 rounded-lg">
                  <Zap className="w-5 h-5 text-yellow-500" />
                </div>
                <span className="text-sm font-medium text-blue-500">-0.3s</span>
              </div>
              <h3 className={`text-2xl font-bold mb-1 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>{stats.avgResponseTime}s</h3>
              <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                Avg Response
              </p>
            </div>
          </div>

          {/* Bottom Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Captures */}
            <div className={`lg:col-span-2 card animate-fade-up ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
              <div className="flex justify-between items-center mb-6">
                <h2 className={`text-xl font-semibold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>Recent Captures</h2>
                <a href="#" className="text-sm font-medium text-purple-500 hover:text-purple-600">
                  View all →
                </a>
              </div>

              <div className="space-y-3">
                {recentCaptures.map((capture) => (
                  <div key={capture.id} className="capture-item">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`tag ${
                            capture.type === 'social' ? 'tag-purple' : 'tag-default'
                          } text-xs`}>
                            {capture.type}
                          </span>
                          <span className={`tag ${
                            capture.status === 'verified' ? 'tag-green' : 'tag-yellow'
                          } text-xs`}>
                            {capture.status}
                          </span>
                          {capture.hash && (
                            <span className={`font-mono text-xs ${
                              theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                            }`}>
                              {capture.hash}
                            </span>
                          )}
                        </div>
                        <h3 className={`font-medium mb-1 ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>
                          {capture.url}
                        </h3>
                        <div className={`flex items-center gap-4 text-sm ${
                          theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                        }`}>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {capture.timestamp}
                          </span>
                          <span className="flex items-center gap-1">
                            <Globe className="w-3 h-3" />
                            {capture.nodes} nodes
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleCopy(capture.id)}
                          className={`p-2 rounded-lg transition-colors ${
                            theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                          }`}
                          title="Copy verification link"
                        >
                          {copiedId === capture.id ? (
                            <Check className="w-4 h-4 text-green-500" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                        <button className={`p-2 rounded-lg transition-colors ${
                          theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                        }`}>
                          <Download className="w-4 h-4" />
                        </button>
                        <button className={`p-2 rounded-lg transition-colors ${
                          theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                        }`}>
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity Feed */}
            <div className={`card animate-fade-up ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
              <h2 className={`text-xl font-semibold mb-6 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>Activity</h2>
              
              <div className="space-y-4">
                {activities.map((activity, idx) => (
                  <div key={idx} className="activity-item">
                    <div className={`w-2 h-2 rounded-full mt-1.5 ${
                      activity.status === 'success' ? 'bg-green-500' :
                      activity.status === 'warning' ? 'bg-yellow-500' : 
                      theme === 'dark' ? 'bg-gray-600' : 'bg-gray-400'
                    }`} />
                    <div className="flex-1">
                      <p className={`text-sm ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>{activity.message}</p>
                      <p className={`text-xs mt-1 ${
                        theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                      }`}>{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Usage */}
              <div className={`mt-8 pt-6 border-t ${
                theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
              }`}>
                <h3 className={`text-sm font-medium mb-3 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>Usage This Month</h3>
                <div className="mb-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                      Captures
                    </span>
                    <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                      847 / 1,000
                    </span>
                  </div>
                  <div className="progress">
                    <div className="progress-bar" style={{ width: '84.7%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Dashboard