import { UpcomingGame } from "../../models/UpcomingGame";
import template from "./UpcomingGameDisplay.html";
import "./UpcomingGameDisplay.scss";
import "../OddsRadioButton/OddsRadioButton";
import { DisplayAttribute, IdPrefixAttribute, OddsRadioButton } from "../OddsRadioButton/OddsRadioButton";

let i18nFormat = new Intl.DateTimeFormat(["de-AT"], { weekday: "short", day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });

export class UpcomingGameDisplay extends HTMLElement {
    private team1Label: HTMLSpanElement;
    private team2Label: HTMLSpanElement;
    private team1Odds: OddsRadioButton;
    private drawOdds: OddsRadioButton;
    private team2Odds: OddsRadioButton;
    private oddsForm: HTMLFormElement;
    private timeDisplay: HTMLSpanElement;

    constructor() {
        super();
        this.innerHTML = template;
        this.team1Label = this.querySelector(`[data-ref="team1"]`);
        this.team2Label = this.querySelector(`[data-ref="team2"]`);
        this.team1Odds = this.querySelector(`[data-ref="team1-odds"]`);
        this.drawOdds = this.querySelector(`[data-ref="draw-odds"]`);
        this.team2Odds = this.querySelector(`[data-ref="team2-odds"]`);
        this.oddsForm = this.querySelector(`[data-ref="odds-form"]`);
        this.timeDisplay = this.querySelector(`[data-ref="time"]`);
    }

    connectedCallback() {

    }

    disconnectedCallback() {

    }

    setGame(game: UpcomingGame) {
        this.team1Label.innerText = game.team1;
        this.team2Label.innerText = game.team2;
        for (let btn of [this.team1Odds, this.drawOdds, this.team2Odds]) {
            btn.setAttribute(IdPrefixAttribute, `game${game.id}`);
        }
        this.oddsForm.style.visibility = game.odds ? "visible" : "hidden";
        this.team1Odds.setAttribute(DisplayAttribute, `${game.odds.team1}`);
        this.drawOdds.setAttribute(DisplayAttribute, `${game.odds.draw}`);
        this.team2Odds.setAttribute(DisplayAttribute, `${game.odds.team2}`);
        this.timeDisplay.innerText = i18nFormat.format(game.time);
    }
}

customElements.define("upcoming-game-display", UpcomingGameDisplay);
