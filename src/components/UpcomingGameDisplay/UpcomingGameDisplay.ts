import { UpcomingGame } from "../../models/UpcomingGame";
import templateContent from "./UpcomingGameDisplay.html";
import "./UpcomingGameDisplay.scss";
import "../OddsButton/OddsButton";
import { DisplayAttribute, OddsButton } from "../OddsButton/OddsButton";
import { abortableEventListener } from "../../abortable-event-listener";
import { Store } from "../../state/store";
import { CreateBetAction } from "../../state/requests/CreateBetAction";
import { Choice } from "../../api/models";
import "../BetsDisplay/BetsDisplay";
import { BetsDisplay } from "../BetsDisplay/BetsDisplay";
import { CountryAbbreviation } from "../../CountryAbbreviation";
import { ReuseableTemplate } from "../../ReuseableTemplate";
import "../PointsDisplay/PointsDisplay";
import { PointsAttribute, PointsDisplay } from "../PointsDisplay/PointsDisplay";

let i18nFormat = new Intl.DateTimeFormat(["de-AT"], { weekday: "short", day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });

import("./flags");

const template = new ReuseableTemplate(templateContent);


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
    private myBetContainer: HTMLDivElement;
    private myBetTeam: HTMLSpanElement;
    private myBetOdds: HTMLSpanElement;
    private saving: HTMLDivElement;
    private oddsChangedError: HTMLDivElement;
    private gameStartedError: HTMLDivElement;
    private unknownError: HTMLDivElement;
    private team2Flag: HTMLSpanElement;
    private team1Flag: HTMLSpanElement;
    private betsDisplay: BetsDisplay;
    private pointsDisplay: PointsDisplay;

    constructor() {
        super();
        this.appendChild(template.get());
        this.team1Label = this.querySelector(`[data-ref="team1"]`);
        this.team2Label = this.querySelector(`[data-ref="team2"]`);
        this.team1Odds = this.querySelector(`[data-ref="team1-odds"]`);
        this.drawOdds = this.querySelector(`[data-ref="draw-odds"]`);
        this.team2Odds = this.querySelector(`[data-ref="team2-odds"]`);
        this.oddsForm = this.querySelector(`[data-ref="odds-form"]`);
        this.timeDisplay = this.querySelector(`[data-ref="time"]`);
        this.myBetContainer = this.querySelector(`[data-ref="my-bet"]`);
        this.myBetTeam = this.querySelector(`[data-ref="my-bet-team"]`);
        this.myBetOdds = this.querySelector(`[data-ref="my-bet-odds"]`);
        this.saving = this.querySelector(`[data-ref="saving"]`);
        this.oddsChangedError = this.querySelector(`[data-ref="odds-changed-error"]`);
        this.gameStartedError = this.querySelector(`[data-ref="game-started-error"]`);
        this.unknownError = this.querySelector(`[data-ref="save-error"]`)
        this.team1Flag = this.querySelector(`[data-ref="team1-flag"]`);
        this.team2Flag = this.querySelector(`[data-ref="team2-flag"]`);
        this.pointsDisplay = this.querySelector("points-display");
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
        this.timeDisplay.innerText = i18nFormat.format(game.time);
        this.team1Flag.className = `flag-icon flag-icon-${CountryAbbreviation[game.team1]}`;
        this.team2Flag.className = `flag-icon flag-icon-${CountryAbbreviation[game.team2]}`;
        this.team1Odds.style.visibility = game.odds ? "visible" : "hidden";
        this.drawOdds.style.visibility = game.odds ? "visible" : "hidden";
        this.team2Odds.style.visibility = game.odds ? "visible" : "hidden";
        if (game.odds) {
            if (game.odds.team1) {
                this.team1Odds.style.display = "";
                this.team1Odds.setAttribute(DisplayAttribute, `${game.odds.team1.toFixed(2)}`);
            } else {
                this.team1Odds.style.display = "none";
            }
            if (game.odds.team2) {
                this.team2Odds.style.display = "";
                this.team2Odds.setAttribute(DisplayAttribute, `${game.odds.team2.toFixed(2)}`);
            } else {
                this.team2Odds.style.display = "none";
            }
            if (game.odds.draw) {
                this.drawOdds.style.display = "";
                this.drawOdds.setAttribute(DisplayAttribute, `${game.odds.draw.toFixed(2)}`);
            } else {
                this.drawOdds.style.display = "none";
            }
        }
        this.myBetContainer.style.display = game.myBet && !game.saving ? "flex" : "none";
        if (game.myBet) {
            this.myBetTeam.innerText = game.myBet.choice == Choice.Team1 ? game.team1 : game.myBet.choice == Choice.Team2 ? game.team2 : "Unentschieden";
            this.myBetOdds.innerText = `${game.myBet.choice == Choice.Team1 ? game.myBet.odds.team1 : game.myBet.choice == Choice.Team2 ? game.myBet.odds.team2 : game.myBet.odds.draw}`;

        }
        this.saving.style.display = game.saving ? "flex" : "none";
        this.oddsChangedError.style.display = game.saveError?.oddsChanged ? "flex" : "none";
        this.gameStartedError.style.display = game.saveError?.gameStarted ? "flex" : "none";
        this.unknownError.style.display = game.saveError?.unknown ? "flex" : "none";
        if (+game.time < +new Date()) {
            if (!this.betsDisplay) {
                this.betsDisplay = new BetsDisplay();
                this.appendChild(this.betsDisplay);
            }
        } else if (this.betsDisplay) {
            this.removeChild(this.betsDisplay);
            this.betsDisplay = null;
        }
        if (this.betsDisplay) {
            this.betsDisplay.setGame(game);
        }
        this.pointsDisplay.setAttribute(PointsAttribute, `${game.points || 0}`);
    }
}

customElements.define("upcoming-game-display", UpcomingGameDisplay);
