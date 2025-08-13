import React from 'react'
import { Plus, Package, Users, UserCheck, DollarSign } from 'lucide-react'
import './DashboardContent.css'

const DashboardContent = () => {
  const stats = [
    { label: 'Total Products', value: '0', icon: <Package size={24} /> },
    { label: 'Total Customers', value: '0', icon: <Users size={24} /> },
    { label: 'Active Memberships', value: '0', icon: <UserCheck size={24} /> },
    { label: 'Total Revenue', value: '$0', icon: <DollarSign size={24} /> },
  ]

  return (
    <div className="dashboard-content">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Dashboard</h1>
        <div className="dashboard-actions">
          <button className="action-button primary">
            <Plus size={16} />
            Add Product
          </button>
          <button className="action-button secondary">
            <UserCheck size={16} />
            Create Membership
          </button>
        </div>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-content">
              <h3 className="stat-value">{stat.value}</h3>
              <p className="stat-label">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-grid">
        <div className="revenue-section">
          <h2 className="section-title">Revenue</h2>
          <div className="empty-state">
            <p>No revenue data available yet. Start selling products to see your revenue statistics.</p>
          </div>
        </div>

        <div className="recent-sales-section">
          <h2 className="section-title">Recent Sales</h2>
          <div className="empty-state">
            <p>No sales yet. Your recent sales will appear here once you start making sales.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardContent
