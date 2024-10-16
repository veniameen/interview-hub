# 🚀 InterviewHub: Платформа интервью нового поколения

Добро пожаловать в InterviewHub, передовую платформу, революционизирующую процесс проведения собеседований! 🎉

## 📋 Содержание
- [Обзор проекта](#обзор-проекта)
- [Архитектура](#архитектура)
- [Начало работы](#начало-работы)
- [Разработка](#разработка)
- [Продакшн](#продакшн)
- [Функции](#функции)
- [План развития](#план-развития)

## 🌟 Обзор проекта

InterviewHub - это комплексная система управления собеседованиями, разработанная для оптимизации процесса найма. Она состоит из двух основных компонентов:
- 🖥️ **Клиент**: приложение на Next.js 14.2 с кастомным сервером
- 🛠️ **Сервер**: бэкенд на .NET 8 с PostgreSQL и MinIO для хранения данных

## 🏗️ Архитектура

Наш проект использует микросервисную архитектуру, контейнеризированную с помощью Docker:

- **Клиент**: фронтенд на Next.js 14.2
- **Сервер**: бэкенд на .NET 8
- **База данных**: PostgreSQL 14
- **Объектное хранилище**: MinIO

## 🚀 Начало работы

### Предварительные требования

- Docker и Docker Compose
- Node.js (для локальной разработки)
- .NET SDK 8 (для локальной разработки)

### Быстрый старт

1. Клонируйте репозиторий:
   ```
   git clone https://gitverse.ru/semyon.chernomurov/bug-busteri-luchsii-po-professii-2024.git
   cd interviewhub
   ```

2. Запустите весь стек с помощью Docker Compose:
   ```
   docker-compose up -d
   ```

3. Доступ к приложению:
   - Фронтенд: http://localhost:3000
   - API бэкенда: http://localhost:5000
   - Консоль MinIO: http://localhost:9001

## 💻 Разработка

### Клиент (Next.js)

```bash
cd client
npm install
npm run dev
```

### Сервер (.NET)

```bash
cd server
dotnet restore
dotnet run
```

## 🏭 Продакшн

Для сборки и запуска проекта в продакшн-режиме:

```bash
docker-compose up --build -d
```
Эта команда собирает образы и запускает контейнеры в фоновом режиме.

Локальные ссылки
back swagger http://localhost:5000/swagger
client http://localhost:3000

## 🛠️ Функции

- [x] Аутентификация и авторизация по JWT
- [x] Управление профилем пользователя
- [x] Ролевая модель пользователя
- [x] Библиотека заданий (задачи на выполнение кода и вопросы по теории)
- [x] Создание записи о кандидате (название, описание, ссылка на резюме)
- [x] Запуск проведения интервью с видеосвязью, чатом и запуском кода для проверки
- [x] Оценка компетенций кандидата после проведения интервью
- [ ] Проведение интервью с помощью ИИ
- [ ] Создание динамических сценариев собеседования на основе анализа резюме
- [ ] Оценка софт-скиллов
- [ ] Симуляция реальных задач компании
- [ ] Режим анонимного собеседования
- [ ] ИИ-коуч для кандидатов

## 🗺️ План развития

- [ ] Реализация сценариев интервью на основе ИИ
- [ ] Разработка продвинутой аналитики для инсайтов по найму
- [ ] Интеграция с популярными ATS (системами отслеживания кандидатов)
- [ ] Мобильное приложение для проведения собеседований на ходу
- [ ] Усиление мер безопасности и соответствия требованиям (GDPR, 152-ФЗ)

## 🤝 Участие в разработке

Мы приветствуем вклад в развитие проекта! Пожалуйста, ознакомьтесь с нашим [Руководством по участию](CONTRIBUTING.md) для получения дополнительной информации.

## 📄 Лицензия

Этот проект лицензирован под MIT License - см. файл [LICENSE](LICENSE) для подробностей.

---

Создано с ❤️ командой InterviewHub
