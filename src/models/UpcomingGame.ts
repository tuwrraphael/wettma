import { Choice } from "../api/models";

export interface UpcomingGame {
    id: number;
    team1: string;
    team2: string;
    odds: {
        id: number;
        team1: number;
        team2: number;
        draw: number;
    }
    time: Date;
    myBet: {
        odds: {
            team1: number;
            team2: number;
            draw: number;
        };
        choice: Choice;
    },
    saving: boolean
    saveError?: {
        oddsChanged?: boolean,
        gameStarted?: boolean,
        unknown?: boolean
    }
}

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
    },
    result: {
        team1Goals: number,
        team2Goals: number
    }
}
