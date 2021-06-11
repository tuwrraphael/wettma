import { abortableEventListener } from "../../abortable-event-listener";
import { ArrayToElementRenderer } from "../../ArrayToElementRenderer";
import { UpcomingGame } from "../../models/UpcomingGame";
import { SetResultAction } from "../../state/requests/SetResultAction";
import { RequestState, State } from "../../state/state";
import { Store } from "../../state/store";
import template from "./SetResultComponent.html";
import "./SetResultComponent.scss";

let i18nFormat = new Intl.DateTimeFormat(["de-AT"], { weekday: "short", day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });

export class SetResultComponent extends HTMLElement {
    private store: Store;
    private abortController: AbortController;
    private gamesSelectRenderer: ArrayToElementRenderer<UpcomingGame, HTMLOptionElement, number>;
    private saveFailed: HTMLSpanElement;
    private saveSuccess: HTMLSpanElement;

    constructor() {
        super();
        this.innerHTML = template;
        this.store = Store.getInstance();
        this.gamesSelectRenderer = new ArrayToElementRenderer<UpcomingGame, HTMLOptionElement, number>(this.querySelector("#game"),
            n => n.id, () => document.createElement("option"));
        this.saveFailed = this.querySelector("#save-failed");
        this.saveSuccess = this.querySelector("#save-successful");
    }

    connectedCallback() {
        this.abortController = new AbortController();
        this.store.subscribe(s => this.updateState(s), this.abortController.signal);
        this.updateState(this.store.state);
        abortableEventListener(this.querySelector("form"), "submit", ev => this.onFormSubmit(ev), this.abortController.signal);
    }

    onFormSubmit(ev: Event) {
        ev.preventDefault();
        let formData = new FormData(this.querySelector("form"));
        this.store.postAction(new SetResultAction(parseInt(<string>formData.get("game")), parseInt(<string>formData.get("team1-goals")), parseInt(<string>formData.get("team2-goals"))));
    }

    private updateState(s: State) {
        if (null != s) {
            this.gamesSelectRenderer.update(s.upcomingGames, (e, d) => {
                e.value = `${d.id}`;
                e.innerText = `${d.team1} - ${d.team2} ${i18nFormat.format(d.time)}`;
            });
            this.saveFailed.style.display = s.setResultRequest == RequestState.Failed ? "flex" : "none";
            this.saveSuccess.style.display = s.setResultRequest == RequestState.Successful ? "flex" : "none";
        }
    }

    disconnectedCallback() {
        this.abortController.abort();
    }
}

customElements.define("set-result-component", SetResultComponent);
