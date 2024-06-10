import { Choice } from "../api/models";
import { RequestState } from "../state/state";

export interface UserBet {
    displayName: string;
    choice: Choice;
    userId:string;
}

export interface ComputerBet {
    computerPlayerId: number;
    displayName: string;
    choice: Choice;
    reason: string;
}

export interface GameBets {
    bets: UserBet[];
    computerBets: ComputerBet[];
    requestState: RequestState;
    computerBetRequestState: RequestState;
}
