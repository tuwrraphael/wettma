import { UpcomingGame } from "../../models/UpcomingGame";
import template from "./UpcomingGameDisplay.html";
import "./UpcomingGameDisplay.scss";
import "../OddsButton/OddsButton";
import { DisplayAttribute, OddsButton } from "../OddsButton/OddsButton";
import { abortableEventListener } from "../../abortable-event-listener";
import { Store } from "../../state/store";
import { CreateBetAction } from "../../state/requests/CreateBetAction";

let i18nFormat = new Intl.DateTimeFormat(["de-AT"], { weekday: "short", day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });

export class UpcomingGameDisplay extends HTMLElement {
    private team1Label: HTMLSpanElement;
    private team2Label: HTMLSpanElement;
    private team1Odds: OddsButton;
    private drawOdds: OddsButton;
    private team2Odds: OddsButton;
    private oddsForm: HTMLFormElement;
    private timeDisplay: HTMLSpanElement;
    private abortController: AbortController;
    private game: UpcomingGame;
    private store: Store;

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
        this.store = Store.getInstance();
    }

    connectedCallback() {
        this.abortController = new AbortController();
        abortableEventListener(this.oddsForm, "oddsclicked", (ev: CustomEvent) => {
            this.store.postAction(new CreateBetAction(this.game.odds.id, ev.detail));
        }, this.abortController.signal);
    }

    disconnectedCallback() {
        this.abortController.abort();
    }

    setGame(game: UpcomingGame) {
        this.game = game;
        this.team1Label.innerText = game.team1;
        this.team2Label.innerText = game.team2;
        this.oddsForm.style.visibility = game.odds ? "visible" : "hidden";
        if (game.odds) {
            this.team1Odds.setAttribute(DisplayAttribute, `${game.odds.team1}`);
            this.drawOdds.setAttribute(DisplayAttribute, `${game.odds.draw}`);
            this.team2Odds.setAttribute(DisplayAttribute, `${game.odds.team2}`);
            this.timeDisplay.innerText = i18nFormat.format(game.time);
        }
    }
}

customElements.define("upcoming-game-display", UpcomingGameDisplay);
