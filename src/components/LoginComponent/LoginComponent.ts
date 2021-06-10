import template from "./LoginComponent.html";
import "./LoginComponent.scss";
import "../LoginForm/LoginForm";
import { LoginForm } from "../LoginForm/LoginForm";


export class LoginComponent extends HTMLElement {
    private loginForm: LoginForm;

    constructor() {
        super();
        this.innerHTML = template;
        this.loginForm = this.querySelector("login-form");
    }

    connectedCallback() {
        if ("FederatedCredential" in window) {
            navigator.credentials.get({
                federated: {
                    providers: [
                        "https://google.wettma.kesal.at"
                    ]
                },
                mediation: "optional"
            }).then(c => {
                if (c && c.type == "federated") {
                    this.loginForm.setLoginHint(c.id);
                    this.loginForm.submit();
                }
            });
        }
    }

    disconnectedCallback() {

    }
}

customElements.define("login-component", LoginComponent);