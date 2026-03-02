import { useState, useEffect } from 'react'
import { locations as defaultLocations } from '../../data/locations'
import './AdminLocations.css'

function AdminLocations() {
  const [locations, setLocations] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [editingLocation, setEditingLocation] = useState(null)
  const [showAddModal, setShowAddModal] = useState(false)

  useEffect(() => {
    loadLocations()
  }, [])

  const loadLocations = () => {
    const saved = localStorage.getItem('locations')
    if (saved) {
      try {
        setLocations(JSON.parse(saved))
      } catch {
        setLocations(defaultLocations)
      }
    } else {
      setLocations(defaultLocations)
    }
  }

  const saveLocations = (newLocations) => {
    localStorage.setItem('locations', JSON.stringify(newLocations))
    setLocations(newLocations)
    window.dispatchEvent(new Event('locationsUpdated'))
  }

  const handleDelete = (id) => {
    if (confirm('Bu lokatsiyani o\'chirishni xohlaysizmi?')) {
      const updated = locations.filter(loc => loc.id !== id)
      saveLocations(updated)
    }
  }

  const handleEdit = (location) => {
    setEditingLocation({ ...location })
    setShowAddModal(true)
  }

  const handleSave = (locationData) => {
    if (editingLocation) {
      // Редактирование
      const updated = locations.map(loc =>
        loc.id === editingLocation.id ? { ...locationData, id: editingLocation.id } : loc
      )
      saveLocations(updated)
    } else {
      // Добавление
      const newLocation = {
        ...locationData,
        id: Date.now().toString()
      }
      saveLocations([...locations, newLocation])
    }
    setShowAddModal(false)
    setEditingLocation(null)
  }

  const filteredLocations = selectedCategory === 'all'
    ? locations
    : locations.filter(loc => loc.category === selectedCategory)

  const categoryNames = {
    all: 'Hammasi',
    restaurants: 'Restoranlar',
    shops: 'Do\'konlar',
    ads: 'E\'lonlar'
  }

  return (
    <div className="admin-locations">
      <div className="admin-locations-header">
        <h2>Lokatsiyalarni boshqarish</h2>
        <button className="add-location-btn" onClick={() => {
          setEditingLocation(null)
          setShowAddModal(true)
        }}>
          <span className="material-symbols-outlined">add</span>
          Yangi lokatsiya
        </button>
      </div>

      <div className="category-filter">
        {Object.entries(categoryNames).map(([key, name]) => (
          <button
            key={key}
            className={`filter-btn ${selectedCategory === key ? 'active' : ''}`}
            onClick={() => setSelectedCategory(key)}
          >
            {name} ({locations.filter(loc => key === 'all' || loc.category === key).length})
          </button>
        ))}
      </div>

      <div className="locations-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nomi</th>
              <th>Kategoriya</th>
              <th>Manzil</th>
              <th>Telefon</th>
              <th>Amallar</th>
            </tr>
          </thead>
          <tbody>
            {filteredLocations.length > 0 ? (
              filteredLocations.map((location) => (
                <tr key={location.id}>
                  <td>{location.id}</td>
                  <td>{location.name}</td>
                  <td>
                    <span className={`category-badge ${location.category}`}>
                      {categoryNames[location.category]}
                    </span>
                  </td>
                  <td>{location.address || '-'}</td>
                  <td>{location.phone || '-'}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(location)}
                        title="Tahrirlash"
                      >
                        <span className="material-symbols-outlined">edit</span>
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(location.id)}
                        title="O'chirish"
                      >
                        <span className="material-symbols-outlined">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="no-data">Lokatsiyalar topilmadi</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showAddModal && (
        <LocationModal
          location={editingLocation}
          onSave={handleSave}
          onClose={() => {
            setShowAddModal(false)
            setEditingLocation(null)
          }}
        />
      )}
    </div>
  )
}

function LocationModal({ location, onSave, onClose }) {
  const [formData, setFormData] = useState({
    name: location?.name || '',
    category: location?.category || 'restaurants',
    description: location?.description || '',
    address: location?.address || '',
    phone: location?.phone || '',
    lat: location?.lat || 40.997778,
    lng: location?.lng || 71.240278,
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.description) {
      alert('Nomi va tavsifni to\'ldiring')
      return
    }
    onSave(formData)
  }

  return (
    <div className="location-modal-overlay" onClick={onClose}>
      <div className="location-modal" onClick={(e) => e.stopPropagation()}>
        <div className="location-modal-header">
          <h3>{location ? 'Lokatsiyani tahrirlash' : 'Yangi lokatsiya'}</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="location-form">
          <div className="form-row">
            <div className="form-group">
              <label>Nomi *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Kategoriya *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
              >
                <option value="restaurants">Restoran</option>
                <option value="shops">Do'kon</option>
                <option value="ads">E'lon</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Tavsif *</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Manzil</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Telefon</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Kenglik (lat)</label>
              <input
                type="number"
                step="0.000001"
                value={formData.lat}
                onChange={(e) => setFormData({ ...formData, lat: parseFloat(e.target.value) })}
                required
              />
            </div>
            <div className="form-group">
              <label>Uzunlik (lng)</label>
              <input
                type="number"
                step="0.000001"
                value={formData.lng}
                onChange={(e) => setFormData({ ...formData, lng: parseFloat(e.target.value) })}
                required
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Bekor qilish
            </button>
            <button type="submit" className="save-btn">
              {location ? 'Saqlash' : 'Qo\'shish'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AdminLocations
