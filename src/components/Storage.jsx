import React from 'react'
import { HardDrive, Upload, Folder, File } from 'lucide-react'

const Storage = () => {
  const files = [
    { name: 'marketing-course.zip', size: '245 MB', type: 'Archive' },
    { name: 'ebook-bundle.pdf', size: '12 MB', type: 'PDF' },
    { name: 'templates.zip', size: '89 MB', type: 'Archive' },
    { name: 'photos.zip', size: '156 MB', type: 'Archive' }
  ]

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
            <p>502 MB / 10 GB</p>
            <div className="progress-bar">
              <div className="progress" style={{ width: '5%' }}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="files-list">
        <h3>Files</h3>
        {files.map((file, index) => (
          <div key={index} className="file-item">
            <div className="file-info">
              <File size={20} />
              <div>
                <h4>{file.name}</h4>
                <p>{file.type} • {file.size}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Storage
