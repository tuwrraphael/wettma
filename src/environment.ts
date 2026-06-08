let serverUrl: string;

if (__ENVIRONMENT == "local") {
    serverUrl = "http://localhost:8080";
}
else if (__ENVIRONMENT == "gh-pages") {
    serverUrl = "https://wettma.marik.ch";
}

export const environment = {
    serverUrl: serverUrl
};
