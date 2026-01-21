# =========================
# Runtime
# =========================
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

# =========================
# Build
# =========================
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

# restore için önce csproj kopyala (cache için)
COPY ["TheatreMask.UI/TheatreMask.UI.csproj", "TheatreMask.UI/"]
RUN dotnet restore "TheatreMask.UI/TheatreMask.UI.csproj"

# sonra tüm kaynakları kopyala
COPY . .
WORKDIR "/src/TheatreMask.UI"
RUN dotnet build "TheatreMask.UI.csproj" -c Release -o /app/build

# =========================
# Publish
# =========================
FROM build AS publish
RUN dotnet publish "TheatreMask.UI.csproj" -c Release -o /app/publish /p:UseAppHost=false

# =========================
# Final
# =========================
FROM base AS final
WORKDIR /app

# Eğer uygulaman bu klasörü runtime’da bekliyorsa
RUN mkdir -p /app/StaticFiles

COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "TheatreMask.UI.dll"]
