import { Choice } from "../api/models";


export interface FinishedGame {
    id: number;
    team1: string;
    team2: string;
    time: Date;
    myBet: {
        odds: {
            team1: number;
            team2: number;
            draw: number;
        };
        choice: Choice;
    };
    result: {
        team1Goals: number;
        team2Goals: number;
    };
}
