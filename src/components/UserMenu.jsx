import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import './UserMenu.css'

function UserMenu({ onShowCreateAd, onShowAdminPanel }) {
  const { user, logout, isAdmin } = useAuth()
  const [showMenu, setShowMenu] = useState(false)

  if (!user) {
    return null
  }

  return (
    <div className="user-menu">
      <button className="user-menu-button" onClick={() => setShowMenu(!showMenu)}>
        <span className="material-symbols-outlined">account_circle</span>
        <span className="user-name">{user.name}</span>
        <span className="material-symbols-outlined">expand_more</span>
      </button>

      {showMenu && (
        <>
          <div className="user-menu-overlay" onClick={() => setShowMenu(false)} />
          <div className="user-menu-dropdown">
            <div className="user-menu-info">
              <div className="user-menu-name">{user.name}</div>
              <div className="user-menu-email">{user.email}</div>
            </div>
            <div className="user-menu-divider" />
            <button className="user-menu-item" onClick={() => {
              onShowCreateAd()
              setShowMenu(false)
            }}>
              <span className="material-symbols-outlined">add</span>
              E'lon yaratish
            </button>
            {isAdmin && (
              <button className="user-menu-item" onClick={() => {
                onShowAdminPanel()
                setShowMenu(false)
              }}>
                <span className="material-symbols-outlined">admin_panel_settings</span>
                Admin Panel
              </button>
            )}
            <button className="user-menu-item" onClick={logout}>
              <span className="material-symbols-outlined">logout</span>
              Chiqish
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default UserMenu
