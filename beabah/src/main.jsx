import React from 'react'
import ReactDOM from 'react-dom/client'
import './global.css'

import { Router } from './pages'
import { AuthContext, AuthProvider } from './context/authContext'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <Router />
    </AuthProvider>
  </React.StrictMode>,
)
