// src/Home.tsx
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from './context/auth-context'
import { useTheme } from './context/theme-context'
import { 
  Shield, Lock, Zap, Globe, 
  Check, ArrowRight, Sun, Moon
} from 'lucide-react'

const Home = () => {
  const { user } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const features = [
    {
      icon: Shield,
      title: 'Byzantine Fault Tolerance',
      description: 'Multi-node consensus ensures no single point of failure. Mathematical proof of authenticity.'
    },
    {
      icon: Lock,
      title: 'Court-Admissible Evidence',
      description: 'Generate legally compliant certificates with complete chain-of-custody documentation.'
    },
    {
      icon: Zap,
      title: 'Lightning Fast Capture',
      description: 'Capture any web content in under 3 seconds with parallel node processing.'
    },
    {
      icon: Globe,
      title: 'Global Node Network',
      description: 'Distributed nodes across multiple regions ensure reliability and availability.'
    }
  ]

  const stats = [
    { value: '1M+', label: 'Captures Verified' },
    { value: '99.9%', label: 'Uptime SLA' },
    { value: '<3s', label: 'Avg Capture Time' },
    { value: '50+', label: 'Global Nodes' }
  ]

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark bg-gray-950' : 'bg-white'} relative`}>
      {/* Background gradient */}
      <div className="gradient-bg" />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Navigation */}
        <nav className={`border-b ${
          theme === 'dark' 
            ? 'border-gray-800 bg-gray-950/80' 
            : 'border-gray-200 bg-white/80'
        } backdrop-blur-xl`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <Link to="/" className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-lg">T</span>
                  </div>
                  <span className="font-semibold text-lg hidden sm:block">TruthCapture</span>
                </Link>
              </div>

              <div className="flex items-center space-x-8">
                <div className="hidden md:flex items-center space-x-6">
                  <a href="#features" className={`text-sm font-medium transition-colors ${
                    theme === 'dark'
                      ? 'text-gray-400 hover:text-gray-100'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}>
                    Features
                  </a>
                  <a href="#how-it-works" className={`text-sm font-medium transition-colors ${
                    theme === 'dark'
                      ? 'text-gray-400 hover:text-gray-100'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}>
                    How it Works
                  </a>
                  <a href="#pricing" className={`text-sm font-medium transition-colors ${
                    theme === 'dark'
                      ? 'text-gray-400 hover:text-gray-100'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}>
                    Pricing
                  </a>
                  <a href="#" className={`text-sm font-medium transition-colors ${
                    theme === 'dark'
                      ? 'text-gray-400 hover:text-gray-100'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}>
                    Docs
                  </a>
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
                  
                  {user ? (
                    <Link to="/dashboard">
                      <button className="btn btn-gradient">
                        Dashboard
                      </button>
                    </Link>
                  ) : (
                    <Link to="/auth">
                      <button className="btn btn-gradient">
                        Dashboard
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="hero-section py-32">
          <div className="hero-section-bg" />
          <div className={`relative z-10 max-w-5xl mx-auto px-4 text-center animate-fade-up ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}>
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm mb-8 ${
              theme === 'dark'
                ? 'bg-purple-500/20 border border-purple-500/30 text-purple-300'
                : 'bg-purple-100 border border-purple-200 text-purple-700'
            }`}>
              <Lock className="w-4 h-4" />
              <span className="font-medium">🔐 Cryptographically Verified Web Evidence</span>
            </div>
            
            <h1 className={`text-5xl md:text-6xl font-bold mb-6 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              The Internet's
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600 mt-2">
                Trust Layer
              </span>
            </h1>
            
            <p className={`text-xl mb-8 max-w-3xl mx-auto ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Capture, verify, and prove any digital content exists with advanced distributed consensus methodologies.
              Court-admissible evidence with mathematical certainty. Realtime processing using advanced machine learning technology.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to={user ? "/dashboard" : "/auth"}>
                <button className="btn btn-gradient h-12 px-8 flex items-center gap-2">
                  Start Capturing
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <button className={`btn h-12 px-8 ${
                theme === 'dark'
                  ? 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
                  : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
              }`}>
                Learn More
              </button>
            </div>

            <div className={`flex items-center justify-center gap-8 mt-12 text-sm ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                <span>100 free captures/month</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className={`py-20 ${
          theme === 'dark' ? 'bg-gray-900/50' : 'bg-gray-50'
        }`}>
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, idx) => (
                <div key={idx} className={`text-center animate-fade-up stagger-${idx + 1} ${
                  isVisible ? 'opacity-100' : 'opacity-0'
                }`}>
                  <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">
                    {stat.value}
                  </div>
                  <div className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24">
          <div className="max-w-6xl mx-auto px-4">
            <div className={`text-center mb-16 animate-fade-up ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}>
              <h2 className={`text-4xl font-bold mb-4 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Everything you need for digital evidence
              </h2>
              <p className={`text-xl ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Professional-grade tools designed for legal compliance and maximum reliability
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className={`card animate-fade-up stagger-${idx + 1} ${
                    isVisible ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-purple-500/10 rounded-xl">
                      <feature.icon className="w-6 h-6 text-purple-500" />
                    </div>
                    <div>
                      <h3 className={`text-xl font-semibold mb-2 ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        {feature.title}
                      </h3>
                      <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section id="how-it-works" className={`py-24 ${
          theme === 'dark' ? 'bg-gray-900/50' : 'bg-gray-50'
        }`}>
          <div className="max-w-6xl mx-auto px-4">
            <div className={`text-center mb-16 animate-fade-up ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}>
              <h2 className={`text-4xl font-bold mb-4 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                How it works
              </h2>
              <p className={`text-xl ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Three simple steps to verifiable proof
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className={`text-center animate-fade-up stagger-1 ${
                isVisible ? 'opacity-100' : 'opacity-0'
              }`}>
                <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-500">1</span>
                </div>
                <h3 className={`text-xl font-semibold mb-2 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  Submit URL
                </h3>
                <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                  Enter any URL you need to capture and preserve as evidence
                </p>
              </div>

              <div className={`text-center animate-fade-up stagger-2 ${
                isVisible ? 'opacity-100' : 'opacity-0'
              }`}>
                <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-500">2</span>
                </div>
                <h3 className={`text-xl font-semibold mb-2 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  Multi-Node Capture
                </h3>
                <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                  Multiple nodes independently capture and verify the content
                </p>
              </div>

              <div className={`text-center animate-fade-up stagger-3 ${
                isVisible ? 'opacity-100' : 'opacity-0'
              }`}>
                <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-500">3</span>
                </div>
                <h3 className={`text-xl font-semibold mb-2 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  Get Certified Proof
                </h3>
                <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                  Receive cryptographic proof and legal certificate instantly
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section py-20">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to start verifying?
            </h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Join thousands of legal professionals using TruthCapture to create verifiable proof of digital content.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={user ? "/dashboard" : "/auth"}>
                <button className="btn h-12 px-8 bg-white text-purple-600 hover:bg-gray-100">
                  Start Free Trial
                </button>
              </Link>
              <button className="btn h-12 px-8 bg-white/10 text-white border border-white/20 hover:bg-white/20">
                Schedule Demo
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className={`py-12 border-t ${
          theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">T</span>
                </div>
                <span className="font-semibold">TruthCapture</span>
              </div>
              
              <div className={`flex items-center space-x-6 text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <a href="#" className={`transition-colors ${
                  theme === 'dark' ? 'hover:text-gray-100' : 'hover:text-gray-900'
                }`}>Privacy</a>
                <a href="#" className={`transition-colors ${
                  theme === 'dark' ? 'hover:text-gray-100' : 'hover:text-gray-900'
                }`}>Terms</a>
                <a href="#" className={`transition-colors ${
                  theme === 'dark' ? 'hover:text-gray-100' : 'hover:text-gray-900'
                }`}>Docs</a>
                <a href="#" className={`transition-colors ${
                  theme === 'dark' ? 'hover:text-gray-100' : 'hover:text-gray-900'
                }`}>Contact</a>
              </div>
              
              <p className={`text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                © 2025 TruthCapture. Patent pending.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default Home