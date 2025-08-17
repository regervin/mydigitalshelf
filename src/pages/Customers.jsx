import React, { useState } from 'react'
import Layout from '../components/Layout'
import CustomerModal from '../components/CustomerModal'
import { useData } from '../contexts/DataContext'
import { Users, Mail, Calendar, DollarSign, Plus, Edit, Trash2, MapPin } from 'lucide-react'

const Customers = () => {
  const { customers, sales, deleteCustomer } = useData()
  const [showModal, setShowModal] = useState(false)
  const [editingCustomer, setEditingCustomer] = useState(null)

  // Calculate customer stats
  const getCustomerStats = (customerId) => {
    const customerSales = sales.filter(sale => sale.customer_id === customerId)
    const totalSpent = customerSales.reduce((sum, sale) => sum + (sale.amount || 0), 0)
    const lastPurchase = customerSales.length > 0 
      ? new Date(Math.max(...customerSales.map(sale => new Date(sale.created_at))))
      : null

    return {
      totalSpent,
      purchaseCount: customerSales.length,
      lastPurchase
    }
  }

  const handleEdit = (customer) => {
    setEditingCustomer(customer)
    setShowModal(true)
  }

  const handleDelete = async (customerId) => {
    if (window.confirm('Are you sure you want to delete this customer? This action cannot be undone.')) {
      await deleteCustomer(customerId)
    }
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingCustomer(null)
  }

  // Helper function to display customer name
  const getCustomerName = (customer) => {
    if (customer.first_name && customer.last_name) {
      return `${customer.first_name} ${customer.last_name}`
    } else if (customer.name) {
      return customer.name
    } else if (customer.first_name) {
      return customer.first_name
    } else if (customer.last_name) {
      return customer.last_name
    }
    return 'Unknown Customer'
  }

  // Helper function to display customer location
  const getCustomerLocation = (customer) => {
    const parts = []
    if (customer.city) parts.push(customer.city)
    if (customer.state) parts.push(customer.state)
    if (parts.length > 0) return parts.join(', ')
    if (customer.country) return customer.country
    return '-'
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-primary">Customers</h1>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600">
              Total: {customers.length} customers
            </div>
            <button 
              onClick={() => setShowModal(true)}
              className="btn-primary flex items-center gap-2"
            >
              <Plus size={20} />
              Add Customer
            </button>
          </div>
        </div>

        {customers.length > 0 ? (
          <div className="card">
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Location</th>
                    <th>Joined</th>
                    <th>Purchases</th>
                    <th>Total Spent</th>
                    <th>Last Purchase</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer) => {
                    const stats = getCustomerStats(customer.id)
                    return (
                      <tr key={customer.id}>
                        <td>
                          <div className="font-medium">
                            {getCustomerName(customer)}
                          </div>
                          {customer.notes && (
                            <div className="text-xs text-gray-500 mt-1 truncate max-w-xs">
                              {customer.notes}
                            </div>
                          )}
                        </td>
                        <td>{customer.email}</td>
                        <td>{customer.phone || '-'}</td>
                        <td>
                          <div className="flex items-center gap-1">
                            <MapPin size={14} className="text-gray-400" />
                            <span className="text-sm">{getCustomerLocation(customer)}</span>
                          </div>
                        </td>
                        <td>
                          {new Date(customer.created_at).toLocaleDateString()}
                        </td>
                        <td>{stats.purchaseCount}</td>
                        <td>${stats.totalSpent.toFixed(2)}</td>
                        <td>
                          {stats.lastPurchase 
                            ? stats.lastPurchase.toLocaleDateString()
                            : 'Never'
                          }
                        </td>
                        <td>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            stats.purchaseCount > 0
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {stats.purchaseCount > 0 ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEdit(customer)}
                              className="text-blue-600 hover:text-blue-800"
                              title="Edit customer"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => handleDelete(customer.id)}
                              className="text-red-600 hover:text-red-800"
                              title="Delete customer"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="card text-center py-12">
            <Users size={64} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-600 mb-2">No customers yet</h3>
            <p className="text-gray-500 mb-6">Add your first customer or they'll appear automatically when they make purchases</p>
            <button 
              onClick={() => setShowModal(true)}
              className="btn-primary"
            >
              Add Your First Customer
            </button>
          </div>
        )}

        {/* Customer Insights */}
        {customers.length > 0 && (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="card text-center">
              <Users size={32} className="mx-auto text-primary mb-2" />
              <div className="text-2xl font-bold text-primary">{customers.length}</div>
              <div className="text-gray-600">Total Customers</div>
            </div>
            
            <div className="card text-center">
              <DollarSign size={32} className="mx-auto text-primary mb-2" />
              <div className="text-2xl font-bold text-primary">
                ${(sales.reduce((sum, sale) => sum + (sale.amount || 0), 0) / Math.max(customers.length, 1)).toFixed(2)}
              </div>
              <div className="text-gray-600">Avg. Customer Value</div>
            </div>
            
            <div className="card text-center">
              <Calendar size={32} className="mx-auto text-primary mb-2" />
              <div className="text-2xl font-bold text-primary">
                {customers.filter(customer => {
                  const monthAgo = new Date()
                  monthAgo.setMonth(monthAgo.getMonth() - 1)
                  return new Date(customer.created_at) >= monthAgo
                }).length}
              </div>
              <div className="text-gray-600">New This Month</div>
            </div>
          </div>
        )}
      </div>

      <CustomerModal
        isOpen={showModal}
        onClose={handleCloseModal}
        customer={editingCustomer}
      />
    </Layout>
  )
}

export default Customers
