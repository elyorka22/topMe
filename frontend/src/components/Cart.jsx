import { useState, useEffect } from 'react'
import './Cart.css'

function Cart({ items, onUpdateQuantity, onRemoveItem, onClear, onCheckout }) {
  const [isOpen, setIsOpen] = useState(false)

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  useEffect(() => {
    if (items.length > 0 && !isOpen) {
      setIsOpen(true)
    }
  }, [items.length, isOpen])

  if (items.length === 0 && !isOpen) {
    return null
  }

  return (
    <>
      <button 
        className="cart-toggle" 
        onClick={() => setIsOpen(!isOpen)}
      >
        🛒 Savat
        {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
      </button>

      {isOpen && (
        <div className="cart-overlay" onClick={() => setIsOpen(false)}>
          <div className="cart-panel" onClick={(e) => e.stopPropagation()}>
            <div className="cart-header">
              <h2>Savat</h2>
              <button className="cart-close" onClick={() => setIsOpen(false)}>×</button>
            </div>

            {items.length === 0 ? (
              <div className="cart-empty">
                <p>Savat bo'sh</p>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {items.map((item) => (
                    <div key={item.id} className="cart-item">
                      <div className="cart-item-info">
                        <div className="cart-item-image">{item.image}</div>
                        <div className="cart-item-details">
                          <h4>{item.name}</h4>
                          <p className="cart-item-description">{item.description}</p>
                          <p className="cart-item-price">{item.price.toLocaleString()} so'm</p>
                        </div>
                      </div>
                      <div className="cart-item-controls">
                        <button 
                          className="quantity-btn"
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        >
                          −
                        </button>
                        <span className="quantity">{item.quantity}</span>
                        <button 
                          className="quantity-btn"
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                        <button 
                          className="remove-btn"
                          onClick={() => onRemoveItem(item.id)}
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="cart-footer">
                  <div className="cart-total">
                    <span>Jami:</span>
                    <span className="total-price">{total.toLocaleString()} so'm</span>
                  </div>
                  <div className="cart-actions">
                    <button className="clear-btn" onClick={onClear}>
                      Tozalash
                    </button>
                    <button className="checkout-btn" onClick={onCheckout}>
                      Buyurtma berish
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default Cart
