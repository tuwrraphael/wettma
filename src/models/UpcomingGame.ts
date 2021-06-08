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
}