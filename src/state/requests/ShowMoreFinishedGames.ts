import { Action as Action } from "./Action";
import { ActionType as ActionType } from "./ActionType";


export class ShowMoreFinishedGamesAction implements Action {
    constructor() { }
    readonly type = ActionType.ShowMoreFinishedGames;
}
