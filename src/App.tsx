// src/App.tsx
import { Routes, Route } from 'react-router-dom'
import Home from './Home'
import Auth from './Auth'
import AuthAction from './AuthAction'
import Dashboard from './Dashboard'
import ProtectedRoute from './routes/ProtectedRoute'
import SiteProtection from './components/SiteProtection' // Add this import
import { ThemeProvider } from './context/theme-context'
import { AuthProvider } from './context/auth-context'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <SiteProtection>  {/* Add this wrapper */}
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/auth/action" element={<AuthAction />} />
            
            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
        </SiteProtection>  {/* Close wrapper here */}
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App