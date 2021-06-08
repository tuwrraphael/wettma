import { Action as Action } from "./Action";
import { ActionType as ActionType } from "./ActionType";


export class SyncAction implements Action {
    constructor() { }
    readonly type = ActionType.Sync;
}
