# Быстрый старт - Загрузка на GitHub

## ✅ Структура проекта готова!

Проект разделен на:
- **frontend/** - React приложение
- **backend/** - Express.js API
- **admin-panel/** - Админ-панель

## 🚀 Команды для загрузки

Скопируйте и выполните в терминале:

```bash
cd /Users/admin/topme

# 1. Инициализация Git
git init

# 2. Добавление remote
git remote add origin https://github.com/elyorka22/topMe.git

# 3. Добавление файлов
git add .

# 4. Коммит
git commit -m "Initial commit: Frontend, Backend, and Admin Panel"

# 5. Ветка main
git branch -M main

# 6. Загрузка
git push -u origin main
```

## 🔐 Авторизация

При `git push` GitHub попросит авторизацию:

### Используйте Personal Access Token:
1. Создайте токен: https://github.com/settings/tokens
2. Выберите scope: `repo`
3. Используйте токен как пароль (не ваш GitHub пароль!)

## 📁 Что будет загружено

```
topMe/
├── frontend/          ✅ React фронтенд
├── backend/           ✅ Express.js API
├── admin-panel/       ✅ Админ-панель
├── README.md          ✅ Главный README
├── DEPLOY.md          ✅ Инструкции по деплою
└── ...                ✅ Документация
```

## ⚠️ Важно

- `node_modules` НЕ загрузится (в .gitignore)
- `.env` файлы НЕ загрузятся (безопасность)
- Все исходные коды загрузятся

## 📖 Подробная инструкция

См. [PUSH_TO_GITHUB.md](./PUSH_TO_GITHUB.md) для детальной инструкции.
