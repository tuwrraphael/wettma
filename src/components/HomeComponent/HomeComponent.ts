import { ArrayToElementRenderer } from "../../ArrayToElementRenderer";
import { UpcomingGame } from "../../models/UpcomingGame";
import { SyncAction } from "../../state/requests/SyncAction";
import { State } from "../../state/state";
import { Store } from "../../state/store";
import { UpcomingGameDisplay } from "../UpcomingGameDisplay/UpcomingGameDisplay";
import template from "./HomeComponent.html";
import "./HomeComponent.scss";

export class HomeComponent extends HTMLElement {
    private store: Store;
    private abortController: AbortController;
    private upcomingGamesList: HTMLOListElement;
    private upcomingGamesRenderer: ArrayToElementRenderer<UpcomingGame, HTMLLIElement, number>;

    constructor() {
        super();
        this.innerHTML = template;
        this.store = Store.getInstance();
        this.upcomingGamesList = this.querySelector("#upcoming-games");
        this.upcomingGamesRenderer = new ArrayToElementRenderer(this.upcomingGamesList,
            g => g.id,
            g => {
                let li = document.createElement("li");
                li.appendChild(new UpcomingGameDisplay());
                return li;
            });
    }

    connectedCallback() {
        this.abortController = new AbortController();
        this.store.subscribe(s => this.updateState(s), this.abortController.signal);
        this.store.postAction(new SyncAction());
    }

    updateState(s: State) {
        this.upcomingGamesRenderer.update(s.upcomingGames, (li, g) => {
            let e: UpcomingGameDisplay = <UpcomingGameDisplay>li.children[0];
            e.setGame(g);
        });
    }

    disconnectedCallback() {
        this.abortController.abort();
    }
}

customElements.define("home-component", HomeComponent);
