import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import './CreateAdModal.css'

function CreateAdModal({ onClose, onAdCreated }) {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    phone: user?.phone || '',
    price: '',
    images: []
  })

  const [imageUrls, setImageUrls] = useState([''])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageUrlChange = (index, value) => {
    const newUrls = [...imageUrls]
    newUrls[index] = value
    setImageUrls(newUrls)
    setFormData(prev => ({
      ...prev,
      images: newUrls.filter(url => url.trim() !== '')
    }))
  }

  const addImageField = () => {
    setImageUrls([...imageUrls, ''])
  }

  const removeImageField = (index) => {
    const newUrls = imageUrls.filter((_, i) => i !== index)
    setImageUrls(newUrls)
    setFormData(prev => ({
      ...prev,
      images: newUrls.filter(url => url.trim() !== '')
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!formData.name || !formData.description) {
      setError('Nomi va tavsifni to\'ldiring')
      return
    }

    setLoading(true)

    // Получаем текущие локации
    const locations = JSON.parse(localStorage.getItem('locations') || JSON.stringify([]))
    
    // Создаем новое объявление
    const newAd = {
      id: Date.now().toString(),
      name: formData.name,
      category: 'ads',
      description: formData.description,
      address: formData.address,
      phone: formData.phone,
      price: formData.price || undefined,
      images: formData.images.length > 0 ? formData.images : undefined,
      lat: 40.997778, // Координаты по умолчанию (можно будет улучшить)
      lng: 71.240278,
      createdBy: user.id,
      createdAt: new Date().toISOString()
    }

    // Добавляем в локации
    locations.push(newAd)
    localStorage.setItem('locations', JSON.stringify(locations))

    setLoading(false)
    onAdCreated(newAd)
    onClose()
  }

  return (
    <div className="create-ad-overlay" onClick={onClose}>
      <div className="create-ad-modal" onClick={(e) => e.stopPropagation()}>
        <button className="create-ad-close" onClick={onClose}>×</button>

        <h2>E'lon yaratish</h2>

        {error && (
          <div className="create-ad-error">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="create-ad-form">
          <div className="form-group">
            <label>
              <span className="material-symbols-outlined">title</span>
              Nomi *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="E'lon nomi"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>
              <span className="material-symbols-outlined">description</span>
              Tavsif *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Batafsil tavsif"
              rows={4}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>
              <span className="material-symbols-outlined">place</span>
              Manzil
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Manzil"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>
              <span className="material-symbols-outlined">phone</span>
              Telefon
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="+998 90 123-45-67"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>
              <span className="material-symbols-outlined">attach_money</span>
              Narx
            </label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="500 USD"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>
              <span className="material-symbols-outlined">photo_library</span>
              Rasmlar (URL)
            </label>
            {imageUrls.map((url, index) => (
              <div key={index} className="image-url-input">
                <input
                  type="url"
                  value={url}
                  onChange={(e) => handleImageUrlChange(index, e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  disabled={loading}
                />
                {imageUrls.length > 1 && (
                  <button
                    type="button"
                    className="remove-image-btn"
                    onClick={() => removeImageField(index)}
                    disabled={loading}
                  >
                    <span className="material-symbols-outlined">close</span>
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              className="add-image-btn"
              onClick={addImageField}
              disabled={loading}
            >
              <span className="material-symbols-outlined">add</span>
              Rasm qo'shish
            </button>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
              disabled={loading}
            >
              Bekor qilish
            </button>
            <button
              type="submit"
              className="submit-btn"
              disabled={loading}
            >
              {loading ? 'Yaratilmoqda...' : 'E\'lon yaratish'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateAdModal
