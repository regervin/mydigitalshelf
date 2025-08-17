import React, { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'
import { supabase } from '../lib/supabase'

const DataContext = createContext({})

export const useData = () => {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error('useData must be used within a DataProvider')
  }
  return context
}

export const DataProvider = ({ children }) => {
  const { user } = useAuth()
  const [products, setProducts] = useState([])
  const [customers, setCustomers] = useState([])
  const [memberships, setMemberships] = useState([])
  const [sales, setSales] = useState([])
  const [loading, setLoading] = useState(false)

  // Products
  const addProduct = async (productData) => {
    if (!user) return { error: 'Not authenticated' }
    
    const { data, error } = await supabase
      .from('products')
      .insert([{ ...productData, user_id: user.id }])
      .select()
    
    if (!error && data) {
      setProducts(prev => [...prev, ...data])
    }
    
    return { data, error }
  }

  const updateProduct = async (id, updates) => {
    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', id)
      .eq('user_id', user.id)
      .select()
    
    if (!error && data) {
      setProducts(prev => prev.map(p => p.id === id ? data[0] : p))
    }
    
    return { data, error }
  }

  const deleteProduct = async (id) => {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id)
    
    if (!error) {
      setProducts(prev => prev.filter(p => p.id !== id))
    }
    
    return { error }
  }

  // Customers
  const addCustomer = async (customerData) => {
    if (!user) return { error: 'Not authenticated' }
    
    const { data, error } = await supabase
      .from('customers')
      .insert([{ ...customerData, user_id: user.id }])
      .select()
    
    if (!error && data) {
      setCustomers(prev => [...prev, ...data])
    }
    
    return { data, error }
  }

  const updateCustomer = async (id, updates) => {
    const { data, error } = await supabase
      .from('customers')
      .update(updates)
      .eq('id', id)
      .eq('user_id', user.id)
      .select()
    
    if (!error && data) {
      setCustomers(prev => prev.map(c => c.id === id ? data[0] : c))
    }
    
    return { data, error }
  }

  const deleteCustomer = async (id) => {
    const { error } = await supabase
      .from('customers')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id)
    
    if (!error) {
      setCustomers(prev => prev.filter(c => c.id !== id))
    }
    
    return { error }
  }

  // Memberships
  const addMembership = async (membershipData) => {
    if (!user) return { error: 'Not authenticated' }
    
    const { data, error } = await supabase
      .from('memberships')
      .insert([{ ...membershipData, user_id: user.id }])
      .select()
    
    if (!error && data) {
      setMemberships(prev => [...prev, ...data])
    }
    
    return { data, error }
  }

  const updateMembership = async (id, updates) => {
    const { data, error } = await supabase
      .from('memberships')
      .update(updates)
      .eq('id', id)
      .eq('user_id', user.id)
      .select()
    
    if (!error && data) {
      setMemberships(prev => prev.map(m => m.id === id ? data[0] : m))
    }
    
    return { data, error }
  }

  const deleteMembership = async (id) => {
    const { error } = await supabase
      .from('memberships')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id)
    
    if (!error) {
      setMemberships(prev => prev.filter(m => m.id !== id))
    }
    
    return { error }
  }

  // Sales
  const addSale = async (saleData) => {
    if (!user) return { error: 'Not authenticated' }
    
    const { data, error } = await supabase
      .from('sales')
      .insert([{ ...saleData, user_id: user.id }])
      .select()
    
    if (!error && data) {
      setSales(prev => [...prev, ...data])
    }
    
    return { data, error }
  }

  // Load data when user changes
  useEffect(() => {
    if (user) {
      loadUserData()
    } else {
      // Clear data when user logs out
      setProducts([])
      setCustomers([])
      setMemberships([])
      setSales([])
    }
  }, [user])

  const loadUserData = async () => {
    if (!user) return
    
    setLoading(true)
    
    try {
      // Load products
      const { data: productsData } = await supabase
        .from('products')
        .select('*')
        .eq('user_id', user.id)
      
      if (productsData) setProducts(productsData)

      // Load customers
      const { data: customersData } = await supabase
        .from('customers')
        .select('*')
        .eq('user_id', user.id)
      
      if (customersData) setCustomers(customersData)

      // Load memberships
      const { data: membershipsData } = await supabase
        .from('memberships')
        .select('*')
        .eq('user_id', user.id)
      
      if (membershipsData) setMemberships(membershipsData)

      // Load sales
      const { data: salesData } = await supabase
        .from('sales')
        .select('*')
        .eq('user_id', user.id)
      
      if (salesData) setSales(salesData)
    } catch (error) {
      console.error('Error loading user data:', error)
    } finally {
      setLoading(false)
    }
  }

  const value = {
    products,
    customers,
    memberships,
    sales,
    loading,
    addProduct,
    updateProduct,
    deleteProduct,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    addMembership,
    updateMembership,
    deleteMembership,
    addSale,
    loadUserData
  }

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  )
}
