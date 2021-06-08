export interface Profile {
    displayName: string;
    userId: string;
}

export interface Odds {
    id: number;
    gameId: number;
    team1Odds: number;
    team2Odds: number;
    drawOdds: number | null;
    validUntil: string;
}

export interface GameResult {
    id: number;
    gameId: number;
    team1Goals: number;
    team2Goals: number;
}

export interface Game {
    id: number;
    team1: string;
    team2: string;
    time: string;
}

export interface Bet {
    id: number;
    userId: string;
    userDisplayName: string;
    timePlaced: string;
    choice: Choice;
    odds: number;
}

export enum Choice {
    Team1 = "Team1",
    Team2 = "Team2",
    Draw = "Draw"
}

export interface SyncResponse {
    games: Game[];
    results: GameResult[];
    bets: Bet[];
    odds: Odds[];
}