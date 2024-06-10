import { abortableEventListener } from "../../abortable-event-listener";
import { PlaceComputerBetsAction } from "../../state/requests/PlaceComputerBetsAction";
import { RequestState, State } from "../../state/state";
import { Store } from "../../state/store";
import template from "./PlaceComputerBetsComponent.html";
import "./PlaceComputerBetsComponent.scss";

export class PlaceComputerBetsComponent extends HTMLElement {

    private rendered = false;
    private abortController: AbortController;
    private store: Store;
    private saveFailed : HTMLSpanElement;
    private saveSuccess : HTMLSpanElement;
    constructor() {
        super();
        this.store = Store.getInstance();
    }

    connectedCallback() {
        if (!this.rendered) {
            this.rendered = true;
            this.innerHTML = template;
            this.saveFailed = this.querySelector("#save-failed");
            this.saveSuccess = this.querySelector("#save-successful");
        }
        this.abortController = new AbortController();
        abortableEventListener(this.querySelector("form"), "submit", async (e) => {
            e.preventDefault();
            let formData = new FormData(e.target as HTMLFormElement);
            this.store.postAction(new PlaceComputerBetsAction({
                computerId: parseInt(formData.get("computer-id") as string),
                computerBets: JSON.parse(formData.get("computer-bets") as string)
            }));
        }, this.abortController.signal);
        this.store.subscribe(s => this.updateState(s), this.abortController.signal);
        this.updateState(this.store.state);
    }

    private updateState(s: State) {
        if (!s) {
            return
        }
        this.saveFailed.style.display = s.placeComputerBetsRequest == RequestState.Failed ? "flex" : "none";
        this.saveSuccess.style.display = s.placeComputerBetsRequest == RequestState.Successful ? "flex" : "none";
    }

    disconnectedCallback() {
        this.abortController.abort();
    }
}

export const PlaceComputerBetsComponentTagName = "place-computer-bets-component";
customElements.define(PlaceComputerBetsComponentTagName, PlaceComputerBetsComponent);
