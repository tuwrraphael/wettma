import { AccessToken } from "./AccessToken";
import { AppRouter } from "./app-router";
import { InitializeAccessToken } from "./state/requests/InitializeAccessToken";
import { LoginPageOpened } from "./state/requests/LoginPageOpened";
import { Store } from "./state/store";
import "./styles.scss";
import "./components/AppBar/AppBar";

if ("serviceWorker" in navigator) {
    window.addEventListener("load", async () => {
        navigator.serviceWorker.register("./sw.js").then(registration => {
        }).catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
        });
    });
}

async function getAccessToken() {
    const sessionStorageKey = "wettma-webapp-token";
    let searchParameters = new URLSearchParams(window.location.hash.replace(/^#/, ""))
    let tokenFromUrl = searchParameters.get("id_token");
    if (tokenFromUrl) {
        history.replaceState(null, null, " ");
        let res = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${tokenFromUrl}`);
        let tokenInfo = await res.json();
        if (!res.ok) {
            throw new Error(`access token validation resulted in ${res.status}`);
        }
        let exp = +(new Date) + parseInt(searchParameters.get("expires_in")) * 1000;
        let token: AccessToken = {
            token: tokenFromUrl,
            exp: exp,
            scope: tokenInfo.scope,
            sub: tokenInfo.sub
        };
        sessionStorage.setItem(sessionStorageKey, JSON.stringify(token));
        if ("FederatedCredential" in window) {
            var cred = await navigator.credentials.create({
                federated: {
                    id: tokenInfo.sub,
                    provider: "https://accounts.google.com"
                }
            });
            await navigator.credentials.store(cred);
        }
        return token;
    } else {
        let sessionToken = sessionStorage.getItem(sessionStorageKey);
        if (null != sessionToken) {
            let parsed: AccessToken = JSON.parse(sessionToken);
            if (parsed.exp > +new Date()) {
                return parsed;
            }
        }
    }
    return null;
}

async function run() {
    let accessToken = await getAccessToken();
    let store = Store.getInstance();

    let appRouter = AppRouter.getInstance();

    store.subscribe(state => {
        if (state.goToLogin && appRouter.activeRoute != "login") {
            store.postAction(new LoginPageOpened());
            appRouter.router.navigate("login", "wettma - Login");
        }
        else if (state.goToRegister && appRouter.activeRoute != "register") {
            store.postAction(new LoginPageOpened());
            appRouter.router.navigate("register", "wettma - Registrieren");
        }
    })
    appRouter.router.run();
    if (accessToken) {
        store.postAction(new InitializeAccessToken(accessToken));
    }
}
run().catch(err => console.error(err));