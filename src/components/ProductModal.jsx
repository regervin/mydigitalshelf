import React, { useState } from 'react'
import { useData } from '../contexts/DataContext'
import { X, Upload } from 'lucide-react'

const ProductModal = ({ isOpen, onClose, product = null }) => {
  const { addProduct, updateProduct } = useData()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price || '',
    discount: product?.discount || '',
    category: product?.category || 'ebook',
    file_url: product?.file_url || '',
    download_limit: product?.download_limit || 5,
    license_key: product?.license_key || ''
  })

  if (!isOpen) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        discount: formData.discount ? parseFloat(formData.discount) : null,
        download_limit: parseInt(formData.download_limit)
      }

      if (product) {
        const { error } = await updateProduct(product.id, productData)
        if (error) throw error
      } else {
        const { error } = await addProduct(productData)
        if (error) throw error
      }
      
      onClose()
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-primary">
            {product ? 'Edit Product' : 'Add New Product'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Product Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="form-textarea"
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="form-group">
              <label className="form-label">Price ($)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="form-input"
                step="0.01"
                min="0"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Discount ($)</label>
              <input
                type="number"
                name="discount"
                value={formData.discount}
                onChange={handleChange}
                className="form-input"
                step="0.01"
                min="0"
                placeholder="Optional discount amount"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="form-input"
              required
            >
              <option value="ebook">E-book</option>
              <option value="course">Course</option>
              <option value="software">Software</option>
              <option value="template">Template</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">File Upload</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 mb-2">Click to upload or drag and drop</p>
              <p className="text-sm text-gray-500">PDF, ZIP, or other digital files</p>
              <input
                type="file"
                className="hidden"
                accept=".pdf,.zip,.doc,.docx,.mp4,.mp3"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Download Limit</label>
            <input
              type="number"
              name="download_limit"
              value={formData.download_limit}
              onChange={handleChange}
              className="form-input"
              min="1"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">License Key (Optional)</label>
            <input
              type="text"
              name="license_key"
              value={formData.license_key}
              onChange={handleChange}
              className="form-input"
              placeholder="Auto-generated if left empty"
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm mb-4">{error}</div>
          )}

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex-1"
            >
              {loading ? 'Saving...' : (product ? 'Update Product' : 'Add Product')}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProductModal
