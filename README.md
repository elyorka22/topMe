# TopMe - Универсальный сервис доставки еды, продуктов и объявлений

Веб-приложение для города с картой локаций, категориями (рестораны, магазины, объявления), системой аутентификации и админ-панелью.

## Структура проекта

```
topMe/
├── frontend/          # React фронтенд приложение
├── backend/           # Express.js API сервер
├── admin-panel/       # Отдельная админ-панель (опционально)
├── DEPLOY.md          # Инструкции по деплою
├── ARCHITECTURE_COMPARISON.md  # Сравнение архитектур
└── DATABASE_ANALYSIS.md        # Анализ БД
```

## Технологии

### Frontend:
- React 18
- Vite
- Leaflet (карты)
- Material Symbols (иконки)

### Backend:
- Node.js
- Express.js
- PostgreSQL (Railway)

### Admin Panel:
- React 18
- Vite
- React Router

## Быстрый старт

### Frontend:
```bash
cd frontend
npm install
npm run dev
```

### Backend:
```bash
cd backend
npm install
cp .env.example .env
# Заполните .env файл
npm run dev
```

### Admin Panel:
```bash
cd admin-panel
npm install
npm run dev
```

## Деплой

См. [DEPLOY.md](./DEPLOY.md) для инструкций по деплою на Vercel и Railway.

## Особенности

- 🗺️ Интерактивная карта с геолокацией
- 🍽️ Категории: рестораны, магазины, объявления
- 🔐 Система аутентификации
- 👤 Управление пользователями
- 🛒 Корзина покупок
- 📸 Галерея изображений для объявлений
- 👨‍💼 Админ-панель
- 📊 Статистика сайта
- 🇺🇿 Интерфейс на узбекском языке

## Лицензия

MIT