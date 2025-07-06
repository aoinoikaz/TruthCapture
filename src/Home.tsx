// src/Home.tsx
import { useTheme } from './context/theme-context'
import { useAuth } from './context/auth-context'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

const Home = () => {
  const { theme, toggleTheme } = useTheme()
  const { user } = useAuth()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''}`}>
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>
      </div>

      {/* Header */}
      <header className="relative z-10 backdrop-blur-md bg-white/5 dark:bg-gray-900/5 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className={`flex items-center gap-3 transition-all duration-700 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur-lg opacity-50"></div>
                <div className="relative w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">T</span>
                </div>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                TruthCapture
              </h1>
            </div>

            <div className={`flex items-center gap-4 transition-all duration-700 delay-100 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
              <button
                onClick={toggleTheme}
                className="relative p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300 group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 dark:from-blue-400 dark:to-purple-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity blur-xl"></div>
                <span className="relative text-2xl">{theme === 'dark' ? '🌙' : '☀️'}</span>
              </button>
              
              {user ? (
                <Link to="/dashboard">
                  <button className="relative px-6 py-2.5 rounded-lg font-semibold text-white overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative">Dashboard</span>
                  </button>
                </Link>
              ) : (
                <Link to="/auth">
                  <button className="relative px-6 py-2.5 rounded-lg font-semibold text-white overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative">Get Started</span>
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-20">
          {/* Hero Content */}
          <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="mb-6 inline-block">
              <div className="px-4 py-1.5 bg-gradient-to-r from-blue-500/20 to-purple-600/20 backdrop-blur-sm rounded-full border border-white/20">
                <span className="text-sm font-medium bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  🔐 Cryptographically Verified Web Evidence
                </span>
              </div>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-bold mb-6 text-white">
              The Internet's
              <span className="block mt-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Trust Layer
              </span>
            </h2>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
              Capture, verify, and prove any digital content with Byzantine fault-tolerant consensus. 
              Create court-admissible evidence with mathematical certainty.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={user ? "/dashboard" : "/auth"}>
                <button className="relative px-8 py-4 rounded-xl font-semibold text-white overflow-hidden group transform hover:scale-105 transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative flex items-center gap-2">
                    Start Capturing <span className="text-xl">→</span>
                  </span>
                </button>
              </Link>
              
              <button className="px-8 py-4 rounded-xl font-semibold text-white border border-white/20 hover:bg-white/10 transform hover:scale-105 transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>

          {/* Feature Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-20">
            {[
              {
                icon: "🌐",
                title: "Distributed Verification",
                description: "Multi-node consensus ensures tamper-proof evidence",
                gradient: "from-blue-500 to-cyan-500"
              },
              {
                icon: "⚖️",
                title: "Legal-Grade Evidence",
                description: "Court-admissible with cryptographic chain of custody",
                gradient: "from-purple-500 to-pink-500"
              },
              {
                icon: "🔒",
                title: "Zero-Knowledge Proofs",
                description: "Verify content without revealing sensitive data",
                gradient: "from-green-500 to-emerald-500"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className={`relative group transition-all duration-700 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <div className="relative p-8 bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                  <div className={`mt-6 h-1 w-20 bg-gradient-to-r ${feature.gradient} rounded-full transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-3xl"></div>
            <div className="relative bg-gray-900/50 backdrop-blur-sm rounded-3xl border border-white/10 p-12">
              <div className="grid md:grid-cols-4 gap-8 text-center">
                {[
                  { value: "99.9%", label: "Uptime SLA" },
                  { value: "< 3s", label: "Verification Time" },
                  { value: "10+", label: "Global Nodes" },
                  { value: "256-bit", label: "Encryption" }
                ].map((stat, index) => (
                  <div key={index} className="group">
                    <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                      {stat.value}
                    </div>
                    <div className="text-gray-400 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Use Cases */}
          <div className="mt-20">
            <h3 className="text-3xl font-bold text-center text-white mb-12">
              Trusted by Legal, Enterprise & Government
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                "Legal Evidence",
                "Compliance Audits", 
                "IP Protection",
                "Fraud Prevention"
              ].map((useCase, index) => (
                <div
                  key={index}
                  className="p-6 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm rounded-xl border border-white/10 text-center text-white hover:scale-105 transition-all duration-300"
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  {useCase}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-20 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 TruthCapture. Patent Pending.
            </p>
            <div className="flex gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home