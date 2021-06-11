import { abortableEventListener } from "../../abortable-event-listener";
import { AppRouter } from "../../app-router";
import template from "./ExplanationComponent.html";
import "./ExplanationComponent.scss";

export class ExplanationComponent extends HTMLElement {
    private abortController: AbortController;
    private router: AppRouter;
   
    constructor() {
        super();
        this.innerHTML = template;
        this.router = AppRouter.getInstance();
    }

    connectedCallback() {
        this.abortController = new AbortController();
        abortableEventListener(this.querySelector("a"), "click", e => {
            e.preventDefault();
            this.router.router.navigate("", "wettma");
        }, this.abortController.signal);
    }

    disconnectedCallback() {
        this.abortController.abort();
    }
}

customElements.define("explanation-component", ExplanationComponent);
