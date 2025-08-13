import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { 
  BookOpen, 
  Users, 
  Download, 
  Shield, 
  BarChart3, 
  CreditCard,
  UserPlus,
  Upload,
  Share2,
  DollarSign
} from 'lucide-react'
import TopNavigation from './TopNavigation'
import './Homepage.css'

const Homepage = () => {
  const navigate = useNavigate()
  const { user } = useAuth()

  const features = [
    {
      icon: <BookOpen size={48} />,
      title: "Digital Products",
      description: "Sell e-books, courses, software, templates, and any other digital products with secure delivery."
    },
    {
      icon: <Users size={48} />,
      title: "Membership Sites",
      description: "Create and manage membership sites with recurring payments and protected content access."
    },
    {
      icon: <Download size={48} />,
      title: "Automated Delivery",
      description: "Automatically deliver products to customers after purchase with secure download links."
    },
    {
      icon: <Shield size={48} />,
      title: "License Protection",
      description: "Protect your digital products with license keys and download limits to prevent unauthorized sharing."
    },
    {
      icon: <BarChart3 size={48} />,
      title: "Sales Analytics",
      description: "Track your sales, revenue, and customer behavior with detailed analytics and reports."
    },
    {
      icon: <CreditCard size={48} />,
      title: "Global Payments",
      description: "Accept payments from customers worldwide with multiple payment gateway integrations."
    }
  ]

  const steps = [
    {
      number: "1",
      icon: <UserPlus size={32} />,
      title: "Create Account",
      description: "Sign up and set up your seller profile"
    },
    {
      number: "2",
      icon: <Upload size={32} />,
      title: "Upload Products",
      description: "Add your digital products and set prices"
    },
    {
      number: "3",
      icon: <Share2 size={32} />,
      title: "Share Your Store",
      description: "Promote your products with a custom storefront"
    },
    {
      number: "4",
      icon: <DollarSign size={32} />,
      title: "Get Paid",
      description: "Receive payments directly to your account"
    }
  ]

  const handleDashboardClick = () => {
    if (user) {
      navigate('/dashboard')
    } else {
      navigate('/login')
    }
  }

  return (
    <div className="homepage">
      <TopNavigation />
      
      <header className="hero">
        <div className="container">
          <h1 className="hero-title">MyDigitalShelf</h1>
          <p className="hero-subtitle">
            Create, sell, and deliver digital products with ease. Manage your digital inventory, 
            process payments, and automate delivery all in one place.
          </p>
          <button 
            className="cta-button"
            onClick={handleDashboardClick}
          >
            {user ? 'Go To Dashboard' : 'Get Started'}
          </button>
        </div>
      </header>

      <section className="features">
        <div className="container">
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">
                  {feature.icon}
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">Our platform makes selling digital products simple and straightforward.</p>
          
          <div className="steps-grid">
            {steps.map((step, index) => (
              <div key={index} className="step-card">
                <div className="step-number">{step.number}</div>
                <div className="step-icon">{step.icon}</div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="final-cta">
        <div className="container">
          <h2 className="cta-title">Ready to start selling?</h2>
          <p className="cta-subtitle">
            Join thousands of creators who are successfully selling digital products online.
          </p>
          <button 
            className="cta-button"
            onClick={handleDashboardClick}
          >
            {user ? 'Go to Dashboard' : 'Get Started Now'}
          </button>
        </div>
      </section>
    </div>
  )
}

export default Homepage
