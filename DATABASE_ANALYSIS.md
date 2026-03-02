# Анализ требований к базе данных для города 100к населения

## Текущая структура данных (localStorage)

### 1. Пользователи (users)
```javascript
{
  id: string,
  name: string,
  email: string,
  phone: string,
  password: string (hashed),
  isAdmin: boolean,
  createdAt: timestamp
}
```

### 2. Локации (locations)
```javascript
{
  id: string,
  name: string,
  category: 'restaurants' | 'shops' | 'ads',
  lat: number,
  lng: number,
  description: string,
  address: string,
  phone: string,
  price: string (optional),
  images: string[] (optional),
  createdBy: string (user id),
  createdAt: timestamp
}
```

### 3. Меню ресторанов (menus)
```javascript
{
  restaurantId: string,
  categories: [
    {
      name: string,
      items: [
        {
          id: string,
          name: string,
          description: string,
          price: number,
          image: string
        }
      ]
    }
  ]
}
```

### 4. Товары магазинов (products)
```javascript
{
  shopId: string,
  categories: [
    {
      name: string,
      items: [
        {
          id: string,
          name: string,
          description: string,
          price: number,
          image: string
        }
      ]
    }
  ]
}
```

---

## Оценка объема данных для города 100к

### Предположения:
- **Активные пользователи:** 10-20% (10,000-20,000)
- **Рестораны:** ~200-500
- **Магазины:** ~300-800
- **Объявления:** ~5,000-10,000 (активные)
- **Меню ресторанов:** ~50-100 позиций на ресторан
- **Товары магазинов:** ~100-500 позиций на магазин

### Расчет объема данных:

#### Пользователи:
- Размер записи: ~200 bytes
- 20,000 пользователей × 200 bytes = **4 MB**

#### Локации:
- Размер записи: ~1 KB (с изображениями в виде URL)
- 1,500 локаций × 1 KB = **1.5 MB**

#### Меню ресторанов:
- Размер записи: ~5 KB (с категориями и позициями)
- 500 ресторанов × 5 KB = **2.5 MB**

#### Товары магазинов:
- Размер записи: ~10 KB (больше товаров)
- 800 магазинов × 10 KB = **8 MB**

#### Объявления:
- Размер записи: ~2 KB (с изображениями)
- 10,000 объявлений × 2 KB = **20 MB**

#### Индексы и метаданные:
- ~5-10 MB

### **Итого: ~40-50 MB данных**

---

## Railway PostgreSQL - Планы и лимиты

### Starter план ($5/месяц):
- ✅ **1 GB storage** (достаточно с большим запасом)
- ✅ **512 MB RAM**
- ✅ **Shared CPU**
- ⚠️ Ограниченные подключения

**Вывод:** ✅ **Достаточно** для старта

### Developer план ($20/месяц):
- ✅ **8 GB storage** (более чем достаточно)
- ✅ **2 GB RAM**
- ✅ **Dedicated CPU**
- ✅ Больше подключений

**Вывод:** ✅ **Более чем достаточно** с большим запасом

### Pro план ($50/месяц):
- ✅ **40 GB storage**
- ✅ **4 GB RAM**
- ✅ **Dedicated CPU**
- ✅ Высокая производительность

**Вывод:** ✅ **Избыточно** для текущих потребностей

---

## Анализ производительности

### Ожидаемая нагрузка:

#### Запросы в секунду (RPS):
- **Пиковая нагрузка:** 50-100 RPS
- **Средняя нагрузка:** 10-20 RPS
- **Низкая нагрузка:** 1-5 RPS

#### Типы запросов:
1. **SELECT** (чтение) - 80-90% запросов
   - Получение локаций
   - Поиск по категориям
   - Получение меню/товаров
   
2. **INSERT** (создание) - 5-10% запросов
   - Создание объявлений
   - Регистрация пользователей
   
3. **UPDATE** (обновление) - 3-5% запросов
   - Редактирование объявлений
   - Обновление профилей
   
4. **DELETE** (удаление) - 1-2% запросов
   - Удаление объявлений
   - Админские операции

### Производительность Railway PostgreSQL:

#### Starter план:
- ✅ **Достаточно** для 10-20 RPS
- ⚠️ Может быть медленнее при пиковых нагрузках
- ✅ Подходит для старта

#### Developer план:
- ✅ **Легко справляется** с 50-100 RPS
- ✅ Хорошая производительность
- ✅ Рекомендуется для продакшена

---

## Рекомендации по схеме БД

### Таблицы:

