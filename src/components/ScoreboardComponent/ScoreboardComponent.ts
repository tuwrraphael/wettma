import { abortableEventListener } from "../../abortable-event-listener";
import { AppRouter } from "../../app-router";
import { ArrayToElementRenderer } from "../../ArrayToElementRenderer";
import { ScoreboardEntry } from "../../models/ScoreboardEntry";
import { UpdateScoreboardAction } from "../../state/requests/UpdateScoreboardAction";
import { RequestState } from "../../state/state";
import { Store } from "../../state/store";
import template from "./ScoreboardComponent.html";
import "./ScoreboardComponent.scss";

export class ScoreboardComponent extends HTMLElement {
    private store: Store;
    private abortController: AbortController;
    private router: AppRouter;
    private scoreboardRenderer: ArrayToElementRenderer<ScoreboardEntry, HTMLTableRowElement, string>;
    private tableBody: HTMLTableSectionElement;
    private scoreboardLoadError: HTMLDivElement;

    constructor() {
        super();
        this.innerHTML = template;
        this.store = Store.getInstance();
        this.router = AppRouter.getInstance();
        this.tableBody = this.querySelector("tbody");
        this.scoreboardLoadError = this.querySelector("#scoreboard-load-error");
        this.scoreboardRenderer = new ArrayToElementRenderer(this.tableBody,
            g => g.userId,
            g => {
                let row = document.createElement("tr");
                row.appendChild( document.createElement("td"));
                row.appendChild( document.createElement("td"));
                row.appendChild( document.createElement("td"));
                return row;
            });
    }

    connectedCallback() {
        this.abortController = new AbortController();
        this.store.postAction(new UpdateScoreboardAction());
        this.store.subscribe(s => {
            this.scoreboardRenderer.update(s.scoreboard, (e, d) => {
                let placeCol: HTMLTableCellElement = <HTMLTableCellElement>e.children[0];
                placeCol.innerText = `${d.place}.`;
                let nameCol: HTMLTableCellElement = <HTMLTableCellElement>e.children[1];
                nameCol.innerText = d.displayName;
                let pointsCol: HTMLTableCellElement = <HTMLTableCellElement>e.children[2];
                pointsCol.innerText = `${d.points.toFixed(2)}`;
            });
            this.scoreboardLoadError.style.display = s.scoreboardRequest == RequestState.Failed ? "flex" : "none";
        }, this.abortController.signal);
        abortableEventListener(this.querySelector("a"), "click", e => {
            e.preventDefault();
            this.router.router.navigate("", "wettma");
        }, this.abortController.signal);

    }

    disconnectedCallback() {
        this.abortController.abort();
    }
}

customElements.define("scoreboard-component", ScoreboardComponent);
