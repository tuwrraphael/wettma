import { LoadParticipantsAction } from "../../state/requests/LoadParticipantsAction";
import { State } from "../../state/state";
import { Store } from "../../state/store";
import template from "./ParticipantsComponent.html";
import "./ParticipantsComponent.scss";

export class ParticipantsComponent extends HTMLElement {

    private rendered = false;
    private store: Store;
    private abortController: AbortController;
    constructor() {
        super();
        this.store = Store.getInstance();
    }

    connectedCallback() {
        if (!this.rendered) {
            this.rendered = true;
            this.innerHTML = template;
        }
        this.store.postAction(new LoadParticipantsAction());
        this.abortController = new AbortController();
        this.store.subscribe(s => this.update(s), this.abortController.signal);
    }

    update(s: State) {
        this.innerHTML = s.participants.map(p => `<div>${p.displayName}</div>`).join("");
    }

    disconnectedCallback() {
        this.abortController.abort();
    }
}

export const ParticipantsComponentTagName = "participants-component";
customElements.define(ParticipantsComponentTagName, ParticipantsComponent);
