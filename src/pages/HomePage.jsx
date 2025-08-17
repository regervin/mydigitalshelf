import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import AuthModal from '../components/AuthModal'
import { 
  Shield, 
  Zap, 
  Globe, 
  BarChart3, 
  Users, 
  Download 
} from 'lucide-react'

const HomePage = () => {
  const { user } = useAuth()
  const [authModal, setAuthModal] = useState({ isOpen: false, mode: 'signin' })

  const features = [
    {
      icon: Download,
      title: 'Digital Products',
      description: 'Sell e-books, courses, software, templates, and any other digital products with secure delivery.'
    },
    {
      icon: Users,
      title: 'Membership Sites',
      description: 'Create and manage membership sites with recurring payments and protected content access.'
    },
    {
      icon: Zap,
      title: 'Automated Delivery',
      description: 'Automatically deliver products to customers after purchase with secure download links.'
    },
    {
      icon: Shield,
      title: 'License Protection',
      description: 'Protect your digital products with license keys and download limits to prevent unauthorized sharing.'
    },
    {
      icon: BarChart3,
      title: 'Sales Analytics',
      description: 'Track your sales, revenue, and customer behavior with detailed analytics and reports.'
    },
    {
      icon: Globe,
      title: 'Global Payments',
      description: 'Accept payments from customers worldwide with multiple payment gateway integrations.'
    }
  ]

  const steps = [
    {
      number: '1',
      title: 'Create Account',
      description: 'Sign up and set up your seller profile'
    },
    {
      number: '2',
      title: 'Upload Products',
      description: 'Add your digital products and set prices'
    },
    {
      number: '3',
      title: 'Share Your Store',
      description: 'Promote your products with a custom storefront'
    },
    {
      number: '4',
      title: 'Get Paid',
      description: 'Receive payments directly to your account'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            MyDigitalShelf
          </h1>
          <p className="hero-subtitle">
            Create, sell, and deliver digital products with ease. Manage your digital inventory, process payments, and automate delivery all in one place.
          </p>
          
          <div className="hero-buttons">
            {user ? (
              <Link to="/dashboard" className="btn-primary">
                Go to Dashboard
              </Link>
            ) : (
              <>
                <button 
                  onClick={() => setAuthModal({ isOpen: true, mode: 'signup' })}
                  className="btn-primary"
                >
                  Get Started
                </button>
                <button 
                  onClick={() => setAuthModal({ isOpen: true, mode: 'signin' })}
                  className="btn-secondary"
                >
                  Sign In
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-lighter">
        <div className="feature-grid">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className="feature-card">
                <div className="feature-icon">
                  <Icon size={40} />
                </div>
                <h3 className="feature-title">
                  {feature.title}
                </h3>
                <p className="feature-description">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section-padding">
        <div className="text-center mb-16">
          <h2 className="section-title">
            How It Works
          </h2>
          <p className="section-subtitle">
            Our platform makes selling digital products simple and straightforward.
          </p>
        </div>

        <div className="steps-grid">
          {steps.map((step, index) => (
            <div key={index} className="step-card">
              <div className="step-number">
                {step.number}
              </div>
              <h3 className="step-title">
                {step.title}
              </h3>
              <p className="step-description">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-light">
        <div className="text-center">
          <h2 className="section-title">
            Ready to start selling?
          </h2>
          <p className="section-subtitle">
            Join thousands of creators who are successfully selling digital products online.
          </p>
          
          {!user && (
            <button 
              onClick={() => setAuthModal({ isOpen: true, mode: 'signup' })}
              className="btn-primary"
              style={{ fontSize: '18px', padding: '20px 40px' }}
            >
              Create Your Account
            </button>
          )}
        </div>
      </section>

      <AuthModal
        isOpen={authModal.isOpen}
        onClose={() => setAuthModal({ isOpen: false, mode: 'signin' })}
        mode={authModal.mode}
      />
    </div>
  )
}

export default HomePage
