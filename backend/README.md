# TopMe Backend API

Backend API для приложения TopMe.

## Установка

```bash
npm install
```

## Настройка

Скопируйте `.env.example` в `.env` и заполните переменные:

```bash
cp .env.example .env
```

## Запуск

### Разработка:
```bash
npm run dev
```

### Продакшен:
```bash
npm start
```

## API Endpoints

### Health Check
- `GET /api/health` - Проверка работы API

### Locations
- `GET /api/locations` - Получить все локации
- `GET /api/locations/:id` - Получить локацию по ID
- `POST /api/locations` - Создать локацию
- `PUT /api/locations/:id` - Обновить локацию
- `DELETE /api/locations/:id` - Удалить локацию

### Users
- `GET /api/users` - Получить всех пользователей
- `GET /api/users/:id` - Получить пользователя по ID
- `PUT /api/users/:id` - Обновить пользователя
- `DELETE /api/users/:id` - Удалить пользователя

### Auth
- `POST /api/auth/login` - Вход
- `POST /api/auth/register` - Регистрация
- `POST /api/auth/logout` - Выход
- `GET /api/auth/me` - Текущий пользователь

### Admin
- `GET /api/admin/stats` - Статистика
- `GET /api/admin/locations` - Локации для админа
- `GET /api/admin/users` - Пользователи для админа

## База данных

В продакшене используется PostgreSQL на Railway.

См. `DATABASE_ANALYSIS.md` для схемы БД.
