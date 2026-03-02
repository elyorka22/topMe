# Визуальные галереи иконок для просмотра и выбора

## 🎯 React Icons (Рекомендуется - уже установлен)

### Основной сайт с поиском:
**https://react-icons.github.io/react-icons/**

**Как использовать:**
1. Откройте сайт
2. В левой панели выберите библиотеку (Font Awesome, Material Design и т.д.)
3. Просматривайте иконки визуально
4. Кликните на иконку - увидите название для импорта
5. Скопируйте название и используйте в коде

**Пример:**
- Нашли иконку "FaUtensils" → импорт: `import { FaUtensils } from 'react-icons/fa';`

---

## 📚 Font Awesome Icons

### Официальный сайт:
**https://fontawesome.com/icons**

**Как использовать:**
1. Откройте сайт
2. Используйте поиск (например: "restaurant", "shopping", "store")
3. Просматривайте иконки с названиями
4. Для React Icons используйте префикс `Fa` (Font Awesome)
   - Например: "utensils" → `FaUtensils`

### Прямые ссылки на категории:
- **Рестораны/Еда**: https://fontawesome.com/icons?d=gallery&c=food-beverage
- **Магазины/Покупки**: https://fontawesome.com/icons?d=gallery&c=shopping
- **Объявления/Коммуникация**: https://fontawesome.com/icons?d=gallery&c=communication

---

## 🎨 Material Design Icons (Material Symbols)

### Официальный сайт:
**https://fonts.google.com/icons**

**Как использовать:**
1. Откройте сайт
2. Просматривайте иконки по категориям
3. Для React Icons используйте префикс `Md` (Material Design)
   - Например: "restaurant" → `MdRestaurant`

### Прямые ссылки:
- **Рестораны**: https://fonts.google.com/icons?selected=Material+Symbols+Rounded:restaurant:FILL@0;wght@400;GRAD@0;opsz@24
- **Магазины**: https://fonts.google.com/icons?selected=Material+Symbols+Rounded:store:FILL@0;wght@400;GRAD@0;opsz@24

### 🆕 Material Symbols через Google Fonts (Новый способ!)

**Визуальный просмотр:**
**https://fonts.google.com/icons**

**Как использовать в HTML/React:**

1. **Добавьте ссылку в `index.html`:**
```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
```

2. **Используйте в компонентах:**
```jsx
// В JSX
<span className="material-symbols-outlined">restaurant</span>
<span className="material-symbols-outlined">store</span>
<span className="material-symbols-outlined">campaign</span> // Объявления
```

3. **Стилизация:**
```css
.material-symbols-outlined {
  font-variation-settings:
    'FILL' 0,
    'wght' 400,
    'GRAD' 0,
    'opsz' 24
}
```

**Преимущества:**
- ✅ Не требует установки библиотек
- ✅ Работает через CDN
- ✅ Легко использовать
- ✅ Можно настраивать вес, размер и заполнение

**Пример для вашего проекта:**
```html
<!-- В index.html -->
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
```

```jsx
// В компонентах
<span className="material-symbols-outlined">restaurant</span> // Ресторан
<span className="material-symbols-outlined">store</span> // Магазин
<span className="material-symbols-outlined">campaign</span> // Объявления
<span className="material-symbols-outlined">location_on</span> // Локация
```

---

## ⚡ Heroicons

### Официальный сайт:
**https://heroicons.com/**

**Как использовать:**
1. Откройте сайт
2. Выберите стиль: Outline или Solid
3. Просматривайте иконки
4. Для React Icons используйте префикс `Hi` (Heroicons)
   - Например: "shopping-bag" → `HiShoppingBag`

---

## ✨ Lucide Icons

### Официальный сайт:
**https://lucide.dev/icons/**

**Как использовать:**
1. Откройте сайт
2. Используйте поиск или просматривайте по категориям
3. Для React Icons используйте префикс `Lu` (Lucide)
   - Например: "utensils-crossed" → `LuUtensilsCrossed`

---

## 🎯 Bootstrap Icons

### Официальный сайт:
**https://icons.getbootstrap.com/**

**Как использовать:**
1. Откройте сайт
2. Просматривайте иконки
3. Для React Icons используйте префикс `Bi` (Bootstrap Icons)
   - Например: "shop" → `BiShop`

---

## 🔍 Быстрый поиск иконок для вашего проекта

### Для категорий:

**Рестораны/Еда:**
- `FaUtensils` - вилки и нож
- `MdRestaurant` - ресторан
- `BiRestaurant` - ресторан
- `HiOutlineShoppingBag` - сумка (для доставки)

**Магазины:**
- `FaShoppingCart` - корзина покупок
- `MdStore` - магазин
- `BiStore` - магазин
- `HiShoppingBag` - сумка покупок

**Объявления:**
- `FaBullhorn` - мегафон
- `MdAnnouncement` - объявление
- `BiBullhorn` - мегафон
- `HiSpeakerWave` - динамик

**Локация пользователя:**
- `FaMapMarkerAlt` - маркер карты
- `MdLocationOn` - локация
- `BiMap` - карта
- `HiLocationMarker` - маркер

---

## 💡 Рекомендация для быстрого выбора:

1. **Откройте**: https://react-icons.github.io/react-icons/
2. **Выберите библиотеку** в левой панели (например, "Font Awesome")
3. **Используйте поиск** вверху страницы
4. **Просматривайте** иконки визуально
5. **Копируйте название** и используйте в коде

**Пример поиска:**
- Введите "restaurant" → увидите все иконки ресторанов
- Введите "shop" → увидите все иконки магазинов
- Введите "announcement" → увидите все иконки объявлений

---

## 🎨 Онлайн редактор для тестирования:

**CodeSandbox с React Icons:**
https://codesandbox.io/s/react-icons-example

Можно сразу видеть, как иконки выглядят в коде!

---

## 📱 Мобильные приложения:

- **IconScout** (iOS/Android) - большая коллекция иконок
- **IconKitchen** - создание собственных иконок

---

## 🔗 Полезные ссылки:

- **React Icons GitHub**: https://github.com/react-icons/react-icons
- **Все библиотеки в React Icons**: https://react-icons.github.io/react-icons/search/
- **Font Awesome Gallery**: https://fontawesome.com/search
- **Material Icons Gallery**: https://fonts.google.com/icons
