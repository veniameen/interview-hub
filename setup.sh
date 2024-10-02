#!/bin/bash

# Функция для проверки наличия команды
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Проверка наличия необходимых инструментов
if ! command_exists node; then
    echo "Error: Node.js не установлен. Пожалуйста, установите Node.js и npm."
    exit 1
fi

if ! command_exists npm; then
    echo "Error: npm не установлен. Пожалуйста, установите npm."
    exit 1
fi

if ! command_exists dotnet; then
    echo "Warning: .NET SDK не установлен. Серверная часть не будет настроена."
    SKIP_DOTNET=true
fi

# Проверка, что мы находимся в правильной директории
if [ "$(basename "$PWD")" != "interview-hub" ]; then
    echo "Error: Скрипт должен быть запущен из директории interview-hub."
    exit 1
fi

if [ ! -d "client" ]; then
    mkdir client
    echo "Папка client создана."
else
    echo "Папка client уже существует."
fi

if [ ! -d "server" ]; then
    mkdir server
    echo "Папка server создана."
else
    echo "Папка server уже существует."
fi

# Настройка клиентской части (Next.js)
echo "Настройка клиентской части с Next.js..."
cd client || exit
npx create-next-app@latest . --typescript --eslint --tailwind --app --src-dir false --import-alias "@/*" --use-npm
npm install express http-proxy-middleware

# Создание кастомного сервера
echo "Создание кастомного сервера для Next.js..."
cat > server.js << EOL
const express = require('express');
const path = require('path');
const next = require('next');
const { createProxyMiddleware } = require('http-proxy-middleware');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = process.env.PORT || 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use('/api', createProxyMiddleware({
    target: process.env.API_URL || 'http://localhost:5000',
    changeOrigin: true,
    pathRewrite: {'^/api': '/api'},
  }));

  server.post('/run-code', (req, res) => {
    res.json({ message: "Code execution endpoint" });
  });

  server.use('/_next', express.static(path.join(__dirname, '.next')));

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(\`> Ready on http://\${hostname}:\${port}\`);
  });
});
EOL

# Обновление next.config.js
echo "Обновление конфигурации Next.js..."
mkdir public
rm next.config.*
cat > next.config.js << EOL
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
}

module.exports = nextConfig
EOL

# Обновление package.json для использования кастомного сервера
npm pkg set scripts.dev="node server.js"
npm pkg set scripts.start="NODE_ENV=production node server.js"

# Создание Dockerfile для клиента
echo "Создание Dockerfile для клиентской части..."
cat > Dockerfile << EOL
FROM node:20-alpine AS deps
WORKDIR /app

COPY package*.json ./

RUN npm ci

FROM node:20-alpine AS builder
WORKDIR /app

COPY . .
COPY --from=deps /app/node_modules ./node_modules

RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]
EOL

cd ..

if [ -z "$SKIP_DOTNET" ]; then
    echo "Настройка серверной части с .NET..."
    cd server || exit
    
    # Создаем WebAPI проект непосредственно в папке server
    dotnet new webapi --no-https -o . || { echo "Ошибка при создании WebAPI проекта"; exit 1; }
    
    # Устанавливаем таймаут для команд dotnet add package
    add_package_with_retry() {
        local package=$1
        local max_attempts=3
        local attempt=1
        
        while [ $attempt -le $max_attempts ]; do
            echo "Попытка $attempt установить пакет $package..."
            if dotnet add package "$package"; then
                echo "Пакет $package успешно установлен."
                return 0
            fi
            attempt=$((attempt + 1))
            echo "Не удалось установить пакет $package. Повторная попытка через 5 секунд..."
            sleep 5
        done
        
        echo "Не удалось установить пакет $package после $max_attempts попыток. Пропускаем..."
        return 1
    }
    
    add_package_with_retry "Microsoft.AspNetCore.SignalR"
    add_package_with_retry "Minio"
    add_package_with_retry "Npgsql.EntityFrameworkCore.PostgreSQL"

    # Создание Dockerfile для сервера
    echo "Создание Dockerfile для серверной части..."
    cat > Dockerfile << EOL
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Копируем файл проекта и восстанавливаем зависимости
COPY *.csproj ./
RUN dotnet restore
# Копируем остальные файлы и собираем приложение
COPY . ./
RUN dotnet build -c Release -o /app/build
FROM build AS publish
RUN dotnet publish -c Release -o /app/publish
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=publish /app/publish .
EXPOSE 5000
ENTRYPOINT ["dotnet", "server.dll"]
EOL
    cd ..
else
    echo "Пропуск настройки серверной части (.NET не установлен)"
fi

# Создание docker-compose.yml в корневой директории
echo "Создание docker-compose.yml..."
cat > docker-compose.yml << EOL
version: '3.8'

services:
  client:
    build:
      context: ./client
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - API_URL=http://server:5000
    depends_on:
      - server

  server:
    build:
      context: ./server
      dockerfile: Dockerfile
    ports:
      - "5000:5000"
    depends_on:
      - postgres
      - minio
    environment:
      - ASPNETCORE_URLS=http://+:5000
      - ConnectionStrings__DefaultConnection=Host=postgres;Database=interviewhub;Username=ihubuser;Password=ih_strong_pass_123!
      - Minio__Endpoint=minio:9000
      - Minio__AccessKey=ihub_minio_access
      - Minio__SecretKey=ihub_minio_secret_123!

  postgres:
    image: postgres:14
    environment:
      POSTGRES_DB: interviewhub
      POSTGRES_USER: ihubuser
      POSTGRES_PASSWORD: ih_strong_pass_123!
    volumes:
      - postgres-data:/var/lib/postgresql/data

  minio:
    image: minio/minio
    ports:
      - "9000:9000"
      - "9001:9001"
    environment:
      MINIO_ROOT_USER: ihub_minio_access
      MINIO_ROOT_PASSWORD: ihub_minio_secret_123!
    volumes:
      - minio-data:/data
    command: server /data --console-address ":9001"

volumes:
  postgres-data:
  minio-data:
EOL

echo "Проект Interview Hub успешно настроен!"
echo "Примечание: Если .NET SDK не был обнаружен, серверная часть не была настроена."
echo "Для полной настройки установите .NET SDK и повторно запустите скрипт."
