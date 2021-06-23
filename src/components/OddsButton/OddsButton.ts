import { abortableEventListener } from "../../abortable-event-listener";
import { Choice } from "../../api/models";
import { ReuseableTemplate } from "../../ReuseableTemplate";
import templateContent from "./OddsButton.html";
import "./OddsButton.scss";

export const ChoiceAttribute = "choice";
export const DisplayAttribute = "display";

const template = new ReuseableTemplate(templateContent);

export class OddsButton extends HTMLElement {
    private abortController: AbortController;
    private btn: HTMLButtonElement;

    constructor() {
        super();
        this.appendChild(template.get());
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
