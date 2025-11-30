import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { HashRouter } from 'react-router-dom'
import AuthProvider from './contextAPI/AuthContext.jsx'


createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <HashRouter basename="/skill-exchange">
      <App />
    </HashRouter>
  </AuthProvider>


)
