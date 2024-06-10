import { Choice } from "../../api/models";
import { Action as Action } from "./Action";
import { ActionType as ActionType } from "./ActionType";


export class PlaceComputerBetsAction implements Action {
    constructor(public request: {
        computerId: number;
        computerBets: {
            gameId: number;
            choice: Choice;
            reason: string;
        }[];
    }) { }
    readonly type = ActionType.PlaceComputerBets;
}
