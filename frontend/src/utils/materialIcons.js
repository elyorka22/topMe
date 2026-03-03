// Пример использования Material Symbols в проекте
// Material Symbols уже подключены в index.html

// Использование в компонентах:
// 
// import './materialIcons.css'; // Если нужны кастомные стили
//
// <span className="material-symbols-outlined">restaurant</span>
// <span className="material-symbols-outlined">store</span>
// <span className="material-symbols-outlined">campaign</span>
// <span className="material-symbols-outlined">location_on</span>

// Популярные иконки для проекта:

export const materialIcons = {
  // Рестораны
  restaurant: 'restaurant',
  dining: 'dining',
  restaurant_menu: 'restaurant_menu',
  local_dining: 'local_dining',
  
  // Магазины
  store: 'store',
  shopping_cart: 'shopping_cart',
  shopping_bag: 'shopping_bag',
  storefront: 'storefront',
  
  // Объявления
  campaign: 'campaign',
  announcement: 'announcement',
  megaphone: 'campaign', // альтернатива
  
  // Локация
  location_on: 'location_on',
  place: 'place',
  pin_drop: 'pin_drop',
  
  // Дополнительные
  phone: 'phone',
  call: 'call',
  map: 'map',
  close: 'close',
  menu: 'menu',
  search: 'search',
}

// Компонент-хелпер для использования:
export function MaterialIcon({ name, className = '', size = 24, fill = 0, weight = 400 }) {
  return (
    <span 
      className={`material-symbols-outlined ${className}`}
      style={{
        fontSize: `${size}px`,
        fontVariationSettings: `'FILL' ${fill}, 'wght' ${weight}, 'GRAD' 0, 'opsz' ${size}`
      }}
    >
      {name}
    </span>
  )
}

// Пример использования:
// <MaterialIcon name="restaurant" size={32} />
// <MaterialIcon name="store" size={24} fill={1} weight={600} />
