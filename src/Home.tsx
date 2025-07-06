// src/Home.tsx
import { useTheme } from './context/theme-context'
import { useAuth } from './context/auth-context'
import { Link } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import { ChevronRight, Shield, Zap, Lock, Globe, Check, Sun, Moon, ArrowRight, BarChart3, FileCheck } from 'lucide-react'

const Home = () => {
  const { theme, toggleTheme } = useTheme()
  const { user } = useAuth()
  const [isVisible, setIsVisible] = useState(false)
  const featuresRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsVisible(true)
    
    // Intersection observer for animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate')
          }
        })
      },
      { threshold: 0.1 }
    )

    // Observe all elements with data-animate
    document.querySelectorAll('[data-animate]').forEach((el) => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''} bg-white dark:bg-gray-950 relative`}>
      {/* Background gradient */}
      <div className="gradient-bg" />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl">
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
                  <a href="#features" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                    Features
                  </a>
                  <a href="#how-it-works" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                    How it Works
                  </a>
                  <a href="#pricing" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                    Pricing
                  </a>
                  <a href="#" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                    Docs
                  </a>
                </div>
                
                <div className="flex items-center space-x-4">
                  <button
                    onClick={toggleTheme}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    aria-label="Toggle theme"
                  >
                    {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                  </button>
                  
                  {user ? (
                    <Link to="/dashboard">
                      <button className="btn btn-primary">
                        Dashboard
                      </button>
                    </Link>
                  ) : (
                    <Link to="/auth">
                      <button className="btn btn-primary">
                        Get Started
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-20 pb-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 text-sm font-medium mb-8 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                </span>
                <span>🔐 Cryptographically Verified Web Evidence</span>
              </div>

              <h1 className={`text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-gray-100 mb-8 ${isVisible ? 'animate-fade-up stagger-1' : 'opacity-0'}`}>
                The Internet's
                <span className="block gradient-text">Trust Layer</span>
              </h1>

              <p className={`text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed ${isVisible ? 'animate-fade-up stagger-2' : 'opacity-0'}`}>
                Capture, verify, and prove any digital content with Byzantine fault-tolerant consensus. 
                Create court-admissible evidence with mathematical certainty.
              </p>

              <div className={`flex flex-col sm:flex-row gap-4 justify-center mb-12 ${isVisible ? 'animate-fade-up stagger-3' : 'opacity-0'}`}>
                <Link to={user ? "/dashboard" : "/auth"}>
                  <button className="btn btn-gradient h-12 px-8 text-base group">
                    Start Capturing 
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <button className="btn btn-secondary h-12 px-8 text-base">
                  Learn More
                </button>
              </div>

              <div className={`flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600 dark:text-gray-400 ${isVisible ? 'animate-fade-up stagger-4' : 'opacity-0'}`}>
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
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="py-24 bg-gray-50 dark:bg-gray-900/50" ref={featuresRef}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4" data-animate>
                Everything you need for digital evidence
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto" data-animate>
                Professional-grade tools designed for legal compliance and maximum reliability
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: <Globe className="w-6 h-6" />,
                  title: "Distributed Verification",
                  description: "Multi-node consensus ensures tamper-proof evidence",
                  color: "purple"
                },
                {
                  icon: <FileCheck className="w-6 h-6" />,
                  title: "Legal-Grade Evidence",
                  description: "Court-admissible with cryptographic chain of custody",
                  color: "blue"
                },
                {
                  icon: <Zap className="w-6 h-6" />,
                  title: "Instant Verification",
                  description: "Get cryptographic proof in under 3 seconds",
                  color: "yellow"
                },
                {
                  icon: <Lock className="w-6 h-6" />,
                  title: "Zero-Knowledge Proofs",
                  description: "Verify content without revealing sensitive data",
                  color: "green"
                },
                {
                  icon: <Shield className="w-6 h-6" />,
                  title: "AI-Powered Analysis",
                  description: "Detect deepfakes and manipulated content",
                  color: "purple"
                },
                {
                  icon: <BarChart3 className="w-6 h-6" />,
                  title: "API Integration",
                  description: "Seamlessly integrate with your existing stack",
                  color: "blue"
                }
              ].map((feature, index) => (
                <div
                  key={index}
                  className="card group hover:border-purple-500 dark:hover:border-purple-400"
                  data-animate
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className={`inline-flex p-3 rounded-xl bg-${feature.color}-100 dark:bg-${feature.color}-900/30 text-${feature.color}-600 dark:text-${feature.color}-400 mb-4`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-24" ref={statsRef}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { value: "99.99%", label: "Uptime SLA", suffix: "" },
                { value: "2.3", label: "Avg Verification Time", suffix: "s" },
                { value: "10", label: "Global Nodes", suffix: "+" },
                { value: "1M", label: "Captures Processed", suffix: "+" }
              ].map((stat, index) => (
                <div key={index} className="text-center" data-animate style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="text-4xl sm:text-5xl font-bold gradient-text mb-2">
                    {stat.value}<span className="text-2xl">{stat.suffix}</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section id="how-it-works" className="py-24 bg-gray-50 dark:bg-gray-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Simple, powerful, reliable
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Get cryptographic proof of any digital content in three easy steps
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Submit URL",
                  description: "Enter any URL or upload content directly. Our system handles all content types."
                },
                {
                  step: "02",
                  title: "Multi-Node Capture",
                  description: "Distributed nodes simultaneously capture and verify content using consensus algorithms."
                },
                {
                  step: "03",
                  title: "Get Certified Proof",
                  description: "Receive court-admissible documentation with cryptographic verification."
                }
              ].map((item, index) => (
                <div key={index} className="relative" data-animate style={{ animationDelay: `${index * 150}ms` }}>
                  <div className="text-7xl font-bold text-gray-100 dark:text-gray-800 mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {item.description}
                  </p>
                  {index < 2 && (
                    <ChevronRight className="hidden lg:block absolute top-12 -right-4 w-6 h-6 text-gray-300 dark:text-gray-700" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="card bg-gradient-to-br from-purple-600 to-purple-700 border-0 text-center p-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Ready to secure your digital evidence?
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
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">T</span>
                </div>
                <span className="font-semibold">TruthCapture</span>
              </div>
              
              <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
                <a href="#" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">Privacy</a>
                <a href="#" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">Terms</a>
                <a href="#" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">Docs</a>
                <a href="#" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">Contact</a>
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-400">
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