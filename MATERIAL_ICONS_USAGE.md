# Использование Material Symbols в проекте TopMe

## ✅ Material Symbols уже подключены!

Ссылка на Google Fonts уже добавлена в `index.html`:
```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
```

## 🍽️ Иконка для ресторанов: `chef_hat`

### Как использовать:

```jsx
// Простое использование
<span className="material-symbols-outlined">chef_hat</span>

// С кастомным размером
<span className="material-symbols-outlined" style={{ fontSize: '32px' }}>chef_hat</span>

// С цветом
<span className="material-symbols-outlined" style={{ color: '#e74c3c', fontSize: '24px' }}>chef_hat</span>
```

### Примеры для разных категорий:

```jsx
// Рестораны
<span className="material-symbols-outlined">chef_hat</span>

// Магазины
<span className="material-symbols-outlined">store</span>
<span className="material-symbols-outlined">shopping_cart</span>

// Объявления
<span className="material-symbols-outlined">campaign</span>
<span className="material-symbols-outlined">announcement</span>

// Локация пользователя
<span className="material-symbols-outlined">location_on</span>
<span className="material-symbols-outlined">my_location</span>
```

## 📝 Замена эмодзи на Material Symbols

### В CategoryFilter.jsx:

**Было (эмодзи):**
```jsx
const categories = [
  { id: 'all', name: 'Все', icon: '📍' },
  { id: 'restaurants', name: 'Рестораны', icon: '🍽️' },
  { id: 'shops', name: 'Магазины', icon: '🛒' },
  { id: 'ads', name: 'Объявления', icon: '📢' },
]
```

**Стало (Material Symbols):**
```jsx
const categories = [
  { id: 'all', name: 'Все', icon: 'location_on' },
  { id: 'restaurants', name: 'Рестораны', icon: 'chef_hat' },
  { id: 'shops', name: 'Магазины', icon: 'store' },
  { id: 'ads', name: 'Объявления', icon: 'campaign' },
]

// В рендере:
{categories.map(category => (
  <button>
    <span className="material-symbols-outlined">{category.icon}</span>
    <span>{category.name}</span>
  </button>
))}
```

### В LocationDetail.jsx:

**Было:**
```jsx
const categoryIcons = {
  restaurants: '🍽️',
  shops: '🛒',
  ads: '📢',
}
```

**Стало:**
```jsx
const categoryIcons = {
  restaurants: 'chef_hat',
  shops: 'store',
  ads: 'campaign',
}

// В рендере:
<div className="location-icon">
  <span className="material-symbols-outlined">{categoryIcons[location.category]}</span>
</div>
```

## 🎨 Стилизация иконок

### Базовые стили (уже в materialIcons.css):

```css
.material-symbols-outlined {
  font-size: 24px;
  color: inherit;
}
```

### Кастомные стили для категорий:

```css
.icon-restaurant {
  color: #e74c3c;
  font-size: 32px;
}

.icon-shop {
  color: #3498db;
  font-size: 32px;
}

.icon-ads {
  color: #2ecc71;
  font-size: 32px;
}
```

## 🔍 Где найти другие иконки:

1. Откройте: https://fonts.google.com/icons
2. Используйте поиск (например: "chef", "restaurant", "shop")
3. Кликните на иконку - увидите название
4. Используйте название в коде: `<span className="material-symbols-outlined">название</span>`

## 📦 Популярные иконки для проекта:

### Рестораны:
- `chef_hat` - шеф-повар (рекомендуется)
- `restaurant` - ресторан
- `local_dining` - местная кухня
- `restaurant_menu` - меню ресторана

### Магазины:
- `store` - магазин
- `shopping_cart` - корзина покупок
- `storefront` - витрина магазина
- `shopping_bag` - сумка покупок

### Объявления:
- `campaign` - реклама/объявление
- `announcement` - объявление
- `notifications` - уведомления

### Локация:
- `location_on` - маркер на карте
- `my_location` - моя локация
- `place` - место
- `pin_drop` - метка

### Дополнительные:
- `phone` - телефон
- `call` - звонок
- `close` - закрыть
- `menu` - меню
- `search` - поиск
