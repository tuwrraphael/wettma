import { abortableEventListener } from "../../abortable-event-listener";
import { Choice } from "../../api/models";
import { ArrayToElementRenderer } from "../../ArrayToElementRenderer";
import { CountryAbbreviation } from "../../CountryAbbreviation";
import { FinishedGame } from "../../models/FinishedGame";
import { GameBets, UserBet } from "../../models/GameBets";
import { UpcomingGame } from "../../models/UpcomingGame";
import { ReuseableTemplate } from "../../ReuseableTemplate";
import { ShowGameBets } from "../../state/requests/ShowGameBets";
import { RequestState, State } from "../../state/state";
import { Store } from "../../state/store";
import templateContent from "./BetsDisplay.html";
import "./BetsDisplay.scss";

const crossIcon = `<span class="material-icons">close</span>`;
const correctIcon = `<span class="material-icons">done</span>`;

const template = new ReuseableTemplate(templateContent);

export class BetsDisplay extends HTMLElement {
    private expandLink: HTMLAnchorElement;
    private abortController: AbortController;
    private store: Store;
    private showBets: boolean;
    private game: UpcomingGame | FinishedGame;
    private betsRenderer: ArrayToElementRenderer<UserBet, HTMLTableRowElement, string>;
    private table: HTMLTableElement;
    private loading: HTMLDivElement;
    private tableBody: HTMLTableSectionElement;
    private expandText: HTMLSpanElement;
    private expandArrow: HTMLSpanElement;
    private team1Label: HTMLTableCellElement;
    private team2Label: HTMLTableCellElement;

    constructor() {
        super();
        this.appendChild(template.get());
        this.expandLink = this.querySelector(`[data-ref="expand-link"]`);
        this.table = this.querySelector("table");
        this.loading = this.querySelector(`[data-ref="loading"]`);
        this.store = Store.getInstance();
        this.tableBody = this.querySelector("tbody");
        this.expandText = this.querySelector(`[data-ref="expand-text"]`);
        this.expandArrow = this.querySelector(`[data-ref="expand-arrow"]`);
        this.team1Label = this.querySelector(`[data-ref="team1label"]`);
        this.team2Label = this.querySelector(`[data-ref="team2label"]`);
        this.betsRenderer = new ArrayToElementRenderer(this.tableBody,
            g => g.userId,
            g => {
                let row = document.createElement("tr");
                let namecol = document.createElement("td");
                row.appendChild(namecol);
                row.appendChild(document.createElement("td"));
                row.appendChild(document.createElement("td"));
                row.appendChild(document.createElement("td"));
                return row;
            });
    }

    connectedCallback() {
        this.abortController = new AbortController();
        abortableEventListener(this.expandLink, "click", ev => {
            ev.preventDefault();
            this.showBets = !this.showBets;
            this.table.style.display = this.showBets ? "" : "none";
            this.expandArrow.classList.toggle("rotate", this.showBets);
            if (this.showBets) {
                this.store.postAction(new ShowGameBets(this.game.id));
            }
            this.expandText.innerText = !this.showBets ? "Tipps von allen anzeigen" : "Tipps von allen verbergen";
        }, this.abortController.signal);
        this.store.subscribe(s => {
            this.updateBets(s);
        }, this.abortController.signal);
    }

    disconnectedCallback() {
        this.abortController.abort();
    }

    updateBets(s: State) {
        let bets = s.gameBets[this.game.id];
        this.loading.style.display = bets && bets.requestState == RequestState.InProgress ? "flex" : "none";
        if (bets && bets.bets) {
            this.betsRenderer.update(bets.bets, (e, d) => {
                let correct = false;
                if ("result" in this.game) {
                    correct =
                        ((d.choice == Choice.Team1 && this.game.result.team1Goals > this.game.result.team2Goals) ||
                            (d.choice == Choice.Team2 && this.game.result.team1Goals < this.game.result.team2Goals) ||
                            (d.choice == Choice.Draw && this.game.result.team1Goals == this.game.result.team2Goals));
                }
                let icon = correct ? correctIcon : crossIcon;
                let nameCol: HTMLTableCellElement = <HTMLTableCellElement>e.children[0];
                nameCol.innerText = d.displayName;
                (<HTMLTableCellElement>e.children[1]).innerHTML = d.choice == Choice.Team1 ? icon : "";
                (<HTMLTableCellElement>e.children[2]).innerHTML = d.choice == Choice.Draw ? icon : "";
                (<HTMLTableCellElement>e.children[3]).innerHTML = d.choice == Choice.Team2 ? icon : "";
            });
        }
    }

    setGame(game: UpcomingGame | FinishedGame) {
        this.game = game;
        this.team1Label.innerText = CountryAbbreviation[game.team1].toUpperCase();
        this.team2Label.innerText = CountryAbbreviation[game.team2].toUpperCase();
        this.updateBets(this.store.state);
    }
}

customElements.define("bets-display", BetsDisplay);
