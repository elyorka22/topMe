import { useState } from 'react'
import './RestaurantMenu.css'

function RestaurantMenu({ menu, onAddToCart }) {
  const [selectedCategory, setSelectedCategory] = useState(0)

  if (!menu || !menu.categories || menu.categories.length === 0) {
    return (
      <div className="menu-empty">
        <p>Menyu vaqtincha mavjud emas</p>
      </div>
    )
  }

  const currentCategory = menu.categories[selectedCategory]

  return (
    <div className="restaurant-menu">
      <div className="menu-header">
        <h2>🍽️ Menyu</h2>
      </div>

      <div className="menu-categories">
        {menu.categories.map((category, index) => (
          <button
            key={index}
            className={`category-tab ${selectedCategory === index ? 'active' : ''}`}
            onClick={() => setSelectedCategory(index)}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="menu-items">
        {currentCategory.items.map((item) => (
          <div key={item.id} className="menu-item">
            <div className="menu-item-image">{item.image}</div>
            <div className="menu-item-info">
              <h3>{item.name}</h3>
              <p className="menu-item-description">{item.description}</p>
              <p className="menu-item-price">{item.price.toLocaleString()} so'm</p>
            </div>
            <button
              className="add-to-cart-btn"
              onClick={() => onAddToCart(item)}
            >
              + Savatga
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RestaurantMenu
