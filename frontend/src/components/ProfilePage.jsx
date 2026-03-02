import React from 'react'
import { useAuth } from '../context/AuthContext'
import './ProfilePage.css'

function ProfilePage({ onClose, onOpenAdminPanel }) {
  const { user, isAdmin } = useAuth()

  const initials = user?.name
    ? user.name
        .split(' ')
        .map(part => part[0])
        .join('')
        .toUpperCase()
    : '?'

  return (
    <div className="profile-overlay">
      <div className="profile-shell">
        <header className="profile-header">
          <h2>Profil</h2>
          <button className="profile-close" onClick={onClose}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </header>

        <div className="profile-content">
          {!user ? (
            <div className="profile-empty">
              <h3>Profilga kirish uchun avtorizatsiya qiling</h3>
              <p>Yuqaridagi \"Kirish\" tugmasi orqali ro'yxatdan o'ting yoki tizimga kiring.</p>
            </div>
          ) : (
            <>
              <section className="profile-hero">
                <div className="profile-avatar">{initials}</div>
                <div className="profile-main-info">
                  <h3>{user.name}</h3>
                  <p className="profile-email">{user.email}</p>
                  {user.phone && <p className="profile-phone">{user.phone}</p>}
                  {isAdmin ? (
                    <span className="profile-role-badge">Admin</span>
                  ) : (
                    <span className="profile-role-badge profile-role-user">Foydalanuvchi</span>
                  )}
                </div>
              </section>

              <section className="profile-section">
                <h4>Hisob ma'lumotlari</h4>
                <div className="profile-row">
                  <span className="label">Ism</span>
                  <span className="value">{user.name}</span>
                </div>
                <div className="profile-row">
                  <span className="label">Email</span>
                  <span className="value">{user.email}</span>
                </div>
                {user.phone && (
                  <div className="profile-row">
                    <span className="label">Telefon</span>
                    <span className="value">{user.phone}</span>
                  </div>
                )}
              </section>

              {isAdmin ? (
                <section className="profile-section">
                  <h4>Admin sozlamalari</h4>
                  <p className="profile-section-desc">
                    Lokatsiyalarni, foydalanuvchilarni va e'lonlarni boshqarish uchun admin panelni oching.
                  </p>
                  <button
                    className="profile-primary-btn"
                    onClick={() => {
                      onOpenAdminPanel?.()
                      onClose()
                    }}
                  >
                    <span className="material-symbols-outlined">admin_panel_settings</span>
                    Admin panelni ochish
                  </button>
                </section>
              ) : (
                <section className="profile-section">
                  <h4>Mening faoliyatim</h4>
                  <ul className="profile-list">
                    <li>Yaqinda ko'rilgan restoranlar va do'konlar</li>
                    <li>Saqlangan e'lonlar (coming soon)</li>
                    <li>Buyurtmalar tarixi (coming soon)</li>
                  </ul>
                </section>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProfilePage


