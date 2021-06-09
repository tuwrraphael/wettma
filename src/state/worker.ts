import { RequestState, State } from "./state";
import { LoginPageOpened } from "./requests/LoginPageOpened";
import { CreateBetAction } from "./requests/CreateBetAction";
import { ActionType } from "./requests/ActionType";
import { environment } from "../environment";
import { Game, Odds, Profile } from "../api/models";
import { Initialize } from "./requests/Initialize";
import { RegisterAction } from "./requests/RegisterAction";
import { AccessToken } from "../AccessToken";
import { LogoutAction } from "./requests/LogoutAction";
import { UpcomingGame } from "../models/UpcomingGame";

let state: State = {
    upcomingGames: [],
    goToLogin: false,
    goToRegister: false,
    accessToken: null,
    displayName: null,
    userId: null,
    register: RequestState.Unset,
};

let _odds: Odds[] = [];

function updateState(updateFn: (oldState: State) => State) {
    state = updateFn(state);
    self.postMessage(state);
}

type Actions = CreateBetAction
    | LoginPageOpened
    | Initialize
    | RegisterAction
    | LogoutAction;

async function syncGames() {
    let headers = new Headers();
    if (state.accessToken) {
        headers.append("Authorization", `Bearer ${state.accessToken.token}`);
    }
    let gamesRes = await fetch(`${environment.serverUrl}/games`, { headers: headers });
    let games: Game[] = await gamesRes.json();
    updateState(s => {
        return {
            ...s,
            upcomingGames: games.filter(g => !g.result).map(g => {
                let oldGame = s.upcomingGames.find(o => o.id == g.id);
                return {
                    ...oldGame,
                    id: g.id,
                    team1: g.team1,
                    team2: g.team2,
                    time: new Date(g.time),
                    myBet: g.myBet ? {
                        choice: g.myBet.choice,
                        odds: {
                            team1: g.myBet.odds.team1Odds,
                            team2: g.myBet.odds.team2Odds,
                            draw: g.myBet.odds.drawOdds
                        }
                    } : null
                };
            }).sort((a, b) => +a.time - +b.time)
        }
    });
}

async function getOdds() {
    let oddsRes = await fetch(`${environment.serverUrl}/odds`);
    _odds = await oddsRes.json();
    return _odds;
}

async function getGames() {
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
                        team2: o.team2Odds,
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

function updateUpcomingGame(id: number, update: Partial<UpcomingGame>) {
    updateState(s => {
        let upcomingGames = [...s.upcomingGames];
        let game = upcomingGames.find(g => id == g.id);
        let idx = upcomingGames.indexOf(game);
        upcomingGames[idx] = {
            ...game,
            ...update
        };
        return {
            ...s,
            upcomingGames: upcomingGames
        };
    });
}

async function createBet(msg: CreateBetAction) {
    let foundOdds = _odds.find(o => o.id == msg.oddsId);
    updateUpcomingGame(foundOdds.gameId, { saving: true, saveError: null });
    if (null == state.accessToken) {
        updateState(s => { return { ...s, goToLogin: true } });
    } else if (null == state.userId) {
        updateState(s => { return { ...s, goToRegister: true } });
    }
    try {
        let res = await fetch(`${environment.serverUrl}/bets`, {
            headers: {
                "Authorization": `Bearer ${state.accessToken.token}`,
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({ oddsId: msg.oddsId, choice: msg.choice })
        });
        if (res.status == 200) {
            updateUpcomingGame(foundOdds.gameId, {
                myBet: {
                    choice: msg.choice,
                    odds: {
                        draw: foundOdds.drawOdds,
                        team1: foundOdds.team1Odds,
                        team2: foundOdds.team2Odds
                    }
                },
                saving: false
            });
        } else if (res.status == 400) {
            let err: { type: string } = await res.json();
            if (err.type == "oddschanged" ||err.type== "oddsexpired") {
                updateUpcomingGame(foundOdds.gameId, {
                    saving: false, saveError: {
                        oddsChanged: true
                    }
                });
                await getGames();
            } else if (err.type == "gamestarted") {
                updateUpcomingGame(foundOdds.gameId, {
                    saving: false, saveError: {
                        gameStarted: true
                    }
                });
                await getGames();
            } else {
                updateUpcomingGame(foundOdds.gameId, {
                    saving: false, saveError: { unknown: true }
                });
            }
        }
    } catch (err) {
        updateUpcomingGame(foundOdds.gameId, {
            saving: false, saveError: { unknown: true }
        });
    }
}

async function initializeAccessToken(accessToken: AccessToken) {
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

async function initialize(accessToken: AccessToken) {
    if (accessToken) {
        await initializeAccessToken(accessToken);
    }
    await getGames();
}

async function register(msg: RegisterAction) {
    updateState(s => { return { ...s, register: RequestState.InProgress, goToRegister: false } });
    try {
        let res = await fetch(`${environment.serverUrl}/user/register`, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({ displayName: msg.displayName, token: state.accessToken.token })
        });
        if (res.status == 201) {
            if (await initializeAccessToken(state.accessToken)) {
                updateState(s => { return { ...s, register: RequestState.Successful } });
            }
        } else {
            updateState(s => { return { ...s, register: RequestState.Failed } });
        }
    } catch (err) {
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
}

async function handleMessage(msg: Actions) {
    switch (msg.type) {
        case ActionType.CreateBet:
            await createBet(msg);
            break;
        case ActionType.LoginPageOpened:
            updateState(s => { return { ...s, goToLogin: false } });
            break;
        case ActionType.Initialize:
            await initialize(msg.accessToken);
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