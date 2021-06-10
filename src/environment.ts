let serverUrl: string;

if (__ENVIRONMENT == "local") {
    serverUrl = "https://wettma.azurewebsites.net";
}
else if (__ENVIRONMENT == "gh-pages") {
    serverUrl = "https://wettma.azurewebsites.net";
}

export const environment = {
    serverUrl: serverUrl
};
