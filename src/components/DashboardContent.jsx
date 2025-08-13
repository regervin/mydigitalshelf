import React from 'react'
import { Plus, Package, Users, UserCheck, DollarSign, TrendingUp, Calendar, Clock } from 'lucide-react'
import './DashboardContent.css'

const DashboardContent = () => {
  const stats = [
    { label: 'Total Products', value: '24', icon: <Package size={24} /> },
    { label: 'Total Customers', value: '1,247', icon: <Users size={24} /> },
    { label: 'Active Memberships', value: '89', icon: <UserCheck size={24} /> },
    { label: 'Total Revenue', value: '$12,450', icon: <DollarSign size={24} /> },
  ]

  const revenueStats = [
    { period: 'Today', amount: '$245', icon: <Calendar size={16} /> },
    { period: 'This Week', amount: '$1,890', icon: <Calendar size={16} /> },
    { period: 'This Month', amount: '$8,450', icon: <Calendar size={16} /> },
  ]

  const recentSales = [
    { product: 'Digital Marketing Course', customer: 'John Doe', amount: '$99', time: '2 hours ago' },
    { product: 'E-book Bundle', customer: 'Sarah Smith', amount: '$29', time: '4 hours ago' },
    { product: 'Premium Template Pack', customer: 'Mike Johnson', amount: '$49', time: '6 hours ago' },
    { product: 'Photography Course', customer: 'Emma Wilson', amount: '$149', time: '8 hours ago' },
    { product: 'Design Assets', customer: 'Alex Brown', amount: '$19', time: '1 day ago' },
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
          <div className="revenue-cards">
            {revenueStats.map((stat, index) => (
              <div key={index} className="revenue-card">
                <div className="revenue-header">
                  {stat.icon}
                  <span className="revenue-period">{stat.period}</span>
                </div>
                <div className="revenue-amount">{stat.amount}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="recent-sales-section">
          <h2 className="section-title">Recent Sales</h2>
          <div className="sales-list">
            {recentSales.map((sale, index) => (
              <div key={index} className="sale-item">
                <div className="sale-info">
                  <h4 className="sale-product">{sale.product}</h4>
                  <p className="sale-customer">{sale.customer}</p>
                </div>
                <div className="sale-details">
                  <span className="sale-amount">{sale.amount}</span>
                  <span className="sale-time">
                    <Clock size={12} />
                    {sale.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardContent
