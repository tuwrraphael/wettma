import { Action as Action } from "./Action";
import { ActionType as ActionType } from "./ActionType";


export class LogoutAction implements Action {
    constructor() { }
    readonly type = ActionType.Logout;
}
