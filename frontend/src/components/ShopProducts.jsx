import { useState } from 'react'
import './ShopProducts.css'

function ShopProducts({ products, onAddToCart }) {
  const [selectedCategory, setSelectedCategory] = useState(0)

  if (!products || !products.categories || products.categories.length === 0) {
    return (
      <div className="products-empty">
        <p>Mahsulotlar vaqtincha mavjud emas</p>
      </div>
    )
  }

  const currentCategory = products.categories[selectedCategory]

  return (
    <div className="shop-products">
      <div className="products-header">
        <h2>🛒 Mahsulotlar</h2>
      </div>

      <div className="products-categories">
        {products.categories.map((category, index) => (
          <button
            key={index}
            className={`category-tab ${selectedCategory === index ? 'active' : ''}`}
            onClick={() => setSelectedCategory(index)}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="products-items">
        {currentCategory.items.map((item) => (
          <div key={item.id} className="product-item">
            <div className="product-item-image">{item.image}</div>
            <div className="product-item-info">
              <h3>{item.name}</h3>
              <p className="product-item-description">{item.description}</p>
              <p className="product-item-price">{item.price.toLocaleString()} so'm</p>
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

export default ShopProducts
