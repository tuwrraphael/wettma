import { Action as Action } from "./Action";
import { ActionType as ActionType } from "./ActionType";


export class LoadParticipantsAction implements Action {
    constructor() { }
    readonly type = ActionType.LoadParticipants;
}
