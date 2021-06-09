import { Choice } from "../../api/models";
import { Action as Action } from "./Action";
import { ActionType as ActionType } from "./ActionType";

export class CreateBetAction implements Action {
    constructor(public oddsId: number, public choice: Choice) { }
    readonly type = ActionType.CreateBet;
}

