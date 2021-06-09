import { abortableEventListener } from "../../abortable-event-listener";
import { LogoutAction } from "../../state/requests/LogoutAction";
import { Store } from "../../state/store";
import template from "./AppBar.html";
import "./AppBar.scss";

export class AppBar extends HTMLElement {
    private store: Store;
    private abortController: AbortController;
    private displayName: HTMLSpanElement;
    private logoutBtn: HTMLButtonElement;
    private userContainer : HTMLDivElement;

    constructor() {
        super();
        this.innerHTML = template;
        this.store = Store.getInstance();
        this.displayName = this.querySelector("#logged-in-user");
        this.logoutBtn = this.querySelector("#logout");
        this.userContainer = this.querySelector("#user-container");
    }

    connectedCallback() {
        this.abortController = new AbortController();
        abortableEventListener(this.logoutBtn, "click", ev => {
            this.store.postAction(new LogoutAction());
        }, this.abortController.signal);
        this.store.subscribe(s => {
            this.displayName.innerText = s.displayName;
            this.userContainer.style.display = s.userId ? "inline" : "none";
        }, this.abortController.signal);
    }

    disconnectedCallback() {
        this.abortController.abort();
    }
}

customElements.define("app-bar", AppBar);
