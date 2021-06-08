import { Choice } from "../../api/models";
import template from "./OddsRadioButton.html";
import "./OddsRadioButton.scss";

export const IdPrefixAttribute = "id-prefix";
export const ChoiceAttribute = "choice";
export const DisplayAttribute = "display";

export class OddsRadioButton extends HTMLElement {
    private input: HTMLInputElement;
    private oddsLabel: HTMLLabelElement;
    private label: HTMLLabelElement;

    constructor() {
        super();
        this.innerHTML = template;
        this.input = this.querySelector("input");
        this.oddsLabel = this.querySelector(`[data-ref="label"]`);
        this.label = this.querySelector("label");
    }

    connectedCallback() {


    }

    disconnectedCallback() {

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
