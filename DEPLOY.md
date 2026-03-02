# Руководство по деплою проекта TopMe

## Деплой на Vercel

### Шаг 1: Подготовка
1. Убедитесь, что проект компилируется:
```bash
npm run build
```

2. Проверьте, что все зависимости установлены:
```bash
npm install
```

### Шаг 2: Деплой через Vercel CLI
1. Установите Vercel CLI:
```bash
npm i -g vercel
```

2. Войдите в Vercel:
```bash
vercel login
```

3. Деплой:
```bash
vercel
```

4. Для продакшена:
```bash
vercel --prod
```

### Шаг 3: Деплой через GitHub
1. Загрузите проект на GitHub
2. Зайдите на [vercel.com](https://vercel.com)
3. Нажмите "Add New Project"
4. Импортируйте репозиторий
5. Настройки:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
6. Нажмите "Deploy"

### Шаг 4: Настройка переменных окружения (если нужно)
В Vercel Dashboard → Settings → Environment Variables добавьте необходимые переменные.

---

## Деплой на Railway (Backend API)

### Шаг 1: Подготовка Backend
1. Убедитесь, что в папке `backend/` есть:
   - `server.js` - главный файл сервера
   - `package.json` - зависимости
   - `railway.json` - конфигурация (уже создан)

2. Настройте переменные окружения в Railway:
   - `PORT` - автоматически устанавливается Railway
   - `FRONTEND_URL` - URL вашего фронтенда на Vercel
   - `DATABASE_URL` - URL PostgreSQL базы данных
   - `JWT_SECRET` - секретный ключ для JWT
   - `NODE_ENV=production`

### Шаг 2: Деплой через Railway CLI
1. Установите Railway CLI:
```bash
npm i -g @railway/cli
```

2. Войдите:
```bash
railway login
```

3. Инициализируйте проект:
```bash
cd backend
railway init
```

4. Деплой:
```bash
railway up
```

### Шаг 3: Деплой через GitHub
1. Загрузите проект на GitHub
2. Зайдите на [railway.app](https://railway.app)
3. Нажмите "New Project"
4. Выберите "Deploy from GitHub repo"
5. Выберите ваш репозиторий
6. **Важно:** В настройках проекта укажите:
   - **Root Directory:** `backend`
   - Railway автоматически определит Node.js проект

### Шаг 4: Настройка переменных окружения
В Railway Dashboard → Variables добавьте:
```
FRONTEND_URL=https://your-frontend.vercel.app
DATABASE_URL=postgresql://... (из Railway PostgreSQL)
JWT_SECRET=your-secret-key-here
NODE_ENV=production
```

### Шаг 5: Подключение PostgreSQL
1. В Railway Dashboard нажмите "+ New"
2. Выберите "Database" → "PostgreSQL"
3. Railway автоматически создаст БД и установит `DATABASE_URL`
4. Используйте этот URL в переменных окружения

---

## Важные замечания

### Для Vercel (Frontend):
- Vercel отлично подходит для статических сайтов (SPA)
- Бесплатный план: 100GB bandwidth/месяц
- Автоматический HTTPS
- CDN по всему миру
- **Используйте для фронтенда!**

### Для Railway (Backend + Database):
- Railway идеален для бэкенда и баз данных
- Бесплатный план: $5 кредитов/месяц
- Можно добавить базу данных PostgreSQL
- Автоматический HTTPS
- **Используйте для бэкенда и БД!**

---

## Рекомендации для города с населением 100к

### Vercel (рекомендуется для фронтенда):
✅ **Достаточно для старта:**
- Бесплатный план: 100GB bandwidth/месяц
- Для 100к населения при активном использовании (10-20% пользователей в день):
  - ~10-20k активных пользователей/день
  - ~100-200k запросов/день
  - ~3-6M запросов/месяц
  - При среднем размере страницы 500KB: ~150-300GB/месяц

⚠️ **Может потребоваться:**
- Pro план ($20/месяц) для большего bandwidth
- Или оптимизация (компрессия, кеширование)

### Railway (для бэкенда/API):
✅ **Достаточно для старта:**
- Бесплатный план: $5 кредитов/месяц
- Для простого API этого может хватить
- При росте нагрузки можно перейти на платный план

### Рекомендуемая архитектура:
1. **Фронтенд на Vercel** (статика, React SPA)
2. **Бэкенд на Railway** (если понадобится API)
3. **База данных на Railway** (PostgreSQL) или Supabase

---

## Оптимизация для продакшена

1. **Включите компрессию:**
   - Vercel делает это автоматически
   - Railway: настройте в nginx или используйте middleware

2. **Кеширование:**
   - Настройте Cache-Control headers
   - Используйте CDN (Vercel делает это автоматически)

3. **Минификация:**
   - Vite делает это автоматически при `npm run build`

4. **Lazy loading:**
   - Уже реализовано в React (code splitting)

---

## Мониторинг

### Vercel:
- Analytics встроен в Pro план
- Можно добавить Google Analytics

### Railway:
- Логи доступны в Dashboard
- Можно добавить Sentry для отслеживания ошибок

---

## Резервное копирование

Важно: localStorage не сохраняется между деплоями. Для продакшена рекомендуется:
1. Использовать реальную базу данных (PostgreSQL, MongoDB)
2. Использовать Supabase или Firebase для данных
3. Настроить бэкенд API для управления данными

---

## Следующие шаги

1. Деплой на Vercel для фронтенда
2. Настройка базы данных (если нужно)
3. Настройка CI/CD через GitHub Actions
4. Мониторинг и аналитика
