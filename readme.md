# Versta — Система управления заказами
## Тестовое задание
Тестовое Fullstack-приложение для создания, просмотра и удаления заказов на грузоперевозки. Реализовано в формате REST API + SPA-клиент.

---

## Стек технологий

| Уровень | Технологии |
|---------|------------|
| **Backend** | .NET 9, ASP.NET Core Web API, EF Core (In-Memory), AutoMapper, Swashbuckle (Swagger) |
| **Frontend** | React, Vite, Axios, CSS, SPA-архитектура |

---

## ✅ Предварительные требования

- .NET 9 SDK
- Node.js (с `npm`)
- Git

---

## 🚀 Запуск проекта

Проект состоит из двух независимых процессов. Запускать нужно **параллельно в двух терминалах**.

### 1. Запуск Backend
```bash
cd VerstaBack
dotnet restore
dotnet run
```

### 2. Запуск Frontend
```bash
cd VerstaFront
npm install
npm run dev
```

### 3. Открытие приложения
Открываем по ссылке http://localhost:3000/
