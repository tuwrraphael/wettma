import { ReuseableTemplate } from "../../ReuseableTemplate";
import templateContent from "./PointsDisplay.html";
import "./PointsDisplay.scss";

export const PointsAttribute = "points";

const template = new ReuseableTemplate(templateContent);

export class PointsDisplay extends HTMLElement {

    constructor() {
        super();
        this.appendChild(template.get());
    }

    connectedCallback() {

    }

    disconnectedCallback() {

    }

    attributeChangedCallback() {
        this.updateAttributes();
    }

    private updateAttributes() {
        this.querySelector("span").innerText = this.getAttribute(PointsAttribute);
        this.title = `Dieses Spiel ist ${this.getAttribute(PointsAttribute)} Punkte wert.`;
    }

    static get observedAttributes() {
        return [PointsAttribute];
    }
}

customElements.define("points-display", PointsDisplay);
