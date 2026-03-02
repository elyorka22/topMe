# Исправление ошибки деплоя на Railway

## Проблема

Ошибка при деплое:
```
error during build:
[vite:terser] terser not found. Since Vite v3, terser has become an optional dependency.
```

## Решение

### 1. Изменен minify в vite.config.js

**Было:**
```javascript
minify: 'terser',
```

**Стало:**
```javascript
minify: 'esbuild', // Встроен в Vite, не требует установки
```

### 2. Обновлен preview скрипт

**Было:**
```json
"preview": "vite preview"
```

**Стало:**
```json
"preview": "vite preview --host 0.0.0.0 --port $PORT"
```

Это необходимо для Railway, чтобы сервер слушал на правильном порту.

### 3. Добавлен railway.json для frontend

Создан файл `frontend/railway.json` с правильной конфигурацией.

## Что исправлено

✅ Заменен terser на esbuild (встроен в Vite)
✅ Обновлен preview скрипт для Railway
✅ Добавлена конфигурация Railway

## Деплой

После этих изменений Railway должен успешно собрать проект.

Если деплоите из корневой папки, убедитесь, что:
1. Railway настроен на папку `frontend/`
2. Или используйте monorepo структуру

## Альтернативное решение (если нужен terser)

Если все же нужен terser, добавьте в `package.json`:

```json
{
  "devDependencies": {
    "terser": "^5.24.0"
  }
}
```

Но рекомендуется использовать esbuild - он быстрее и встроен в Vite.
