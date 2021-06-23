import { AccessToken } from "../../AccessToken";
import { Action as Action } from "./Action";
import { ActionType as ActionType } from "./ActionType";


export class Initialize implements Action {
    constructor(public accessToken: AccessToken, public isStandalone: boolean) { }
    readonly type = ActionType.Initialize;
}
