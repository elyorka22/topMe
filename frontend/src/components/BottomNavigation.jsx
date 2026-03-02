import React from 'react'
import './BottomNavigation.css'

// Категории карты (фильтры)
const categories = [
  { id: 'all', name: 'Hammasi', icon: 'location_on' },
  { id: 'restaurants', name: 'Restoranlar', icon: 'chef_hat' },
  { id: 'shops', name: 'Do\'konlar', icon: 'store' },
  { id: 'ads', name: 'E\'lonlar', icon: 'campaign' },
]

function BottomNavigation({ selectedCategory, onCategoryChange, onOpenFeed, onOpenProfile }) {
  return (
    <nav className="bottom-navigation">
      <div className="bottom-navigation-inner">
        {categories.map(category => (
          <button
            key={category.id}
            className={`bottom-nav-button ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => onCategoryChange(category.id)}
            aria-label={category.name}
            title={category.name}
          >
            <span className="material-symbols-outlined bottom-nav-icon">{category.icon}</span>
          </button>
        ))}
        {/* Дополнительные иконки: лента va profil */}
        <button
          className="bottom-nav-button"
          aria-label="Lenta"
          title="Lenta"
          onClick={onOpenFeed}
        >
          <span className="material-symbols-outlined bottom-nav-icon">rss_feed</span>
        </button>
        <button
          className="bottom-nav-button"
          aria-label="Profil"
          title="Profil"
          onClick={onOpenProfile}
        >
          <span className="material-symbols-outlined bottom-nav-icon">person</span>
        </button>
      </div>
    </nav>
  )
}

export default BottomNavigation

