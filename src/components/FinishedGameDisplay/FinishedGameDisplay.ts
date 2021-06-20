import { UpcomingGame } from "../../models/UpcomingGame";
import { FinishedGame } from "../../models/FinishedGame";
import templateContent from "./FinishedGameDisplay.html";
import "./FinishedGameDisplay.scss";
import "../OddsButton/OddsButton";
import { abortableEventListener } from "../../abortable-event-listener";
import { Store } from "../../state/store";
import { CreateBetAction } from "../../state/requests/CreateBetAction";
import { Choice } from "../../api/models";
import { BetsDisplay } from "../BetsDisplay/BetsDisplay";
import { CountryAbbreviation } from "../../CountryAbbreviation";
import { ReuseableTemplate } from "../../ReuseableTemplate";

let i18nFormat = new Intl.DateTimeFormat(["de-AT"], { weekday: "short", day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });

const template = new ReuseableTemplate(templateContent);

export class FinishedGameDisplay extends HTMLElement {
    private team1Label: HTMLSpanElement;
    private team2Label: HTMLSpanElement;
    private timeDisplay: HTMLSpanElement;
    private abortController: AbortController;
    private game: FinishedGame;
    private store: Store;
    private team2Flag: HTMLSpanElement;
    private team1Flag: HTMLSpanElement;
    private goals1: HTMLHeadingElement;
    private goals2: HTMLHeadingElement;
    private correctBet: HTMLDivElement;
    private wrongBet: HTMLDivElement;
    private betsDisplay: BetsDisplay;

    constructor() {
        super();
        this.appendChild(template.get());
        this.team1Label = this.querySelector(`[data-ref="team1"]`);
        this.team2Label = this.querySelector(`[data-ref="team2"]`);
        this.timeDisplay = this.querySelector(`[data-ref="time"]`);
        this.correctBet = this.querySelector(`[data-ref="correct-bet"]`);
        this.wrongBet = this.querySelector(`[data-ref="wrong-bet"]`);
        this.team1Flag = this.querySelector(`[data-ref="team1-flag"]`);
        this.team2Flag = this.querySelector(`[data-ref="team2-flag"]`);
        this.goals1 = this.querySelector(`[data-ref="goals1"]`);
        this.goals2 = this.querySelector(`[data-ref="goals2"]`);
        this.betsDisplay = this.querySelector(`[data-ref="bets-display"]`);
        this.store = Store.getInstance();
    }

    connectedCallback() {
        this.abortController = new AbortController();
    }

    disconnectedCallback() {
        this.abortController.abort();
    }

    setGame(game: FinishedGame) {
        this.game = game;
        this.team1Label.innerText = game.team1;
        this.team2Label.innerText = game.team2;
        this.timeDisplay.innerText = i18nFormat.format(game.time);
        this.team1Flag.className = `flag-icon flag-icon-${CountryAbbreviation[game.team1]}`;
        this.team2Flag.className = `flag-icon flag-icon-${CountryAbbreviation[game.team2]}`;
        this.goals1.innerText = game.result.team1Goals + "";
        this.goals2.innerText = game.result.team2Goals + "";

        let correct = this.game.myBet &&
            ((this.game.myBet.choice == Choice.Team1 && this.game.result.team1Goals > this.game.result.team2Goals) ||
                (this.game.myBet.choice == Choice.Team2 && this.game.result.team1Goals < this.game.result.team2Goals) ||
                (this.game.myBet.choice == Choice.Draw && this.game.result.team1Goals == this.game.result.team2Goals));
        let wrong = this.game.myBet && !correct;

        this.correctBet.style.display = correct ? "flex" : "none";
        this.wrongBet.style.display = wrong ? "flex" : "none";

        if (this.game.myBet) {
            for (let e of this.querySelectorAll(`[data-ref="my-bet-team"]`)) {
                let el: HTMLSpanElement = <HTMLSpanElement>e;
                el.innerText = game.myBet.choice == Choice.Team1 ? game.team1 : game.myBet.choice == Choice.Team2 ? game.team2 : "Unentschieden"
            }
            for (let e of this.querySelectorAll(`[data-ref="my-bet-odds"]`)) {
                let el: HTMLSpanElement = <HTMLSpanElement>e;
                el.innerText = `${game.myBet.choice == Choice.Team1 ? game.myBet.odds.team1 : game.myBet.choice == Choice.Team2 ? game.myBet.odds.team2 : game.myBet.odds.draw}`;
            }
        }
        this.betsDisplay.setGame(game);
    }
}

customElements.define("finished-game-display", FinishedGameDisplay);
