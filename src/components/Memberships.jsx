import React from 'react'
import { Plus, UserCheck, Users, DollarSign } from 'lucide-react'

const Memberships = () => {
  const memberships = [
    {
      id: 1,
      name: 'Premium Access',
      price: '$29/month',
      members: 45,
      revenue: '$1,305'
    },
    {
      id: 2,
      name: 'VIP Community',
      price: '$99/month',
      members: 23,
      revenue: '$2,277'
    },
    {
      id: 3,
      name: 'Basic Plan',
      price: '$9/month',
      members: 156,
      revenue: '$1,404'
    }
  ]

  return (
    <div className="memberships-page">
      <div className="page-header">
        <h1 className="page-title">Memberships</h1>
        <button className="action-button primary">
          <Plus size={16} />
          Create Membership
        </button>
      </div>

      <div className="memberships-grid">
        {memberships.map((membership) => (
          <div key={membership.id} className="membership-card">
            <div className="membership-header">
              <div className="membership-icon">
                <UserCheck size={24} />
              </div>
            </div>
            
            <h3 className="membership-name">{membership.name}</h3>
            <p className="membership-price">{membership.price}</p>
            
            <div className="membership-stats">
              <div className="stat">
                <Users size={16} />
                <span>{membership.members} members</span>
              </div>
              <div className="stat">
                <DollarSign size={16} />
                <span>{membership.revenue}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Memberships
