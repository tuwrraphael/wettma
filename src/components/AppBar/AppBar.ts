import { abortableEventListener } from "../../abortable-event-listener";
import { AppRouter } from "../../app-router";
import { LogoutAction } from "../../state/requests/LogoutAction";
import { State } from "../../state/state";
import { Store } from "../../state/store";
import template from "./AppBar.html";
import "./AppBar.scss";

export class AppBar extends HTMLElement {
    private store: Store;
    private abortController: AbortController;
    private displayName: HTMLSpanElement;
    private logoutBtn: HTMLButtonElement;
    private userContainer: HTMLDivElement;
    private loginBtn: HTMLButtonElement;
    private router: AppRouter;

    constructor() {
        super();
        this.innerHTML = template;
        this.store = Store.getInstance();
        this.router = AppRouter.getInstance();
        this.displayName = this.querySelector("#logged-in-user");
        this.logoutBtn = this.querySelector("#logout");
        this.loginBtn = this.querySelector("#login");
        this.userContainer = this.querySelector("#user-container");
    }

    connectedCallback() {
        this.abortController = new AbortController();
        abortableEventListener(this.logoutBtn, "click", ev => {
            this.store.postAction(new LogoutAction());
            sessionStorage.clear();
        }, this.abortController.signal);
        abortableEventListener(this.loginBtn, "click", ev => {
            this.router.router.navigate("login", "wettma - Login");
        }, this.abortController.signal);
        this.store.subscribe(s => this.updateState(s), this.abortController.signal);
        this.updateState(this.store.state);
    }

    updateState(s:State) {
        this.displayName.innerText = s.displayName || "";
        this.displayName.style.display = s.accessToken ? "inline" : "none";
        this.logoutBtn.style.display = s.accessToken ? "inline" : "none";
        this.loginBtn.style.display = s.accessToken ? "none" : "inline";
    }

    disconnectedCallback() {
        this.abortController.abort();
    }
}

customElements.define("app-bar", AppBar);
