import { abortableEventListener } from "../../abortable-event-listener";
import template from "./OddsButton.html";
import "./OddsButton.scss";

export const ChoiceAttribute = "choice";
export const DisplayAttribute = "display";

export class OddsButton extends HTMLElement {
    private abortController: AbortController;
    private btn: HTMLButtonElement;

    constructor() {
        super();
        this.innerHTML = template;
        this.btn = this.querySelector("button");
    }

    connectedCallback() {
        this.abortController = new AbortController();
        abortableEventListener(this.btn, "click", e => {
            e.preventDefault();
            this.dispatchEvent(new CustomEvent("oddsclicked", { bubbles: true, detail: parseInt(this.getAttribute(ChoiceAttribute)) }));
        }, this.abortController.signal);
    }

    disconnectedCallback() {
        this.abortController.abort();
    }

    attributeChangedCallback() {
        this.updateAttributes();
    }

    private updateAttributes() {
        this.btn.innerText = this.getAttribute(DisplayAttribute);
    }

    static get observedAttributes() {
        return [ChoiceAttribute, DisplayAttribute];
    }
}

customElements.define("odds-button", OddsButton);
