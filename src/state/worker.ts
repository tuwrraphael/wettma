import { State } from "./state";
import { SyncAction as SyncAction } from "./requests/SyncAction";
import { ActionType } from "./requests/ActionType";
import { environment } from "../environment";
import { SyncResponse } from "../api/models";

let state: State = {
    upcomingGames: []
};

function updateState(updateFn: (oldState: State) => State) {
    state = updateFn(state);
    self.postMessage(state);
}

type Actions = SyncAction;

async function sync(msg: SyncAction) {
    let res = await fetch(`${environment.serverUrl}/sync`);
    let content: SyncResponse = await res.json();
    updateState(s => {
        return {
            ...s,
            upcomingGames: content.games.map(g => {
                let odds = content.odds.find(o => o.gameId == g.id);
                return {
                    id: g.id,
                    odds: odds ? {
                        draw: odds.drawOdds,
                        id: odds.id,
                        team1: odds.team1Odds,
                        team2: odds.team2Odds
                    } : null,
                    team1: g.team1,
                    team2: g.team2,
                    time: new Date(g.time)
                };
            }).sort((a, b) => +a.time - +b.time)
        }
    });
}

async function handleMessage(msg: Actions) {
    switch (msg.type) {
        case ActionType.Sync:
            await sync(msg);
            break;
    }
}

self.addEventListener("message", ev => {
    let msg: Actions = ev.data;
    handleMessage(msg).catch(err => console.error(err));
});