```sql
-- Пользователи
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(50),
  password_hash VARCHAR(255) NOT NULL,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Локации
CREATE TABLE locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  category VARCHAR(50) NOT NULL CHECK (category IN ('restaurants', 'shops', 'ads')),
  lat DECIMAL(10, 8) NOT NULL,
  lng DECIMAL(11, 8) NOT NULL,
  description TEXT,
  address VARCHAR(500),
  phone VARCHAR(50),
  price VARCHAR(100),
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Изображения локаций
CREATE TABLE location_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  location_id UUID REFERENCES locations(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Меню ресторанов
CREATE TABLE menu_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id UUID REFERENCES locations(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  order_index INTEGER DEFAULT 0
);

CREATE TABLE menu_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES menu_categories(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image VARCHAR(500),
  order_index INTEGER DEFAULT 0
);

-- Товары магазинов
CREATE TABLE product_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shop_id UUID REFERENCES locations(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  order_index INTEGER DEFAULT 0
);

CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES product_categories(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image VARCHAR(500),
  stock INTEGER DEFAULT 0,
  order_index INTEGER DEFAULT 0
);

-- Индексы для производительности
CREATE INDEX idx_locations_category ON locations(category);
CREATE INDEX idx_locations_created_by ON locations(created_by);
CREATE INDEX idx_locations_coords ON locations(lat, lng);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_location_images_location ON location_images(location_id);
```

### Размер таблиц (примерно):

- **users:** ~4 MB (20,000 записей)
- **locations:** ~1.5 MB (1,500 записей)
- **location_images:** ~2 MB (10,000 изображений)
- **menu_categories:** ~0.5 MB (500 категорий)
- **menu_items:** ~5 MB (25,000 позиций)
- **product_categories:** ~0.8 MB (800 категорий)
- **products:** ~15 MB (80,000 товаров)
- **Индексы:** ~5 MB

**Итого: ~35 MB** (с индексами)

---

## Выводы и рекомендации

### ✅ **Railway PostgreSQL Starter ($5/месяц) - ДОСТАТОЧНО:**

**Плюсы:**
- ✅ 1 GB storage (в 20 раз больше необходимого)
- ✅ Достаточно для 10-20 RPS
- ✅ Низкая стоимость
- ✅ Легко масштабировать при росте

**Минусы:**
- ⚠️ Shared CPU (может быть медленнее)
- ⚠️ Ограниченные подключения

**Рекомендация:** ✅ **Начните со Starter плана**

### ✅ **Railway PostgreSQL Developer ($20/месяц) - РЕКОМЕНДУЕТСЯ:**

**Плюсы:**
- ✅ 8 GB storage (в 200 раз больше необходимого)
- ✅ Dedicated CPU (лучшая производительность)
- ✅ Легко справляется с 50-100 RPS
- ✅ Больше подключений

**Рекомендация:** ✅ **Перейдите на Developer при росте нагрузки**

---

## План масштабирования

### Этап 1: Старт (0-6 месяцев)
- **План:** Starter ($5/месяц)
- **Данные:** ~50 MB
- **Нагрузка:** 10-20 RPS
- **Статус:** ✅ Достаточно

### Этап 2: Рост (6-12 месяцев)
- **План:** Developer ($20/месяц)
- **Данные:** ~200-500 MB
- **Нагрузка:** 20-50 RPS
- **Статус:** ✅ Достаточно

### Этап 3: Масштабирование (12+ месяцев)
- **План:** Developer или Pro ($20-50/месяц)
- **Данные:** ~1-2 GB
- **Нагрузка:** 50-200 RPS
- **Статус:** ✅ Достаточно

---

## Оптимизация для снижения нагрузки

### 1. Кеширование:
- Redis для кеширования частых запросов
- Кеширование локаций на 5-10 минут
- Кеширование меню/товаров на 1-5 минут

### 2. Индексы:
- Индексы на часто используемых полях
- Составные индексы для сложных запросов
- Партиционирование больших таблиц

### 3. Connection Pooling:
- Использование пула подключений
- Ограничение максимальных подключений
- Переиспользование подключений

### 4. Запросы:
- Оптимизация SQL запросов
- Избежание N+1 проблем
- Использование JOIN вместо множественных запросов

---

## Итоговая рекомендация

### ✅ **ДА, PostgreSQL на Railway хватит!**

1. **Для старта:** Starter план ($5/месяц) - **более чем достаточно**
2. **Для продакшена:** Developer план ($20/месяц) - **рекомендуется**
3. **Объем данных:** ~50 MB (в 20 раз меньше лимита Starter)
4. **Производительность:** Легко справляется с нагрузкой города 100к

### План действий:

1. ✅ Начните со **Starter плана** ($5/месяц)
2. ✅ Мониторьте использование ресурсов
3. ✅ При росте нагрузки перейдите на **Developer** ($20/месяц)
4. ✅ Используйте **кеширование** для оптимизации
5. ✅ Настройте **индексы** для производительности

**Вывод:** Railway PostgreSQL Starter/Developer планов **более чем достаточно** для города с населением 100к! 🚀
