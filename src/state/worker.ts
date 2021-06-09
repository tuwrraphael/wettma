import { RequestState, State } from "./state";
import { SyncAction as SyncAction } from "./requests/SyncAction";
import { LoginPageOpened } from "./requests/LoginPageOpened";
import { CreateBetAction } from "./requests/CreateBetAction";
import { ActionType } from "./requests/ActionType";
import { environment } from "../environment";
import { Game, Odds, Profile } from "../api/models";
import { InitializeAccessToken } from "./requests/InitializeAccessToken";
import { RegisterAction } from "./requests/RegisterAction";
import { AccessToken } from "../AccessToken";
import { LogoutAction } from "./requests/LogoutAction";



let state: State = {
    upcomingGames: [],
    goToLogin: false,
    goToRegister: false,
    accessToken: null,
    displayName: null,
    userId: null,
    register: RequestState.Unset,
};

function updateState(updateFn: (oldState: State) => State) {
    state = updateFn(state);
    self.postMessage(state);
}

type Actions = SyncAction
    | CreateBetAction
    | LoginPageOpened
    | InitializeAccessToken
    | RegisterAction
    | LogoutAction;

async function syncGames() {
    let gamesRes = await fetch(`${environment.serverUrl}/games`);
    let games: Game[] = await gamesRes.json();
    updateState(s => {
        return {
            ...s,
            upcomingGames: games.filter(g => !g.result).map(g => {
                let oldGame = s.upcomingGames.find(o => o.id == g.id);
                return {
                    id: g.id,
                    team1: g.team1,
                    team2: g.team2,
                    time: new Date(g.time),
                    odds: oldGame?.odds
                };
            }).sort((a, b) => +a.time - +b.time)
        }
    });
}

async function getOdds() {
    let oddsRes = await fetch(`${environment.serverUrl}/odds`);
    let odds: Odds[] = await oddsRes.json();
    return odds;
}

async function sync(msg: SyncAction) {
    let syncGamesTask = syncGames();
    let getOddsTask = getOdds();
    let [_, odds] = await Promise.all([syncGamesTask, getOddsTask]);
    updateState(s => {
        let upcomingGames = [...s.upcomingGames];
        for (let o of odds) {
            let game = upcomingGames.find(g => o.gameId == g.id);
            if (game) {
                let idx = upcomingGames.indexOf(game);
                upcomingGames[idx] = {
                    ...game, odds: {
                        draw: o.drawOdds,
                        id: o.id,
                        team1: o.team1Odds,
                        team2: o.team2Odds
                    }
                };
            }
        }
        return {
            ...s,
            upcomingGames: upcomingGames
        }
    });
}

async function createBet(msg: CreateBetAction) {
    if (null == state.accessToken) {
        updateState(s => { return { ...s, goToLogin: true } });
    } else if (null == state.userId) {
        updateState(s => { return { ...s, goToRegister: true } });
    }
}

async function initializeAccesstoken(accessToken: AccessToken) {
    let res = await fetch(`${environment.serverUrl}/user/profile`, {
        headers: {
            "Authorization": `Bearer ${accessToken.token}`
        }
    });
    if (res.status == 401) {
        updateState(s => {
            return {
                ...s,
                goToRegister: true,
                accessToken: accessToken
            };
        });
    } else if (res.status == 200) {
        let userProfile: Profile = await res.json();
        updateState(s => {
            return {
                ...s,
                accessToken: accessToken,
                userId: userProfile.userId,
                displayName: userProfile.displayName
            };
        });
        return true;
    }
    return false;
}

async function register(msg: RegisterAction) {
    updateState(s => { return { ...s, register: RequestState.InProgress } });
    try {
        let res = await fetch(`${environment.serverUrl}/user/register`, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({ displayName: msg.displayName, token: state.accessToken.token })
        });
        if (res.status == 201) {
            if (await initializeAccesstoken(state.accessToken)) {
                updateState(s => { return { ...s, register: RequestState.Successful } });
            }
        } else {
            updateState(s => { return { ...s, register: RequestState.Failed } });
        }
    } catch {
        updateState(s => { return { ...s, register: RequestState.Failed } });
    }
}

async function logout(smg: LogoutAction) {
    if ("credentials" in navigator && "preventSilentAccess" in navigator.credentials) {
        navigator.credentials.preventSilentAccess();
    }
    updateState(s => {
        return {
            ...s,
            accessToken: null,
            displayName: null,
            userId: null
        }
    });
    sessionStorage.clear();
}

async function handleMessage(msg: Actions) {
    switch (msg.type) {
        case ActionType.Sync:
            await sync(msg);
            break;
        case ActionType.CreateBet:
            await createBet(msg);
            break;
        case ActionType.LoginPageOpened:
            updateState(s => { return { ...s, goToLogin: false } });
            break;
        case ActionType.InitializeAccessToken:
            await initializeAccesstoken(msg.accessToken);
            break;
        case ActionType.Register:
            await register(msg);
            break;
        case ActionType.Logout:
            await logout(msg);
    }
}

self.addEventListener("message", ev => {
    let msg: Actions = ev.data;
    handleMessage(msg).catch(err => console.error(err));
});