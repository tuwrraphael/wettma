import { abortableEventListener } from "../../abortable-event-listener";
import { Choice } from "../../api/models";
import { ArrayToElementRenderer } from "../../ArrayToElementRenderer";
import { FinishedGame } from "../../models/FinishedGame";
import { GameBets, UserBet } from "../../models/GameBets";
import { UpcomingGame } from "../../models/UpcomingGame";
import { ShowGameBets } from "../../state/requests/ShowGameBets";
import { RequestState, State } from "../../state/state";
import { Store } from "../../state/store";
import template from "./BetsDisplay.html";
import "./BetsDisplay.scss";

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

    constructor() {
        super();
        this.innerHTML = template;
        this.expandLink = this.querySelector(`[data-ref="expand-link"]`);
        this.table = this.querySelector("table");
        this.loading = this.querySelector(`[data-ref="loading"]`);
        this.store = Store.getInstance();
        this.tableBody = this.querySelector("tbody");
        this.expandText = this.querySelector(`[data-ref="expand-text"]`);
        this.expandArrow = this.querySelector(`[data-ref="expand-arrow"]`);
        this.betsRenderer = new ArrayToElementRenderer(this.tableBody,
            g => g.userId,
            g => {
                let row = document.createElement("tr");
                let namecol = document.createElement("td");
                row.appendChild(namecol);
                let choiceCol = document.createElement("td");
                row.appendChild(choiceCol);
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
                let nameCol: HTMLTableCellElement = <HTMLTableCellElement>e.children[0];
                nameCol.innerText = d.displayName;
                let choiceCol: HTMLTableCellElement = <HTMLTableCellElement>e.children[1];
                switch (d.choice) {
                    case Choice.Team1:
                        choiceCol.innerText = this.game.team1;
                        break;
                    case Choice.Team2:
                        choiceCol.innerText = this.game.team2;
                        break;
                    case Choice.Draw:
                        choiceCol.innerText = "Unentschieden";
                }
            });
        }
    }

    setGame(game: UpcomingGame | FinishedGame) {
        this.game = game;
        this.updateBets(this.store.state);
    }
}

customElements.define("bets-display", BetsDisplay);
