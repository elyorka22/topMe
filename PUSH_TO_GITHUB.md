# Инструкция по загрузке проекта на GitHub

Проект разделен на три части:
- **frontend/** - React фронтенд приложение
- **backend/** - Express.js API сервер  
- **admin-panel/** - Отдельная админ-панель

## Быстрая загрузка

Выполните следующие команды в терминале:

```bash
cd /Users/admin/topme

# 1. Инициализация Git
git init

# 2. Добавление remote репозитория
git remote add origin https://github.com/elyorka22/topMe.git

# 3. Добавление всех файлов
git add .

# 4. Создание коммита
git commit -m "Initial commit: Frontend, Backend, and Admin Panel structure"

# 5. Переименование ветки
git branch -M main

# 6. Загрузка на GitHub
git push -u origin main
```

## Если remote уже существует

Если вы получили ошибку "remote origin already exists", выполните:

```bash
git remote set-url origin https://github.com/elyorka22/topMe.git
```

## Авторизация на GitHub

### Вариант 1: Personal Access Token (рекомендуется)

1. Создайте токен на GitHub:
   - Перейдите: https://github.com/settings/tokens
   - Нажмите "Generate new token (classic)"
   - Выберите scope: `repo`
   - Скопируйте токен

2. При `git push` используйте:
   - Username: ваш_github_username
   - Password: ваш_token (не пароль!)

### Вариант 2: SSH ключ

1. Создайте SSH ключ (если нет):
```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

2. Скопируйте публичный ключ:
```bash
cat ~/.ssh/id_ed25519.pub
```

3. Добавьте ключ в GitHub:
   - Перейдите: https://github.com/settings/keys
   - Нажмите "New SSH key"
   - Вставьте ключ

4. Измените remote на SSH:
```bash
git remote set-url origin git@github.com:elyorka22/topMe.git
```

5. Загрузите:
```bash
git push -u origin main
```

## Структура проекта на GitHub

После загрузки структура будет:

```
topMe/
├── frontend/          # React фронтенд
│   ├── src/
│   ├── package.json
│   └── README.md
├── backend/           # Express.js API
│   ├── server.js
│   ├── routes/
│   ├── controllers/
│   └── README.md
├── admin-panel/       # Админ-панель
│   ├── src/
│   └── README.md
├── README.md
├── DEPLOY.md
└── ...
```

## Проверка

После загрузки проверьте:
1. Откройте https://github.com/elyorka22/topMe
2. Убедитесь, что все папки загружены
3. Проверьте, что файлы на месте

## Обновление кода в будущем

```bash
git add .
git commit -m "Описание изменений"
git push
```

## Проблемы и решения

### Ошибка: "Permission denied"
- Проверьте авторизацию (токен или SSH)
- Убедитесь, что у вас есть права на репозиторий

### Ошибка: "Repository not found"
- Проверьте URL репозитория
- Убедитесь, что репозиторий существует на GitHub

### Ошибка: "Large files"
- Убедитесь, что `node_modules` в `.gitignore`
- Не загружайте большие файлы (>100MB)
