if [ -z "$SKIP_DOTNET" ]; then
    echo "Настройка серверной части с .NET..."
    cd server || exit
    
    # Создаем решение
    dotnet new sln -n InterviewHub || { echo "Ошибка при создании решения"; exit 1; }

    # Создаем проекты
    for project in Domain Application Persistence API; do
        dotnet new classlib -n "InterviewHub.$project" || { echo "Ошибка при создании проекта InterviewHub.$project"; exit 1; }
        dotnet sln add "InterviewHub.$project/InterviewHub.$project.csproj" || { echo "Ошибка при добавлении проекта InterviewHub.$project в решение"; exit 1; }
    done

    # Устанавливаем WebAPI проект
    dotnet new webapi --no-https -n "InterviewHub.API" || { echo "Ошибка при создании WebAPI проекта"; exit 1; }
    dotnet sln add "InterviewHub.API/InterviewHub.API.csproj" || { echo "Ошибка при добавлении проекта InterviewHub.API в решение"; exit 1; }

    
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