import { Action as Action } from "./Action";
import { ActionType as ActionType } from "./ActionType";

export class RegisterAction implements Action {
    constructor(public displayName: string) { }
    readonly type = ActionType.Register;
}

