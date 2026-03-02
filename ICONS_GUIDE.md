# Руководство по бесплатным иконкам для проекта TopMe

## 🎯 ГДЕ ВИЗУАЛЬНО ПРОСМАТРИВАТЬ ИКОНКИ

### ⭐ React Icons (Главный сайт для просмотра)
**https://react-icons.github.io/react-icons/**

**Это лучший способ выбрать иконки:**
1. Откройте сайт
2. Выберите библиотеку слева (Font Awesome, Material Design и т.д.)
3. Просматривайте все иконки визуально
4. Используйте поиск для быстрого поиска
5. Кликните на иконку - увидите название для импорта

**Пример поиска:**
- "restaurant" → найдет все иконки ресторанов
- "shop" → найдет все иконки магазинов
- "announcement" → найдет все иконки объявлений

### 📚 Другие визуальные галереи:
- **Font Awesome**: https://fontawesome.com/icons (поиск по категориям)
- **Material Icons**: https://fonts.google.com/icons (категории и поиск)
- **Heroicons**: https://heroicons.com/ (современные иконки)
- **Lucide**: https://lucide.dev/icons/ (поиск и категории)

**Подробнее смотрите файл `ICONS_VISUAL_GUIDE.md`**

---

## Рекомендуемые источники бесплатных иконок

### 1. **Font Awesome** (Рекомендуется)
- **Сайт**: https://fontawesome.com/
- **Бесплатная версия**: Font Awesome Free (1600+ иконок)
- **Как использовать**: 
  ```html
  <!-- В index.html -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  ```
  ```jsx
  <i className="fas fa-utensils"></i> // Ресторан
  <i className="fas fa-shopping-cart"></i> // Магазин
  <i className="fas fa-bullhorn"></i> // Объявления
  ```

### 2. **React Icons** (Лучший выбор для React)
- **Сайт**: https://react-icons.github.io/react-icons/
- **Библиотеки**: Font Awesome, Material Design, Bootstrap Icons и др.
- **Установка**: 
  ```bash
  npm install react-icons
  ```
- **Использование**:
  ```jsx
  import { FaUtensils, FaShoppingCart, FaBullhorn } from 'react-icons/fa';
  import { MdRestaurant, MdStore, MdAnnouncement } from 'react-icons/md';
  ```

### 3. **Heroicons** (От создателей Tailwind CSS)
- **Сайт**: https://heroicons.com/
- **Формат**: SVG иконки
- **Установка**: 
  ```bash
  npm install @heroicons/react
  ```
- **Использование**:
  ```jsx
  import { RestaurantIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
  ```

### 4. **Material Icons** (Google)
- **Сайт**: https://fonts.google.com/icons
- **CDN**: 
  ```html
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  ```
- **Использование**:
  ```jsx
  <span className="material-icons">restaurant</span>
  <span className="material-icons">store</span>
  ```

### 5. **Lucide Icons** (Современные иконки)
- **Сайт**: https://lucide.dev/
- **Установка**: 
  ```bash
  npm install lucide-react
  ```
- **Использование**:
  ```jsx
  import { Utensils, ShoppingCart, Megaphone } from 'lucide-react';
  ```

### 6. **Flaticon** (Большая коллекция)
- **Сайт**: https://www.flaticon.com/
- **Лицензия**: Бесплатно с указанием автора
- **Формат**: SVG, PNG, ICO

### 7. **Icons8** (Стилизованные иконки)
- **Сайт**: https://icons8.com/
- **Лицензия**: Бесплатно с указанием ссылки
- **Формат**: PNG, SVG

## Рекомендация для вашего проекта

**Лучший выбор: React Icons**

Преимущества:
- ✅ Легко интегрируется с React
- ✅ Включает множество библиотек иконок
- ✅ Не требует дополнительных CSS файлов
- ✅ Оптимизирован для React
- ✅ Бесплатно и открытый исходный код

## Пример интеграции React Icons в ваш проект

### Для маркеров на карте (MapComponent.jsx)

```jsx
import { renderToString } from 'react-dom/server';
import { FaUtensils, FaShoppingCart, FaBullhorn, FaMapMarkerAlt } from 'react-icons/fa';

const createCustomIcon = (IconComponent, color) => {
  const iconHtml = renderToString(<IconComponent />);
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
        font-size: 20px;
        display: block;
        color: white;
      ">${iconHtml}</span>
    </div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40]
  })
}

const categoryIcons = {
  restaurants: createCustomIcon(FaUtensils, '#e74c3c'),
  shops: createCustomIcon(FaShoppingCart, '#3498db'),
  ads: createCustomIcon(FaBullhorn, '#2ecc71'),
  user: createCustomIcon(FaMapMarkerAlt, '#9b59b6')
};
```

### Для компонентов (CategoryFilter, LocationDetail и др.)

```jsx
import { FaUtensils, FaShoppingCart, FaBullhorn } from 'react-icons/fa';

// Вместо эмодзи используйте:
<FaUtensils className="icon" /> // Рестораны
<FaShoppingCart className="icon" /> // Магазины
<FaBullhorn className="icon" /> // Объявления
```

### Для меню и товаров

```jsx
import { FaPizzaSlice, FaHamburger, FaIceCream } from 'react-icons/fa';

// В карточках блюд/товаров:
<div className="menu-item-image">
  <FaPizzaSlice size={40} />
</div>
```

## Альтернатива: SVG иконки

Если хотите использовать собственные SVG иконки:

1. Скачайте SVG с любого из сайтов выше
2. Создайте папку `src/assets/icons/`
3. Импортируйте как компоненты React

```jsx
import RestaurantIcon from '../assets/icons/restaurant.svg';
```

## Текущее решение (Эмодзи)

Сейчас проект использует эмодзи, что тоже хорошо:
- ✅ Не требует зависимостей
- ✅ Работает везде
- ✅ Легко использовать
- ✅ Небольшой размер

Если хотите более профессиональный вид, рекомендую перейти на React Icons.
