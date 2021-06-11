import { abortableEventListener } from "../../abortable-event-listener";
import { AppRouter } from "../../app-router";
import { ArrayToElementRenderer } from "../../ArrayToElementRenderer";
import { UpcomingGame } from "../../models/UpcomingGame";
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
    private router: AppRouter;

    constructor() {
        super();
        this.innerHTML = template;
        this.store = Store.getInstance();
        this.router = AppRouter.getInstance();
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
        this.updateState(this.store.state);
        abortableEventListener(this.querySelector("#explanation-link"), "click", e => {
            e.preventDefault();
            this.router.router.navigate("explanation", "Anleitung - wettma");
        }, this.abortController.signal);
    }

    updateState(s: State) {
        if (null == s) {
            return;
        }
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
