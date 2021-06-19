import { Action as Action } from "./Action";
import { ActionType as ActionType } from "./ActionType";


export class ShowGameBets implements Action {
    constructor(public gameId: number) { }
    readonly type = ActionType.ShowGameBets;
}