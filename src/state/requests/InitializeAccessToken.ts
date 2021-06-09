import { AccessToken } from "../../AccessToken";
import { Action as Action } from "./Action";
import { ActionType as ActionType } from "./ActionType";


export class InitializeAccessToken implements Action {
    constructor(public accessToken: AccessToken) { }
    readonly type = ActionType.InitializeAccessToken;
}
