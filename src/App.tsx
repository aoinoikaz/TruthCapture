import { useEffect, useState } from 'react'
import { auth } from './config/firebase'
import './App.css'

function App() {
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    // Test Firebase connection
    if (auth) {
      setConnected(true)
      console.log('✅ Firebase connected!')
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">TruthCapture</h1>
        <p className={connected ? "text-green-400" : "text-yellow-400"}>
          {connected ? "✅ Firebase Connected" : "⏳ Connecting..."}
        </p>
      </div>
    </div>
  )
}

export default App
