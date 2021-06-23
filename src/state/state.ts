import { AccessToken } from "../AccessToken";
import { ScoreboardEntry } from "../models/ScoreboardEntry";
import { UpcomingGame } from "../models/UpcomingGame";
import { FinishedGame } from "../models/FinishedGame";
import { GameBets } from "../models/GameBets";

export enum RequestState {
    Unset,
    InProgress,
    Successful,
    Failed
}

export interface State {
    goToLogin: boolean;
    upcomingGames: UpcomingGame[];
    finishedGames: FinishedGame[];
    accessToken: AccessToken;
    goToRegister: boolean;
    displayName: string;
    userId: string;
    register: RequestState;
    scoreboardRequest: RequestState;
    scoreboard: ScoreboardEntry[];
    setResultRequest: RequestState;
    gameBets: { [gameId: number]: GameBets },
    hasMoreFinishedGames : boolean
}
