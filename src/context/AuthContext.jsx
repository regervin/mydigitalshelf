import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for stored user data on app load
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error('Error parsing stored user data:', error)
        localStorage.removeItem('user')
      }
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      // Simulate API call
      if (email && password) {
        const userData = {
          id: 1,
          name: 'John Doe',
          email: email,
          avatar: null
        }
        setUser(userData)
        localStorage.setItem('user', JSON.stringify(userData))
        return { success: true }
      }
      return { success: false, error: 'Invalid credentials' }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, error: 'Login failed' }
    }
  }

  const register = async (name, email, password) => {
    try {
      // Simulate API call
      if (name && email && password) {
        const userData = {
          id: 1,
          name: name,
          email: email,
          avatar: null
        }
        setUser(userData)
        localStorage.setItem('user', JSON.stringify(userData))
        return { success: true }
      }
      return { success: false, error: 'Registration failed' }
    } catch (error) {
      console.error('Registration error:', error)
      return { success: false, error: 'Registration failed' }
    }
  }

  const logout = () => {
    try {
      setUser(null)
      localStorage.removeItem('user')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const value = {
    user,
    login,
    register,
    logout,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
