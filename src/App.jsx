import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import Homepage from './components/Homepage'
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import Register from './components/Register'

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={
              <AuthProvider>
                <Login />
              </AuthProvider>
            } />
            <Route path="/register" element={
              <AuthProvider>
                <Register />
              </AuthProvider>
            } />
            <Route path="/dashboard" element={
              <AuthProvider>
                <Dashboard />
              </AuthProvider>
            } />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App
