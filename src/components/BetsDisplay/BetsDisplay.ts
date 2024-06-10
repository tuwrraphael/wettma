import { abortableEventListener } from "../../abortable-event-listener";
import { Choice } from "../../api/models";
import { ArrayToElementRenderer } from "../../ArrayToElementRenderer";
import { CountryFIFACodes } from "../../CountryAbbreviation";
import { FinishedGame } from "../../models/FinishedGame";
import { ComputerBet, UserBet } from "../../models/GameBets";
import { UpcomingGame } from "../../models/UpcomingGame";
import { ReuseableTemplate } from "../../ReuseableTemplate";
import { ShowGameBets } from "../../state/requests/ShowGameBets";
import { RequestState, State } from "../../state/state";
import { Store } from "../../state/store";
import { ComputerBetDisplay } from "../ComputerBetDisplay/ComputerBetDisplay";
import templateContent from "./BetsDisplay.html";
import "./BetsDisplay.scss";

const crossIcon = `<span class="material-icons">close</span>`;
const correctIcon = `<span class="material-icons">done</span>`;

enum ExpandState {
    None,
    All,
    Computer
}

const template = new ReuseableTemplate(templateContent);

export class BetsDisplay extends HTMLElement {
    private abortController: AbortController;
    private store: Store;
    private game: UpcomingGame | FinishedGame;
    private betsRenderer: ArrayToElementRenderer<UserBet | ComputerBet, HTMLTableRowElement, string>;
    private computerBetsRenderer: ArrayToElementRenderer<ComputerBet, ComputerBetDisplay, number>;
    private table: HTMLTableElement;
    private loading: HTMLDivElement;
    private tableBody: HTMLTableSectionElement;
    private team1Label: HTMLTableCellElement;
    private team2Label: HTMLTableCellElement;
    private expandAll: HTMLButtonElement;
    private expandComputer: HTMLButtonElement;

    private expandState: ExpandState = ExpandState.None;
    private betsDisplayContent: HTMLDivElement;
    private computerBets: HTMLDivElement;

    constructor() {
        super();
        this.appendChild(template.get());
        this.expandAll = this.querySelector(`[data-ref="expand-all"]`);
        this.expandComputer = this.querySelector(`[data-ref="expand-computer"]`);
        this.table = this.querySelector("table");
        this.loading = this.querySelector(`[data-ref="loading"]`);
        this.store = Store.getInstance();
        this.tableBody = this.querySelector("tbody");
        this.team1Label = this.querySelector(`[data-ref="team1label"]`);
        this.team2Label = this.querySelector(`[data-ref="team2label"]`);
        this.betsDisplayContent = this.querySelector(`.bets-display__content`);
        this.computerBets = this.querySelector(`[data-ref="computer-bets"]`);
        this.betsRenderer = new ArrayToElementRenderer(this.tableBody,
            g => {
                if ("userId" in g) {
                    return g.userId;
                } else {
                    return "computer" + g.computerPlayerId;
                }
            },
            g => {
                let row = document.createElement("tr");
                let namecol = document.createElement("td");
                row.appendChild(namecol);
                row.appendChild(document.createElement("td"));
                row.appendChild(document.createElement("td"));
                row.appendChild(document.createElement("td"));
                return row;
            });
        this.computerBetsRenderer = new ArrayToElementRenderer(this.computerBets,
            g => g.computerPlayerId,
            g => new ComputerBetDisplay());
    }

    connectedCallback() {
        this.abortController = new AbortController();
        abortableEventListener(this.expandAll, "click", ev => {
            if (this.expandState == ExpandState.All) {
                this.expandState = ExpandState.None;
            } else {
                this.expandState = ExpandState.All;
                this.store.postAction(new ShowGameBets(this.game.id));
            }
            this.render();
        }, this.abortController.signal);
        abortableEventListener(this.expandComputer, "click", ev => {
            if (this.expandState == ExpandState.Computer) {
                this.expandState = ExpandState.None;
            } else {
                this.expandState = ExpandState.Computer;
                this.store.postAction(new ShowGameBets(this.game.id));
            }
            this.render();
        }, this.abortController.signal);
        this.store.subscribe(s => {
            this.updateBets(s);
        }, this.abortController.signal);
        this.render();
    }

    render() {
        this.table.style.display = this.expandState == ExpandState.All ? "" : "none";
        this.computerBets.style.display = this.expandState == ExpandState.Computer ? "" : "none";
        this.expandAll.classList.toggle("expand-button--active", this.expandState == ExpandState.All);
        this.expandComputer.classList.toggle("expand-button--active", this.expandState == ExpandState.Computer);
        this.betsDisplayContent.style.display = this.expandState == ExpandState.None ? "none" : "";
    }

    disconnectedCallback() {
        this.abortController.abort();
    }

    updateBets(s: State) {
        let bets = s.gameBets[this.game.id];
        let inProgress = bets && (bets.requestState == RequestState.InProgress
            || bets.computerBetRequestState == RequestState.InProgress);
        this.loading.style.display = inProgress ? "flex" : "none";
        if (bets) {
            this.betsRenderer.update([...(bets.bets||[]),...(bets.computerBets||[])], (e, d) => {
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
        if (bets && bets.computerBets) {
            this.computerBetsRenderer.update(bets.computerBets, (e, d) => {
                e.setComputerBet(d, this.game);
            });
        }
    }

    setGame(game: UpcomingGame | FinishedGame) {
        this.game = game;
        this.team1Label.innerText = CountryFIFACodes[game.team1].toUpperCase();
        this.team2Label.innerText = CountryFIFACodes[game.team2].toUpperCase();
        this.updateBets(this.store.state);
    }
}

customElements.define("bets-display", BetsDisplay);
