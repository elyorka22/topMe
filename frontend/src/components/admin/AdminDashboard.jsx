import { useMemo } from 'react'
import { locations as defaultLocations } from '../../data/locations'
import './AdminDashboard.css'

function AdminDashboard() {
  const stats = useMemo(() => {
    const savedLocations = JSON.parse(localStorage.getItem('locations') || JSON.stringify(defaultLocations))
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    
    const locations = savedLocations || defaultLocations
    
    const restaurants = locations.filter(loc => loc.category === 'restaurants')
    const shops = locations.filter(loc => loc.category === 'shops')
    const ads = locations.filter(loc => loc.category === 'ads')
    
    const totalUsers = users.length
    const adminUsers = users.filter(u => u.isAdmin).length
    const regularUsers = totalUsers - adminUsers
    
    // Статистика по объявлениям
    const adsWithImages = ads.filter(ad => ad.images && ad.images.length > 0).length
    const adsWithPrice = ads.filter(ad => ad.price).length
    
    // Последние активности (созданные объявления)
    const recentAds = ads
      .filter(ad => ad.createdAt)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5)

    return {
      totalLocations: locations.length,
      restaurants: restaurants.length,
      shops: shops.length,
      ads: ads.length,
      totalUsers,
      adminUsers,
      regularUsers,
      adsWithImages,
      adsWithPrice,
      recentAds
    }
  }, [])

  return (
    <div className="admin-dashboard">
      <h2>Statistika</h2>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#e74c3c' }}>
            <span className="material-symbols-outlined">restaurant</span>
          </div>
          <div className="stat-content">
            <h3>{stats.restaurants}</h3>
            <p>Restoranlar</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#3498db' }}>
            <span className="material-symbols-outlined">store</span>
          </div>
          <div className="stat-content">
            <h3>{stats.shops}</h3>
            <p>Do'konlar</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#2ecc71' }}>
            <span className="material-symbols-outlined">campaign</span>
          </div>
          <div className="stat-content">
            <h3>{stats.ads}</h3>
            <p>E'lonlar</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#9b59b6' }}>
            <span className="material-symbols-outlined">people</span>
          </div>
          <div className="stat-content">
            <h3>{stats.totalUsers}</h3>
            <p>Foydalanuvchilar</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#f39c12' }}>
            <span className="material-symbols-outlined">admin_panel_settings</span>
          </div>
          <div className="stat-content">
            <h3>{stats.adminUsers}</h3>
            <p>Adminlar</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#1abc9c' }}>
            <span className="material-symbols-outlined">person</span>
          </div>
          <div className="stat-content">
            <h3>{stats.regularUsers}</h3>
            <p>Oddiy foydalanuvchilar</p>
          </div>
        </div>
      </div>

      <div className="dashboard-sections">
        <div className="dashboard-section">
          <h3>E'lonlar statistikasi</h3>
          <div className="info-cards">
            <div className="info-card">
              <span className="material-symbols-outlined">photo_library</span>
              <div>
                <strong>{stats.adsWithImages}</strong>
                <p>Rasmlar bilan</p>
              </div>
            </div>
            <div className="info-card">
              <span className="material-symbols-outlined">attach_money</span>
              <div>
                <strong>{stats.adsWithPrice}</strong>
                <p>Narx bilan</p>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-section">
          <h3>So'ngi e'lonlar</h3>
          <div className="recent-ads">
            {stats.recentAds.length > 0 ? (
              stats.recentAds.map((ad) => (
                <div key={ad.id} className="recent-ad-item">
                  <div className="recent-ad-info">
                    <h4>{ad.name}</h4>
                    <p className="recent-ad-date">
                      {new Date(ad.createdAt).toLocaleString('uz-UZ', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  <div className="recent-ad-badge">
                    <span className="material-symbols-outlined">campaign</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-data">Hozircha e'lonlar yo'q</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
