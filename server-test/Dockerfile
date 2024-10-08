FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["InterviewHub.API/InterviewHub.API.csproj", "InterviewHub.API/"]
COPY ["InterviewHub.Application/InterviewHub.Application.csproj", "InterviewHub.Application/"]
COPY ["InterviewHub.Domain/InterviewHub.Domain.csproj", "InterviewHub.Domain/"]
COPY ["InterviewHub.Persistence/InterviewHub.Persistence.csproj", "InterviewHub.Persistence/"]
RUN dotnet restore "InterviewHub.API/InterviewHub.API.csproj"
COPY . .
WORKDIR "/src/InterviewHub.API"
RUN dotnet build "InterviewHub.API.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "InterviewHub.API.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "InterviewHub.API.dll"]
