import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'
import { AuthProvider } from './components/AuthProvider'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
)
