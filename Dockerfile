FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /App

COPY server ./

RUN dotnet restore
RUN dotnet publish -c Release -o './out' 


FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /App
COPY --from=build /App/out .
ENTRYPOINT ["dotnet", "Wettma.dll", "--launch-profile", "Docker"]