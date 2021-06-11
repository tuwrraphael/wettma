import { Action as Action } from "./Action";
import { ActionType as ActionType } from "./ActionType";


export class SetResultAction implements Action {
    constructor(public gameId: number, public team1Goals: number, public team2Goals: number) { }
    readonly type = ActionType.SetResult;
}
