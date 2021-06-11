let serverUrl: string;

if (__ENVIRONMENT == "local") {
    serverUrl = "https://localhost:44308";
}
else if (__ENVIRONMENT == "gh-pages") {
    serverUrl = "https://wettma.azurewebsites.net";
}

export const environment = {
    serverUrl: serverUrl
};
