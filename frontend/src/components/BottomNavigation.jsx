import React from 'react'
import './BottomNavigation.css'

const categories = [
  { id: 'all', name: 'Hammasi', icon: 'location_on' },
  { id: 'restaurants', name: 'Restoranlar', icon: 'chef_hat' },
  { id: 'shops', name: 'Do\'konlar', icon: 'store' },
  { id: 'ads', name: 'E\'lonlar', icon: 'campaign' },
]

function BottomNavigation({ selectedCategory, onCategoryChange }) {
  return (
    <nav className="bottom-navigation">
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
    </nav>
  )
}

export default BottomNavigation

