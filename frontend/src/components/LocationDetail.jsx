import { useEffect } from 'react'
import { calculateDistance, formatDistance } from '../utils/geolocation'
import RestaurantMenu from './RestaurantMenu'
import ShopProducts from './ShopProducts'
import ImageGallery from './ImageGallery'
import { getRestaurantMenu } from '../data/menus'
import { getShopProducts } from '../data/products'
import './LocationDetail.css'

const categoryIcons = {
  restaurants: 'chef_hat',
  shops: 'store',
  ads: 'campaign',
}

const categoryNames = {
  restaurants: 'Restoran',
  shops: 'Do\'kon',
  ads: 'E\'lon',
}

function LocationDetail({ location, userLocation, onClose, onAddToCart }) {
  useEffect(() => {
    // Блокируем прокрутку страницы при открытой детальной странице
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  const distance = userLocation && !userLocation.isDefault
    ? formatDistance(calculateDistance(
        userLocation.lat,
        userLocation.lng,
        location.lat,
        location.lng
      ))
    : null

  const menu = location.category === 'restaurants' ? getRestaurantMenu(location.id) : null
  const products = location.category === 'shops' ? getShopProducts(location.id) : null

  return (
    <div className="location-detail-overlay">
      <div className="location-detail-card">
        <button className="close-button" onClick={onClose}>×</button>
        
        <div className="location-detail-header">
          <div className="location-icon">
            <span className="material-symbols-outlined" style={{ fontSize: '4rem' }}>
              {categoryIcons[location.category]}
            </span>
          </div>
          <div className="location-header-info">
            <h1>{location.name}</h1>
            <p className="location-category">{categoryNames[location.category]}</p>
          </div>
        </div>

        <div className="location-detail-content">
          <div className="location-section">
            <h3>Tavsif</h3>
            <p>{location.description}</p>
          </div>

          {distance && (
            <div className="location-section">
              <h3>📍 Masofa</h3>
              <p className="distance-value">{distance}</p>
            </div>
          )}

          {location.address && (
            <div className="location-section">
              <h3>📍 Manzil</h3>
              <p>{location.address}</p>
            </div>
          )}

          {location.phone && (
            <div className="location-section">
              <h3>📞 Telefon</h3>
              <a href={`tel:${location.phone}`} className="phone-link">
                {location.phone}
              </a>
            </div>
          )}

          <div className="location-section">
            <h3>📍 Koordinatalar</h3>
            <p className="coordinates">
              {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
            </p>
          </div>

          {menu && (
            <RestaurantMenu 
              menu={menu} 
              onAddToCart={onAddToCart}
            />
          )}

          {products && (
            <ShopProducts 
              products={products} 
              onAddToCart={onAddToCart}
            />
          )}

          {location.images && location.images.length > 0 && (
            <ImageGallery images={location.images} />
          )}

          {location.price && (
            <div className="location-section">
              <h3>💰 Narx</h3>
              <p className="price-value">{location.price}</p>
            </div>
          )}
        </div>

        <div className="location-detail-actions">
          {location.phone && (
            <a href={`tel:${location.phone}`} className="action-button primary">
              📞 Qo'ng'iroq qilish
            </a>
          )}
          <button
            onClick={onClose}
            className="action-button secondary"
          >
            🗺️ Xaritaga qaytish
          </button>
        </div>
      </div>
    </div>
  )
}

export default LocationDetail
