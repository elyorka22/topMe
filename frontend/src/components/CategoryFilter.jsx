import React from 'react'
import './CategoryFilter.css'

const categories = [
  { id: 'all', name: 'Hammasi', icon: 'location_on' },
  { id: 'restaurants', name: 'Restoranlar', icon: 'chef_hat' },
  { id: 'shops', name: 'Do\'konlar', icon: 'store' },
  { id: 'ads', name: 'E\'lonlar', icon: 'campaign' },
]

function CategoryFilter({ selectedCategory, onCategoryChange }) {
  const categoryRef = React.useRef(null)

  // Прокрутка к активной категории при изменении
  React.useEffect(() => {
    if (categoryRef.current) {
      const activeButton = categoryRef.current.querySelector('.category-button.active')
      if (activeButton) {
        activeButton.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        })
      }
    }
  }, [selectedCategory])

  return (
    <div className="category-filter" ref={categoryRef}>
      {categories.map(category => (
        <button
          key={category.id}
          className={`category-button ${selectedCategory === category.id ? 'active' : ''}`}
          onClick={() => onCategoryChange(category.id)}
        >
          <span className="material-symbols-outlined category-icon">{category.icon}</span>
          <span className="category-name">{category.name}</span>
        </button>
      ))}
    </div>
  )
}

export default CategoryFilter
