import React, { useState } from 'react'
import Layout from '../components/Layout'
import MembershipModal from '../components/MembershipModal'
import { useData } from '../contexts/DataContext'
import { Plus, Crown, Users, DollarSign } from 'lucide-react'

const Memberships = () => {
  const { memberships } = useData()
  const [showModal, setShowModal] = useState(false)

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-primary">Memberships</h1>
          <button 
            onClick={() => setShowModal(true)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus size={20} />
            Create Membership
          </button>
        </div>

        {memberships.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {memberships.map((membership) => (
              <div key={membership.id} className="card">
                <div className="flex items-center gap-3 mb-4">
                  <Crown size={24} className="text-primary" />
                  <h3 className="text-xl font-bold text-primary">{membership.name}</h3>
                </div>
                
                <p className="text-gray-600 mb-4">{membership.description}</p>
                
                <div className="mb-4">
                  <div className="text-2xl font-bold text-primary">
                    ${membership.price?.toFixed(2)}
                    <span className="text-sm font-normal text-gray-600">
                      /{membership.billing_cycle}
                    </span>
                  </div>
                </div>

                {membership.features && (
                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Features:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {(Array.isArray(membership.features) ? membership.features : []).map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <span className="w-1 h-1 bg-primary rounded-full"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span>Members: {membership.member_count || 0}</span>
                  {membership.max_members && (
                    <span>Max: {membership.max_members}</span>
                  )}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    membership.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {membership.status || 'active'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card text-center py-12">
            <Crown size={64} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-600 mb-2">No memberships yet</h3>
            <p className="text-gray-500 mb-6">Create membership tiers to generate recurring revenue</p>
            <button 
              onClick={() => setShowModal(true)}
              className="btn-primary"
            >
              Create Your First Membership
            </button>
          </div>
        )}

        {/* Membership Stats */}
        {memberships.length > 0 && (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="card text-center">
              <Crown size={32} className="mx-auto text-primary mb-2" />
              <div className="text-2xl font-bold text-primary">{memberships.length}</div>
              <div className="text-gray-600">Total Memberships</div>
            </div>
            
            <div className="card text-center">
              <Users size={32} className="mx-auto text-primary mb-2" />
              <div className="text-2xl font-bold text-primary">
                {memberships.reduce((sum, m) => sum + (m.member_count || 0), 0)}
              </div>
              <div className="text-gray-600">Total Members</div>
            </div>
            
            <div className="card text-center">
              <DollarSign size={32} className="mx-auto text-primary mb-2" />
              <div className="text-2xl font-bold text-primary">
                ${memberships.reduce((sum, m) => sum + ((m.price || 0) * (m.member_count || 0)), 0).toFixed(2)}
              </div>
              <div className="text-gray-600">Monthly Revenue</div>
            </div>
          </div>
        )}
      </div>

      <MembershipModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </Layout>
  )
}

export default Memberships
