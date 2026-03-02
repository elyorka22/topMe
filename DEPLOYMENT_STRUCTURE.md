# Правильная структура деплоя TopMe

## Архитектура деплоя

```
┌─────────────────┐         ┌─────────────────┐
│   Frontend      │         │    Backend      │
│   (React SPA)   │ ──────► │  (Express API)  │
│                 │         │                 │
│   Vercel        │         │   Railway       │
│   $20/месяц     │         │   $20/месяц     │
└─────────────────┘         └────────┬────────┘
                                     │
                              ┌──────▼──────┐
                              │ PostgreSQL  │
                              │  Database   │
                              │   Railway   │
                              │  $5/месяц   │
                              └─────────────┘
```

## Разделение ответственности

### Frontend (Vercel)
- ✅ React приложение
- ✅ Статические файлы
- ✅ CDN по всему миру
- ✅ Автоматический HTTPS
- ✅ Оптимизация изображений

### Backend (Railway)
- ✅ Express.js API сервер
- ✅ Обработка запросов
- ✅ Бизнес-логика
- ✅ Аутентификация

### Database (Railway)
- ✅ PostgreSQL база данных
- ✅ Хранение данных
- ✅ Миграции

## Деплой Frontend на Vercel

### 1. Подготовка:
```bash
cd frontend
npm install
npm run build
```

### 2. Деплой через Vercel CLI:
```bash
npm i -g vercel
vercel login
vercel --prod
```

### 3. Деплой через GitHub:
1. Зайдите на [vercel.com](https://vercel.com)
2. Импортируйте репозиторий
3. **Root Directory:** `frontend`
4. **Framework Preset:** Vite
5. **Build Command:** `npm run build`
6. **Output Directory:** `dist`

### 4. Настройка переменных окружения:
```
VITE_API_URL=https://your-backend.railway.app
```

## Деплой Backend на Railway

### 1. Подготовка:
```bash
cd backend
npm install
```

### 2. Деплой через Railway CLI:
```bash
cd backend
railway login
railway init
railway up
```

### 3. Деплой через GitHub:
1. Зайдите на [railway.app](https://railway.app)
2. Импортируйте репозиторий
3. **Root Directory:** `backend`
4. Railway автоматически определит Node.js

### 4. Настройка переменных окружения:
```
PORT=3000 (автоматически)
FRONTEND_URL=https://your-frontend.vercel.app
DATABASE_URL=postgresql://... (из Railway PostgreSQL)
JWT_SECRET=your-secret-key
NODE_ENV=production
```

## Подключение PostgreSQL на Railway

1. В Railway Dashboard нажмите "+ New"
2. Выберите "Database" → "PostgreSQL"
3. Railway автоматически создаст БД
4. Скопируйте `DATABASE_URL` в переменные окружения бэкенда

## Настройка CORS в Backend

В `backend/server.js` уже настроен CORS:

```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}))
```

Убедитесь, что `FRONTEND_URL` указывает на ваш Vercel домен.

## Проверка работы

### Frontend:
- Откройте URL от Vercel
- Должен загрузиться React приложение

### Backend:
- Откройте `https://your-backend.railway.app/api/health`
- Должен вернуться: `{"status":"ok","message":"TopMe Backend API is running"}`

### Связь:
- Frontend делает запросы на Backend API
- CORS настроен для работы между доменами

## Итоговая стоимость

- **Vercel Pro:** $20/месяц (Frontend)
- **Railway Developer:** $20/месяц (Backend)
- **Railway PostgreSQL Starter:** $5/месяц (Database)
- **Итого:** ~$45/месяц

## Важно!

✅ **Frontend → Vercel** (оптимизация для SPA)
✅ **Backend → Railway** (API сервер)
✅ **Database → Railway** (PostgreSQL)

❌ **НЕ деплойте фронтенд на Railway!**
❌ **НЕ деплойте бэкенд на Vercel!**
