import { abortableEventListener } from "../../abortable-event-listener";
import { AppRouter } from "../../app-router";
import { RegisterAction } from "../../state/requests/RegisterAction";
import { RequestState, State } from "../../state/state";
import { Store } from "../../state/store";
import template from "./RegisterComponent.html";
import "./RegisterComponent.scss";

export class RegisterComponent extends HTMLElement {
    private form: HTMLFormElement;
    private abortController: AbortController;
    private store: Store;
    private registerFailed: HTMLSpanElement;
    private router: AppRouter;

    constructor() {
        super();
        this.innerHTML = template;
        this.form = this.querySelector("form");
        this.registerFailed = this.querySelector("#register-failed");
        this.store = Store.getInstance();
        this.router = AppRouter.getInstance();
    }

    connectedCallback() {
        this.abortController = new AbortController();
        abortableEventListener(this.form, "submit", ev => this.onFormSubmit(ev), this.abortController.signal);
        this.store.subscribe(s => this.updateState(s), this.abortController.signal);
        this.updateState(this.store.state);
    }

    updateState(s: State) {
        if (s.register == RequestState.Successful) {
            this.router.router.navigate("", "wettma", true);
        }
        this.registerFailed.style.display = s.register == RequestState.Failed ? "inline" : "none";
    }

    onFormSubmit(ev: Event) {
        ev.preventDefault();
        let name: string = <string>(new FormData(this.form).get("display-name"));
        this.store.postAction(new RegisterAction(name));
    }

    disconnectedCallback() {
        this.abortController.abort();
    }
}

customElements.define("register-component", RegisterComponent);
