import { abortableEventListener } from "../../abortable-event-listener";
import template from "./OddsRadioButton.html";
import "./OddsRadioButton.scss";

export const IdPrefixAttribute = "id-prefix";
export const ChoiceAttribute = "choice";
export const DisplayAttribute = "display";

export class OddsRadioButton extends HTMLElement {
    private input: HTMLInputElement;
    private oddsLabel: HTMLLabelElement;
    private label: HTMLLabelElement;
    private abortController: AbortController;

    constructor() {
        super();
        this.innerHTML = template;
        this.input = this.querySelector("input");
        this.oddsLabel = this.querySelector(`[data-ref="label"]`);
        this.label = this.querySelector("label");

    }

    connectedCallback() {
        this.abortController = new AbortController();
        abortableEventListener(this.input, "click", e => {
            e.preventDefault();
            this.dispatchEvent(new CustomEvent("oddsclicked", { bubbles: true, detail: this.getAttribute(ChoiceAttribute) }));
        }, this.abortController.signal);
    }

    disconnectedCallback() {
        this.abortController.abort();
    }

    attributeChangedCallback() {
        this.updateAttributes();
    }

    private updateAttributes() {
        this.input.value = this.getAttribute(ChoiceAttribute);
        this.oddsLabel.innerText = this.getAttribute(DisplayAttribute);
        this.input.id = `${this.getAttribute(IdPrefixAttribute)}-${this.input.value}`;
        this.label.setAttribute("for", this.input.id);
    }

    static get observedAttributes() {
        return [IdPrefixAttribute, ChoiceAttribute, DisplayAttribute];
    }
}

customElements.define("odds-radio-button", OddsRadioButton);
