docker container stop wettma
docker container rm wettma
docker build --progress=plain --file Dockerfile -t wettma .\
&& docker run \
        --user=$(id -u):$(id -g) \
        -v ./themnt/App_Data:/App/wwwroot/App_Data \
        -v ./themnt/appsettings.json:/App/appsettings.json \
        -p 8080:8080 \
        --name wettma \
        -e ASPNETCORE_URLS=http://+:8080 \
        -d --restart always wettma