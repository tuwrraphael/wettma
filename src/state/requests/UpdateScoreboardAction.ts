import { Action as Action } from "./Action";
import { ActionType as ActionType } from "./ActionType";


export class UpdateScoreboardAction implements Action {
    constructor() { }
    readonly type = ActionType.UpdateScoreboard;
}
