import { Choice } from "../api/models";
import { RequestState } from "../state/state";

export interface UserBet {
    displayName: string;
    choice: Choice;
    userId:string;
}

export interface GameBets {
    bets: UserBet[];
    requestState: RequestState;
}
