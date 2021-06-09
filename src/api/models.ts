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
}

export interface GameResult {
    team1Goals: number;
    team2Goals: number;
}

export interface Game {
    id: number;
    team1: string;
    team2: string;
    time: string;
    result: GameResult;
    myBet: MyBet;
}

export interface MyBet {
    odds: Odds;
    choice: Choice;
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