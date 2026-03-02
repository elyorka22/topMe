import { useState, useMemo, useEffect } from 'react'
import { AuthProvider, useAuth } from './context/AuthContext'
import MapComponent from './components/MapComponent'
import BottomNavigation from './components/BottomNavigation'
import LocationDetail from './components/LocationDetail'
import Cart from './components/Cart'
import AuthModal from './components/AuthModal'
import UserMenu from './components/UserMenu'
import CreateAdModal from './components/CreateAdModal'
import AdminPanel from './components/admin/AdminPanel'
import { locations as defaultLocations } from './data/locations'
import { calculateDistance } from './utils/geolocation'
import './App.css'

function AppContent() {
  const { isAuthenticated, isAdmin } = useAuth()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [userLocation, setUserLocation] = useState(null)
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [cartItems, setCartItems] = useState([])
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showCreateAd, setShowCreateAd] = useState(false)
  const [showAdminPanel, setShowAdminPanel] = useState(false)
  const [locations, setLocations] = useState(() => {
    // Загружаем локации из localStorage или используем дефолтные
    const saved = localStorage.getItem('locations')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch {
        return defaultLocations
      }
    }
    // Сохраняем дефолтные локации
    localStorage.setItem('locations', JSON.stringify(defaultLocations))
    return defaultLocations
  })

  // Слушаем обновления локаций из админ-панели
  useEffect(() => {
    const handleLocationsUpdate = () => {
      const saved = localStorage.getItem('locations')
      if (saved) {
        try {
          setLocations(JSON.parse(saved))
        } catch {
          setLocations(defaultLocations)
        }
      }
    }

    window.addEventListener('locationsUpdated', handleLocationsUpdate)
    return () => window.removeEventListener('locationsUpdated', handleLocationsUpdate)
  }, [])

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
  }

  const handleLocationClick = (location) => {
    setSelectedLocation(location)
  }

  const handleCloseDetail = () => {
    setSelectedLocation(null)
  }

  const handleAddToCart = (item) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id)
      if (existingItem) {
        return prevItems.map(i =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      }
      return [...prevItems, { ...item, quantity: 1 }]
    })
  }

  const handleUpdateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(itemId)
      return
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId
          ? { ...item, quantity: newQuantity }
          : item
      )
    )
  }

  const handleRemoveItem = (itemId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId))
  }

  const handleClearCart = () => {
    setCartItems([])
  }

  const handleCheckout = () => {
    if (cartItems.length === 0) return
    alert(`Buyurtma rasmiylashtirildi! Mahsulotlar: ${cartItems.reduce((sum, item) => sum + item.quantity, 0)}\nSumma: ${cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toLocaleString()} so'm`)
    setCartItems([])
  }

  const handleAdCreated = (newAd) => {
    // Добавляем новое объявление в список
    const updatedLocations = [...locations, newAd]
    setLocations(updatedLocations)
    localStorage.setItem('locations', JSON.stringify(updatedLocations))
  }

  const handleCreateAdClick = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true)
    } else {
      setShowCreateAd(true)
    }
  }

  // Получаем геолокацию при загрузке приложения
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        },
        () => {
          // Если не удалось получить, используем координаты города
          setUserLocation({
            lat: 40.997778,
            lng: 71.240278,
            isDefault: true
          })
        }
      )
    } else {
      setUserLocation({
        lat: 40.997778,
        lng: 71.240278,
        isDefault: true
      })
    }
  }, [])

  // Фильтрация и сортировка локаций
  const filteredLocations = useMemo(() => {
    let filtered = selectedCategory === 'all' 
      ? locations 
      : locations.filter(loc => loc.category === selectedCategory)

    // Сортируем по расстоянию от пользователя, если геолокация доступна
    if (userLocation && !userLocation.isDefault) {
      filtered = filtered.map(location => ({
        ...location,
        distance: calculateDistance(
          userLocation.lat,
          userLocation.lng,
          location.lat,
          location.lng
        )
      })).sort((a, b) => a.distance - b.distance)
    }

    return filtered
  }, [selectedCategory, userLocation, locations])

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="header-title">
            <h1>TopMe</h1>
            <p>Ovqat yetkazib berish, mahsulotlar, e'lonlar</p>
          </div>
          <div className="header-actions">
            {!isAuthenticated ? (
              <button className="auth-button" onClick={() => setShowAuthModal(true)}>
                <span className="material-symbols-outlined">login</span>
                <span className="auth-button-text">Kirish</span>
              </button>
            ) : (
              <>
                <UserMenu 
                  onShowCreateAd={() => setShowCreateAd(true)}
                  onShowAdminPanel={() => setShowAdminPanel(true)}
                />
                <button className="create-ad-button" onClick={handleCreateAdClick}>
                  <span className="material-symbols-outlined">add</span>
                  <span className="button-text">E'lon</span>
                </button>
                {isAdmin && (
                  <button className="admin-button" onClick={() => setShowAdminPanel(true)}>
                    <span className="material-symbols-outlined">admin_panel_settings</span>
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </header>
      <MapComponent 
        locations={filteredLocations} 
        onLocationClick={handleLocationClick}
      />
      {selectedLocation && (
        <LocationDetail
          location={selectedLocation}
          userLocation={userLocation}
          onClose={handleCloseDetail}
          onAddToCart={handleAddToCart}
        />
      )}
      <Cart
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClear={handleClearCart}
        onCheckout={handleCheckout}
      />
      {showAuthModal && (
        <AuthModal onClose={() => setShowAuthModal(false)} />
      )}
      {showCreateAd && (
        <CreateAdModal
          onClose={() => setShowCreateAd(false)}
          onAdCreated={handleAdCreated}
        />
      )}
      {showAdminPanel && (
        <AdminPanel onClose={() => setShowAdminPanel(false)} />
      )}
      <BottomNavigation 
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
