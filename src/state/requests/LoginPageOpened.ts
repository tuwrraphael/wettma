import { Action as Action } from "./Action";
import { ActionType as ActionType } from "./ActionType";


export class LoginPageOpened implements Action {
    constructor() { }
    readonly type = ActionType.LoginPageOpened;
}
