import React from 'react'
import { HardDrive, Upload } from 'lucide-react'
import './shared.css'

const Storage = () => {
  return (
    <div className="storage-page">
      <div className="page-header">
        <h1 className="page-title">Storage</h1>
        <button className="action-button primary">
          <Upload size={16} />
          Upload File
        </button>
      </div>

      <div className="storage-stats">
        <div className="storage-card">
          <HardDrive size={32} />
          <div>
            <h3>Storage Used</h3>
            <p>0 MB / 10 GB</p>
            <div className="progress-bar">
              <div className="progress" style={{ width: '0%' }}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="empty-state-container">
        <div className="empty-state-icon">
          <HardDrive size={64} />
        </div>
        <h3>No files uploaded yet</h3>
        <p>Upload your digital products and files to get started.</p>
        <button className="action-button primary">
          <Upload size={16} />
          Upload Your First File
        </button>
      </div>
    </div>
  )
}

export default Storage
