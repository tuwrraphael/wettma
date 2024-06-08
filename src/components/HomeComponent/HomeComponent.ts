import { abortableEventListener } from "../../abortable-event-listener";
import { AppRouter } from "../../app-router";
import { ArrayToElementRenderer } from "../../ArrayToElementRenderer";
import { UpcomingGame } from "../../models/UpcomingGame";
import { FinishedGame } from "../../models/FinishedGame";
import { State } from "../../state/state";
import { Store } from "../../state/store";
import { UpcomingGameDisplay } from "../UpcomingGameDisplay/UpcomingGameDisplay";
import { FinishedGameDisplay } from "../FinishedGameDisplay/FinishedGameDisplay";
import template from "./HomeComponent.html";
import "./HomeComponent.scss";
import { ShowMoreFinishedGamesAction } from "../../state/requests/ShowMoreFinishedGames";

export class HomeComponent extends HTMLElement {
    private store: Store;
    private abortController: AbortController;
    private upcomingGamesList: HTMLOListElement;
    private upcomingGamesRenderer: ArrayToElementRenderer<UpcomingGame, HTMLLIElement, number>;
    private finishedGamesRenderer: ArrayToElementRenderer<FinishedGame, HTMLLIElement, number>;
    private router: AppRouter;
    private finishedGamesList: HTMLOListElement;
    private showMore: HTMLButtonElement;

    constructor() {
        super();
        this.innerHTML = template;
        // this.store = Store.getInstance();
        // this.router = AppRouter.getInstance();
        // this.upcomingGamesList = this.querySelector("#upcoming-games");
        // this.finishedGamesList = this.querySelector("#finished-games");
        // this.showMore = this.querySelector("#show-more");
        // this.upcomingGamesRenderer = new ArrayToElementRenderer(this.upcomingGamesList,
        //     g => g.id,
        //     g => {
        //         let li = document.createElement("li");
        //         li.appendChild(new UpcomingGameDisplay());
        //         return li;
        //     });
        // this.finishedGamesRenderer = new ArrayToElementRenderer(this.finishedGamesList,
        //     g => g.id,
        //     g => {
        //         let li = document.createElement("li");
        //         li.appendChild(new FinishedGameDisplay());
        //         return li;
        //     });
    }

    connectedCallback() {
        // this.abortController = new AbortController();
        // this.store.subscribe(s => this.updateState(s), this.abortController.signal);
        // this.updateState(this.store.state);
        // for (let link of this.querySelectorAll(`[data-ref="spa-link"]`)) {
        //     abortableEventListener(link, "click", e => {
        //         e.preventDefault();
        //         this.router.router.navigate(link.getAttribute("href"), link.getAttribute("title"));
        //     }, this.abortController.signal);
        // }
        // abortableEventListener(this.showMore, "click", () => {
        //     this.store.postAction(new ShowMoreFinishedGamesAction());
        // }, this.abortController.signal);
    }

    updateState(s: State) {
        if (null == s) {
            return;
        }
        this.upcomingGamesRenderer.update(s.upcomingGames, (li, g) => {
            let e: UpcomingGameDisplay = <UpcomingGameDisplay>li.children[0];
            e.setGame(g);
        });
        this.finishedGamesRenderer.update(s.finishedGames, (li, g) => {
            let e: FinishedGameDisplay = <FinishedGameDisplay>li.children[0];
            e.setGame(g);
        });
        this.showMore.style.display = s.hasMoreFinishedGames ? "" : "none";
    }

    disconnectedCallback() {
        // this.abortController.abort();
    }
}

customElements.define("home-component", HomeComponent);
