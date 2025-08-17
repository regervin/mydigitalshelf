import React, { useState } from 'react'
import Layout from '../components/Layout'
import { useData } from '../contexts/DataContext'
import { Plus, TrendingUp, Users, Package, Crown, DollarSign, BarChart3, ShoppingCart } from 'lucide-react'
import ProductModal from '../components/ProductModal'
import MembershipModal from '../components/MembershipModal'
import CustomerModal from '../components/CustomerModal'

const Dashboard = () => {
  const { products, customers, memberships, sales } = useData()
  const [showProductModal, setShowProductModal] = useState(false)
  const [showMembershipModal, setShowMembershipModal] = useState(false)
  const [showCustomerModal, setShowCustomerModal] = useState(false)

  // Calculate stats
  const totalRevenue = sales.reduce((sum, sale) => sum + (sale.amount || 0), 0)
  const todayRevenue = sales
    .filter(sale => {
      const today = new Date().toDateString()
      const saleDate = new Date(sale.created_at).toDateString()
      return today === saleDate
    })
    .reduce((sum, sale) => sum + (sale.amount || 0), 0)

  const thisWeekRevenue = sales
    .filter(sale => {
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      return new Date(sale.created_at) >= weekAgo
    })
    .reduce((sum, sale) => sum + (sale.amount || 0), 0)

  const thisMonthRevenue = sales
    .filter(sale => {
      const monthAgo = new Date()
      monthAgo.setMonth(monthAgo.getMonth() - 1)
      return new Date(sale.created_at) >= monthAgo
    })
    .reduce((sum, sale) => sum + (sale.amount || 0), 0)

  const recentSales = sales
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 5)

  const quickActions = [
    {
      title: 'Add New Product',
      description: 'Upload and configure a new digital product',
      icon: Package,
      action: () => setShowProductModal(true)
    },
    {
      title: 'Add New Customer',
      description: 'Add a customer to your database',
      icon: Users,
      action: () => setShowCustomerModal(true)
    },
    {
      title: 'Create Membership',
      description: 'Set up a new membership tier',
      icon: Crown,
      action: () => setShowMembershipModal(true)
    },
    {
      title: 'View Analytics',
      description: 'Check your sales performance',
      icon: BarChart3,
      action: () => window.location.href = '/analytics'
    }
  ]

  const tips = [
    {
      title: 'How to create your first digital product',
      description: 'Learn the basics of setting up and pricing your digital products for maximum sales.'
    },
    {
      title: 'Growing your customer base',
      description: 'Discover proven strategies to attract and retain more customers for your digital products.'
    },
    {
      title: 'Setting up recurring memberships',
      description: 'Build sustainable revenue with membership sites and subscription-based products.'
    }
  ]

  return (
    <Layout>
      <div className="space-y-8">
        {/* Dashboard Header */}
        <div className="dashboard-header">
          <h1 className="dashboard-title">Welcome Back!</h1>
          <p className="dashboard-subtitle">Here's what's happening with your digital store today.</p>
        </div>

        {/* Action Buttons */}
        <div className="dashboard-actions">
          <button 
            onClick={() => setShowProductModal(true)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus size={20} />
            Add Product
          </button>
          <button 
            onClick={() => setShowCustomerModal(true)}
            className="btn-primary flex items-center gap-2"
          >
            <Users size={20} />
            Add Customer
          </button>
          <button 
            onClick={() => setShowMembershipModal(true)}
            className="btn-primary flex items-center gap-2"
          >
            <Crown size={20} />
            Create Membership
          </button>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid-modern">
          <div className="stat-card-modern">
            <div className="stat-icon">
              <Package size={28} />
            </div>
            <div className="stat-value-modern">{products.length}</div>
            <div className="stat-label-modern">Total Products</div>
          </div>
          <div className="stat-card-modern">
            <div className="stat-icon">
              <Users size={28} />
            </div>
            <div className="stat-value-modern">{customers.length}</div>
            <div className="stat-label-modern">Total Customers</div>
          </div>
          <div className="stat-card-modern">
            <div className="stat-icon">
              <Crown size={28} />
            </div>
            <div className="stat-value-modern">{memberships.length}</div>
            <div className="stat-label-modern">Active Memberships</div>
          </div>
          <div className="stat-card-modern">
            <div className="stat-icon">
              <DollarSign size={28} />
            </div>
            <div className="stat-value-modern">${totalRevenue.toFixed(2)}</div>
            <div className="stat-label-modern">Total Revenue</div>
          </div>
        </div>

        {/* Revenue Overview */}
        <div className="dashboard-card">
          <div className="card-header">
            <div className="card-icon">
              <TrendingUp size={20} />
            </div>
            <h2 className="card-title">Revenue Overview</h2>
          </div>
          <div className="revenue-grid">
            <div className="revenue-item">
              <div className="revenue-value">${todayRevenue.toFixed(2)}</div>
              <div className="revenue-label">Today</div>
            </div>
            <div className="revenue-item">
              <div className="revenue-value">${thisWeekRevenue.toFixed(2)}</div>
              <div className="revenue-label">This Week</div>
            </div>
            <div className="revenue-item">
              <div className="revenue-value">${thisMonthRevenue.toFixed(2)}</div>
              <div className="revenue-label">This Month</div>
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="dashboard-grid">
          {/* Recent Sales */}
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-icon">
                <ShoppingCart size={20} />
              </div>
              <h2 className="card-title">Recent Sales</h2>
            </div>
            {recentSales.length > 0 ? (
              <div className="sales-list">
                {recentSales.map((sale) => (
                  <div key={sale.id} className="sale-item">
                    <div className="sale-info">
                      <div className="sale-product">{sale.product_name || 'Product'}</div>
                      <div className="sale-customer">{sale.customer_email}</div>
                    </div>
                    <div className="sale-details">
                      <div className="sale-amount">${sale.amount?.toFixed(2)}</div>
                      <div className="sale-date">
                        {new Date(sale.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>No sales yet. Start by adding your first product!</p>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-icon">
                <Package size={20} />
              </div>
              <h2 className="card-title">Quick Actions</h2>
            </div>
            <div className="quick-actions-grid">
              {quickActions.map((action, index) => {
                const Icon = action.icon
                return (
                  <div
                    key={index}
                    onClick={action.action}
                    className="action-item"
                  >
                    <div className="action-icon">
                      <Icon size={20} />
                    </div>
                    <div className="action-content">
                      <div className="action-title">{action.title}</div>
                      <div className="action-description">{action.description}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Tips & Resources */}
        <div className="dashboard-card">
          <div className="card-header">
            <div className="card-icon">
              <BarChart3 size={20} />
            </div>
            <h2 className="card-title">Tips & Resources</h2>
          </div>
          <div className="tips-grid">
            {tips.map((tip, index) => (
              <div key={index} className="tip-card">
                <h3 className="tip-title">{tip.title}</h3>
                <p className="tip-description">{tip.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ProductModal
        isOpen={showProductModal}
        onClose={() => setShowProductModal(false)}
      />

      <CustomerModal
        isOpen={showCustomerModal}
        onClose={() => setShowCustomerModal(false)}
      />

      <MembershipModal
        isOpen={showMembershipModal}
        onClose={() => setShowMembershipModal(false)}
      />
    </Layout>
  )
}

export default Dashboard
