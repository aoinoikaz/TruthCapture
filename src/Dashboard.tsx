// src/Dashboard.tsx
import { useAuth } from './context/auth-context'
import { useTheme } from './context/theme-context'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { 
  Clock, Globe, CheckCircle,
  FileText, Link2, Download,
  Shield, Zap, Sun, Moon,
  Plus, MoreVertical, ExternalLink, Copy, Check
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
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''} bg-gray-50 dark:bg-gray-950 relative`}>
      {/* Background gradient */}
      <div className="gradient-bg" />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800">
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
                  <a href="#" className="px-4 py-2 text-sm font-medium text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    Overview
                  </a>
                  <a href="#" className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    Captures
                  </a>
                  <a href="#" className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    API Keys
                  </a>
                  <a href="#" className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    Settings
                  </a>
                </nav>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={toggleTheme}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  aria-label="Toggle theme"
                >
                  {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
                
                <div className="h-8 w-px bg-gray-200 dark:bg-gray-800" />
                
                <div className="flex items-center space-x-3">
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {user?.displayName || 'User'}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {user?.email}
                    </p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 font-medium"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className={`mb-8 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Welcome back, {user?.displayName?.split(' ')[0] || 'there'}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Here's what's happening with your captures today.
            </p>
          </div>

          {/* Quick Capture */}
          <div className={`card mb-8 ${isVisible ? 'animate-fade-up stagger-1' : 'opacity-0'}`}>
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <input
                  type="url"
                  placeholder="Enter URL to capture..."
                  className="input w-full"
                />
              </div>
              <button className="btn btn-gradient">
                <Plus className="w-5 h-5" />
                Capture Now
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 ${isVisible ? 'animate-fade-up stagger-2' : 'opacity-0'}`}>
            <div className="stat-card">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <FileText className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <span className="text-sm font-medium text-green-600 dark:text-green-400">
                  +12%
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {stats.totalCaptures.toLocaleString()}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Total Captures
              </p>
            </div>

            <div className="stat-card">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <span className="text-sm font-medium text-green-600 dark:text-green-400">
                  +23%
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {stats.verifiedToday}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Verified Today
              </p>
            </div>

            <div className="stat-card">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Globe className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="tag tag-green text-xs">
                  operational
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {stats.activeNodes}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Active Nodes
              </p>
            </div>

            <div className="stat-card">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                  <Zap className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                </div>
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  -0.3s
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {stats.avgResponseTime}s
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Avg Response
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Recent Captures */}
            <div className={`lg:col-span-2 ${isVisible ? 'animate-fade-up stagger-3' : 'opacity-0'}`}>
              <div className="card">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Recent Captures</h2>
                  <button className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300">
                    View all →
                  </button>
                </div>

                <div className="space-y-3">
                  {recentCaptures.map((capture) => (
                    <div key={capture.id} className="capture-item">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`tag tag-${capture.type === 'social' ? 'purple' : 'default'}`}>
                              {capture.type}
                            </span>
                            <span className={`tag tag-${capture.status === 'verified' ? 'green' : 'yellow'}`}>
                              {capture.status}
                            </span>
                            {capture.hash && (
                              <code className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                                {capture.hash}
                              </code>
                            )}
                          </div>
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate mb-1">
                            {capture.url}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
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
                        
                        <div className="flex items-center gap-1 ml-4">
                          <button 
                            onClick={() => handleCopy(capture.id)}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                            title="Copy link"
                          >
                            {copiedId === capture.id ? (
                              <Check className="w-4 h-4 text-green-500" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                          <button 
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                            title="Download"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                          <button 
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                            title="More options"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className={`space-y-6 ${isVisible ? 'animate-fade-up stagger-4' : 'opacity-0'}`}>
              {/* Activity Feed */}
              <div className="card">
                <h3 className="text-lg font-semibold mb-4">Activity</h3>
                <div className="space-y-1">
                  {activities.map((activity, index) => (
                    <div key={index} className="activity-item">
                      <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                        activity.status === 'success' ? 'bg-green-500' :
                        activity.status === 'warning' ? 'bg-yellow-500' :
                        'bg-gray-400'
                      }`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900 dark:text-gray-100">
                          {activity.message}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Usage */}
              <div className="card">
                <h3 className="text-lg font-semibold mb-4">Usage This Month</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600 dark:text-gray-400">Captures</span>
                      <span className="font-medium">847 / 1,000</span>
                    </div>
                    <div className="progress">
                      <div className="progress-bar" style={{ width: '84.7%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600 dark:text-gray-400">API Calls</span>
                      <span className="font-medium">12.4k / 50k</span>
                    </div>
                    <div className="progress">
                      <div className="progress-bar" style={{ width: '24.8%' }} />
                    </div>
                  </div>
                  <button className="btn btn-secondary w-full mt-4">
                    Upgrade Plan
                  </button>
                </div>
              </div>

              {/* Quick Links */}
              <div className="card">
                <h3 className="text-lg font-semibold mb-4">Resources</h3>
                <div className="space-y-2">
                  {[
                    { label: 'API Documentation', icon: <FileText className="w-4 h-4" /> },
                    { label: 'Integration Guide', icon: <Link2 className="w-4 h-4" /> },
                    { label: 'Legal Compliance', icon: <Shield className="w-4 h-4" /> }
                  ].map((link, index) => (
                    <a
                      key={index}
                      href="#"
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-gray-500 dark:text-gray-400">{link.icon}</span>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {link.label}
                        </span>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
                    </a>
                  ))}
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