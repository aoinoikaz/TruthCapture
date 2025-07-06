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
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''} bg-gray-50 dark:bg-gray-950`}>
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-purple-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <div className="hidden md:block">
                <nav className="flex space-x-1">
                  <a href="#" className="px-3 py-2 text-sm font-medium text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-800 rounded-md">
                    Overview
                  </a>
                  <a href="#" className="px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
                    Captures
                  </a>
                  <a href="#" className="px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
                    API Keys
                  </a>
                  <a href="#" className="px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
                    Settings
                  </a>
                </nav>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              
              <div className="w-px h-6 bg-gray-200 dark:bg-gray-800" />
              
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
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className={`mb-8 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
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
              <Plus className="w-4 h-4" />
              Capture Now
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 ${isVisible ? 'animate-fade-up stagger-2' : 'opacity-0'}`}>
          {[
            { 
              label: 'Total Captures', 
              value: stats.totalCaptures.toLocaleString(), 
              change: '+12%',
              icon: <FileText className="w-4 h-4" />,
              color: 'purple'
            },
            { 
              label: 'Verified Today', 
              value: stats.verifiedToday, 
              change: '+23%',
              icon: <CheckCircle className="w-4 h-4" />,
              color: 'green'
            },
            { 
              label: 'Active Nodes', 
              value: stats.activeNodes, 
              status: 'operational',
              icon: <Globe className="w-4 h-4" />,
              color: 'blue'
            },
            { 
              label: 'Avg Response', 
              value: `${stats.avgResponseTime}s`, 
              change: '-0.3s',
              icon: <Zap className="w-4 h-4" />,
              color: 'yellow'
            }
          ].map((stat, index) => (
            <div key={index} className="card">
              <div className="flex items-center justify-between mb-2">
                <span className={`tag tag-${stat.color}`}>
                  {stat.icon}
                </span>
                {stat.change && (
                  <span className={`text-xs font-medium ${
                    stat.change.startsWith('+') ? 'text-green-600 dark:text-green-400' : 'text-blue-600 dark:text-blue-400'
                  }`}>
                    {stat.change}
                  </span>
                )}
                {stat.status && (
                  <span className="tag tag-green text-xs">
                    {stat.status}
                  </span>
                )}
              </div>
              <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                {stat.value}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Captures */}
          <div className={`lg:col-span-2 ${isVisible ? 'animate-fade-up stagger-3' : 'opacity-0'}`}>
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Recent Captures</h2>
                <button className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300">
                  View all →
                </button>
              </div>

              <div className="space-y-4">
                {recentCaptures.map((capture) => (
                  <div key={capture.id} className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className={`tag tag-${capture.type === 'social' ? 'purple' : 'default'} text-xs`}>
                            {capture.type}
                          </span>
                          <span className={`tag tag-${capture.status === 'verified' ? 'green' : 'yellow'} text-xs`}>
                            {capture.status}
                          </span>
                          {capture.hash && (
                            <code className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                              {capture.hash}
                            </code>
                          )}
                        </div>
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
                          {capture.url}
                        </p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                          <span className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{capture.timestamp}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Globe className="w-3 h-3" />
                            <span>{capture.nodes} nodes</span>
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 ml-4">
                        <button 
                          onClick={() => handleCopy(capture.id)}
                          className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-md transition-colors"
                        >
                          {copiedId === capture.id ? (
                            <Check className="w-4 h-4 text-green-500" />
                          ) : (
                            <Copy className="w-4 h-4 text-gray-400" />
                          )}
                        </button>
                        <button className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-md transition-colors">
                          <Download className="w-4 h-4 text-gray-400" />
                        </button>
                        <button className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-md transition-colors">
                          <MoreVertical className="w-4 h-4 text-gray-400" />
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
              <div className="space-y-3">
                {activities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`w-2 h-2 rounded-full mt-1.5 ${
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
                    <span className="font-medium">847 / 1000</span>
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
              </div>
              <button className="btn btn-secondary w-full mt-4">
                Upgrade Plan
              </button>
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
                    className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-gray-400">{link.icon}</span>
                      <span className="text-sm text-gray-700 dark:text-gray-300">
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
  )
}

export default Dashboard