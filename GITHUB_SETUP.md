# Инструкция по загрузке проекта на GitHub

## Структура проекта

```
topMe/
├── frontend/          # React фронтенд приложение
│   ├── src/
│   ├── package.json
│   └── vite.config.js
├── backend/           # Express.js API сервер
│   ├── server.js
│   ├── routes/
│   ├── controllers/
│   └── package.json
├── admin-panel/       # Отдельная админ-панель
│   └── package.json
└── README.md
```

## Команды для загрузки на GitHub

### 1. Инициализация Git (если еще не сделано):

```bash
cd /Users/admin/topme
git init
```

### 2. Добавление remote репозитория:

```bash
git remote add origin https://github.com/elyorka22/topMe.git
```

Или если уже добавлен:

```bash
git remote set-url origin https://github.com/elyorka22/topMe.git
```

### 3. Добавление всех файлов:

```bash
git add .
```

### 4. Создание коммита:

```bash
git commit -m "Initial commit: Frontend, Backend, and Admin Panel"
```

### 5. Переименование ветки в main:

```bash
git branch -M main
```

### 6. Загрузка на GitHub:

```bash
git push -u origin main
```

## Если возникнут проблемы с авторизацией:

### Вариант 1: Personal Access Token
1. Создайте токен на GitHub: Settings → Developer settings → Personal access tokens
2. Используйте токен вместо пароля:
```bash
git push -u origin main
# Username: ваш_username
# Password: ваш_token
```

### Вариант 2: SSH ключ
1. Создайте SSH ключ (если нет):
```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

2. Добавьте ключ в GitHub: Settings → SSH and GPG keys

3. Измените remote на SSH:
```bash
git remote set-url origin git@github.com:elyorka22/topMe.git
```

4. Загрузите:
```bash
git push -u origin main
```

## Проверка статуса:

```bash
git status
git remote -v
```

## Если нужно обновить код:

```bash
git add .
git commit -m "Описание изменений"
git push
```
