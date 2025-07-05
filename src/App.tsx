// src/App.tsx
import { Routes, Route } from 'react-router-dom'
import Home from './Home'
import { ThemeProvider } from './context/theme-context'
import { AuthProvider } from './context/auth-context'
import './index.css'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Add more routes here later */}
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
