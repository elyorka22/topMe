import { useEffect, useRef, useState } from 'react'
import { renderToString } from 'react-dom/server'
import L from 'leaflet'
import { getUserLocation, calculateDistance, formatDistance } from '../utils/geolocation'
import chefHat3d from '../assets/chef-3d.png' // 3D иконка повара для ресторанов
import './MapComponent.css'

// Координаты города по умолчанию: 40°59′52″ с. ш. 71°14′25″ в. д.
const CITY_CENTER = [40.997778, 71.240278] // Ташкент, Узбекистан

// Функция для создания кастомной иконки с Material Symbols
const createCustomIcon = (iconName, color) => {
  // Создаем HTML для Material Symbol иконки
  const iconHtml = `<span class="material-symbols-outlined" style="
    font-size: 24px;
    color: white;
    display: block;
    line-height: 1;
  ">${iconName}</span>`
  
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="
      background-color: ${color};
      width: 40px;
      height: 40px;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      border: 3px solid white;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
    ">
      <span style="
        transform: rotate(45deg);
        display: flex;
        align-items: center;
        justify-content: center;
      ">${iconHtml}</span>
    </div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40]
  })
}

// Иконка для локации пользователя
const userLocationIcon = createCustomIcon('location_on', '#9b59b6')

// 3D иконка для ресторанов (PNG)
const restaurantIcon3D = L.icon({
  iconUrl: chefHat3d,
  iconSize: [48, 48],
  iconAnchor: [24, 44],
  popupAnchor: [0, -44],
})

// Иконки для разных категорий
const categoryIcons = {
  restaurants: restaurantIcon3D, // 3D иконка ресторана
  shops: createCustomIcon('store', '#3498db'), // Синий для магазинов
  ads: createCustomIcon('campaign', '#2ecc71'), // Зеленый для объявлений
}

function MapComponent({ locations, onLocationClick }) {
  const mapRef = useRef(null)
  const markersRef = useRef([])
  const userMarkerRef = useRef(null)
  const [userLocation, setUserLocation] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Получение геолокации пользователя
    getUserLocation()
      .then(location => {
        setUserLocation(location)
        setLoading(false)
      })
      .catch(error => {
        console.error('Ошибка получения геолокации:', error)
        // Используем координаты города по умолчанию
        setUserLocation({ lat: CITY_CENTER[0], lng: CITY_CENTER[1], isDefault: true })
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    if (loading || !userLocation) return

    // Инициализация карты
    if (!mapRef.current) {
      mapRef.current = L.map('map').setView([userLocation.lat, userLocation.lng], 14)

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
      }).addTo(mapRef.current)

      // Обработчик клика на кнопки "Открыть" через делегирование событий
      mapRef.current.on('popupopen', (e) => {
        const popup = e.popup
        const popupElement = popup.getElement()
        if (popupElement) {
          const button = popupElement.querySelector('.open-button')
          if (button && onLocationClick) {
            const locationId = button.getAttribute('data-location-id')
            const location = locations.find(loc => loc.id === parseInt(locationId))
            if (location) {
              button.onclick = (event) => {
                event.stopPropagation()
                event.preventDefault()
                onLocationClick(location)
                mapRef.current.closePopup()
              }
            }
          }
        }
      })
    } else {
      // Обновляем центр карты на локацию пользователя
      mapRef.current.setView([userLocation.lat, userLocation.lng], 14)
    }

    // Удаление старых маркеров
    markersRef.current.forEach(marker => {
      mapRef.current.removeLayer(marker)
    })
    markersRef.current = []

    // Удаление старого маркера пользователя
    if (userMarkerRef.current) {
      mapRef.current.removeLayer(userMarkerRef.current)
    }

    // Добавление маркера локации пользователя
    userMarkerRef.current = L.marker([userLocation.lat, userLocation.lng], {
      icon: userLocationIcon,
      zIndexOffset: 1000 // Поверх других маркеров
    })
      .addTo(mapRef.current)
      .bindPopup(`
        <div class="popup-content">
          <h3><span class="material-symbols-outlined" style="font-size: 18px; vertical-align: middle;">location_on</span> Sizning joylashuvingiz</h3>
          ${userLocation.isDefault ? '<p><em>Standart joylashuv ishlatilmoqda</em></p>' : ''}
        </div>
      `)

    // Добавление круга точности (если доступно)
    if (userLocation.accuracy && !userLocation.isDefault) {
      L.circle([userLocation.lat, userLocation.lng], {
        radius: userLocation.accuracy,
        fillColor: '#3388ff',
        fillOpacity: 0.1,
        color: '#3388ff',
        weight: 1
      }).addTo(mapRef.current)
    }

    // Добавление маркеров локаций с расстоянием
    locations.forEach(location => {
      const distance = calculateDistance(
        userLocation.lat,
        userLocation.lng,
        location.lat,
        location.lng
      )
      const formattedDistance = formatDistance(distance)

      const marker = L.marker([location.lat, location.lng], {
        icon: categoryIcons[location.category]
      })
        .addTo(mapRef.current)
        .bindPopup(`
          <div class="popup-content">
            <h3>${location.name}</h3>
            <p>${location.description}</p>
            <p><strong><span class="material-symbols-outlined" style="font-size: 16px; vertical-align: middle;">straighten</span> Masofa:</strong> ${formattedDistance}</p>
            ${location.address ? `<p><strong>Manzil:</strong> ${location.address}</p>` : ''}
            ${location.phone ? `<p><strong>Telefon:</strong> ${location.phone}</p>` : ''}
            <button class="open-button" data-location-id="${location.id}">
              Ochish
            </button>
          </div>
        `)

      markersRef.current.push(marker)
    })

    return () => {
      // Очистка при размонтировании
      if (mapRef.current) {
        markersRef.current.forEach(marker => {
          mapRef.current.removeLayer(marker)
        })
        if (userMarkerRef.current) {
          mapRef.current.removeLayer(userMarkerRef.current)
        }
      }
    }
  }, [locations, userLocation, loading])

  return (
    <div className="map-container">
      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner">
            <span className="material-symbols-outlined" style={{ fontSize: '20px', marginRight: '8px' }}>location_on</span>
            Joylashuvingiz aniqlanmoqda...
          </div>
        </div>
      )}
      <div id="map" className="map-container"></div>
    </div>
  )
}

export default MapComponent
