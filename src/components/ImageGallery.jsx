import { useState } from 'react'
import './ImageGallery.css'

function ImageGallery({ images }) {
  const [selectedImage, setSelectedImage] = useState(0)

  if (!images || images.length === 0) {
    return null
  }

  const handlePrev = () => {
    setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const handleThumbnailClick = (index) => {
    setSelectedImage(index)
  }

  return (
    <div className="image-gallery">
      <div className="gallery-header">
        <h3>
          <span className="material-symbols-outlined" style={{ fontSize: '20px', verticalAlign: 'middle', marginRight: '8px' }}>
            photo_library
          </span>
          Rasmlar ({images.length})
        </h3>
      </div>

      <div className="gallery-main">
        <div className="main-image-container">
          {images.length > 1 && (
            <button className="gallery-nav prev" onClick={handlePrev}>
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
          )}
          
          <img 
            src={images[selectedImage]} 
            alt={`Rasm ${selectedImage + 1}`}
            className="main-image"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/800x600?text=Изображение+не+загружено'
            }}
          />

          {images.length > 1 && (
            <button className="gallery-nav next" onClick={handleNext}>
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          )}

          {images.length > 1 && (
            <div className="image-counter">
              {selectedImage + 1} / {images.length}
            </div>
          )}
        </div>

        {images.length > 1 && (
          <div className="thumbnail-container">
            {images.map((image, index) => (
              <div
                key={index}
                className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                onClick={() => handleThumbnailClick(index)}
              >
                <img 
                  src={image} 
                  alt={`Kichik rasm ${index + 1}`}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/150x100?text=Ошибка'
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ImageGallery
