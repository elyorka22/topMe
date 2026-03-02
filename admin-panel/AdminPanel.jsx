import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import AdminDashboard from './AdminDashboard'
import AdminLocations from './AdminLocations'
import AdminUsers from './AdminUsers'
import './AdminPanel.css'

function AdminPanel({ onClose }) {
  const { isAdmin } = useAuth()
  const [activeTab, setActiveTab] = useState('dashboard')

  if (!isAdmin) {
    return (
      <div className="admin-panel-overlay" onClick={onClose}>
        <div className="admin-panel" onClick={(e) => e.stopPropagation()}>
          <div className="admin-access-denied">
            <span className="material-symbols-outlined" style={{ fontSize: '4rem', color: '#e74c3c' }}>
              block
            </span>
            <h2>Kirish rad etildi</h2>
            <p>Sizda admin huquqlari yo'q</p>
            <button onClick={onClose} className="close-admin-btn">
              Yopish
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-panel-overlay" onClick={onClose}>
      <div className="admin-panel" onClick={(e) => e.stopPropagation()}>
        <div className="admin-header">
          <div className="admin-header-content">
            <h1>
              <span className="material-symbols-outlined">admin_panel_settings</span>
              Admin Panel
            </h1>
            <button className="admin-close-btn" onClick={onClose}>
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
        </div>

        <div className="admin-content">
          <div className="admin-sidebar">
            <button
              className={`admin-nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >
              <span className="material-symbols-outlined">dashboard</span>
              Statistika
            </button>
            <button
              className={`admin-nav-item ${activeTab === 'locations' ? 'active' : ''}`}
              onClick={() => setActiveTab('locations')}
            >
              <span className="material-symbols-outlined">location_on</span>
              Lokatsiyalar
            </button>
            <button
              className={`admin-nav-item ${activeTab === 'users' ? 'active' : ''}`}
              onClick={() => setActiveTab('users')}
            >
              <span className="material-symbols-outlined">people</span>
              Foydalanuvchilar
            </button>
          </div>

          <div className="admin-main">
            {activeTab === 'dashboard' && <AdminDashboard />}
            {activeTab === 'locations' && <AdminLocations />}
            {activeTab === 'users' && <AdminUsers />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminPanel
