import { AccessToken } from "../AccessToken";
import { ScoreboardEntry } from "../models/ScoreboardEntry";
import { UpcomingGame } from "../models/UpcomingGame";

export enum RequestState {
    Unset,
    InProgress,
    Successful,
    Failed,
}

export interface State {
    goToLogin: boolean;
    upcomingGames: UpcomingGame[];
    accessToken: AccessToken;
    goToRegister: boolean;
    displayName: string;
    userId: string;
    register: RequestState;
    scoreboardRequest: RequestState;
    scoreboard: ScoreboardEntry[];
}
