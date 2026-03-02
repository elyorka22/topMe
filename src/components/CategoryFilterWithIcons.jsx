// Пример использования Material Symbols вместо эмодзи
// Это альтернативная версия CategoryFilter с Material Symbols

import './CategoryFilter.css'

const categories = [
  { id: 'all', name: 'Все', icon: 'location_on' },
  { id: 'restaurants', name: 'Рестораны', icon: 'chef_hat' }, // Используем chef_hat
  { id: 'shops', name: 'Магазины', icon: 'store' },
  { id: 'ads', name: 'Объявления', icon: 'campaign' },
]

function CategoryFilterWithIcons({ selectedCategory, onCategoryChange }) {
  return (
    <div className="category-filter">
      {categories.map(category => (
        <button
          key={category.id}
          className={`category-button ${selectedCategory === category.id ? 'active' : ''}`}
          onClick={() => onCategoryChange(category.id)}
        >
          <span className="material-symbols-outlined category-icon">
            {category.icon}
          </span>
          <span className="category-name">{category.name}</span>
        </button>
      ))}
    </div>
  )
}

export default CategoryFilterWithIcons
