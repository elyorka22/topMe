// Функция для получения геолокации пользователя
export function getUserLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Геолокация не поддерживается вашим браузером'))
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy
        })
      },
      (error) => {
        // Если пользователь отклонил запрос, используем координаты города по умолчанию
        console.warn('Не удалось получить геолокацию:', error.message)
        // Координаты города: 40°59′52″ с. ш. 71°14′25″ в. д.
        resolve({
          lat: 40.997778,
          lng: 71.240278,
          accuracy: null,
          isDefault: true
        })
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    )
  })
}

// Функция для расчета расстояния между двумя точками (в метрах)
// Использует формулу гаверсинуса
export function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371000 // Радиус Земли в метрах
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

// Форматирование расстояния для отображения
export function formatDistance(meters) {
  if (meters < 1000) {
    return `${Math.round(meters)} м`
  }
  return `${(meters / 1000).toFixed(1)} км`
}
