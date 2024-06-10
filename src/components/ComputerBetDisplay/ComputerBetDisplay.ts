import { Choice } from "../../api/models";
import { FinishedGame } from "../../models/FinishedGame";
import { ComputerBet } from "../../models/GameBets";
import { UpcomingGame } from "../../models/UpcomingGame";
import template from "./ComputerBetDisplay.html";
import "./ComputerBetDisplay.scss";

export class ComputerBetDisplay extends HTMLElement {

    private rendered = false;
    private bet: ComputerBet;
    private game: UpcomingGame | FinishedGame;
    private displayName: HTMLSpanElement;
    private team: HTMLSpanElement;
    private reason: HTMLParagraphElement;
    private result: HTMLSpanElement;
    private outcome: HTMLSpanElement;
    constructor() {
        super();
    }

    connectedCallback() {
        if (!this.rendered) {
            this.rendered = true;
            this.innerHTML = template;
            this.displayName = this.querySelector(`[data-ref="display-name"]`);
            this.reason = this.querySelector(`[data-ref="reason"]`);
            this.team = this.querySelector(`[data-ref="team"]`);
            this.result = this.querySelector(`[data-ref="result"]`);
            this.outcome = this.querySelector(`[data-ref="outcome"]`);
        }
        this.render();
    }

    setComputerBet(b: ComputerBet, g: UpcomingGame | FinishedGame) {
        this.bet = b;
        this.game = g;
        this.render();
    }

    disconnectedCallback() {

    }

    render() {
        if (!this.rendered) {
            return;
        }
        if (this.bet) {
            this.displayName.innerText = this.bet.displayName;
            this.reason.innerText = this.bet.reason;
            this.team.innerText = this.bet.choice == Choice.Team1 ? this.game.team1 : this.bet.choice == Choice.Team2 ? this.game.team2 : "Unentschieden";
            this.result.style.display = "result" in this.game ? "" : "none";
            if ("result" in this.game) {
                let correct =
                    ((this.bet.choice == Choice.Team1 && this.game.result.team1Goals > this.game.result.team2Goals) ||
                        (this.bet.choice == Choice.Team2 && this.game.result.team1Goals < this.game.result.team2Goals) ||
                        (this.bet.choice == Choice.Draw && this.game.result.team1Goals == this.game.result.team2Goals));
                this.outcome.innerText = correct ? "richtig" : "falsch";
            }

        }
    }
}

export const ComputerBetDisplayTagName = "computer-bet-display";
customElements.define(ComputerBetDisplayTagName, ComputerBetDisplay);
