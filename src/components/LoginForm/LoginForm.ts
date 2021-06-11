import template from "./LoginForm.html";
import "./LoginForm.scss";

function nonce(length: number) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

export class LoginForm extends HTMLElement {
    private nonceInput: HTMLInputElement;
    private redirectUriInput: HTMLInputElement;
    private loginHintInput: HTMLInputElement;
    private loginForm: HTMLFormElement;
    constructor() {
        super();
        this.innerHTML = template;
    }

    connectedCallback() {
        this.nonceInput = this.querySelector("#nonce");
        this.redirectUriInput = this.querySelector("#redirect_uri");
        this.redirectUriInput.value = window.location.href.replace(/\/(login|explanation|scoreboard|setresult)|(\?.+)|(\#.+)/g, "").replace(/(\/$)/g, "");
        this.loginHintInput = this.querySelector("#login_hint");
        this.loginForm = this.querySelector("#login_form");
        this.nonceInput.value = nonce(8);
    }

    disconnectedCallback() {

    }

    setLoginHint(hint: string) {
        this.loginHintInput.value = hint;
    }

    submit() {
        this.loginForm.submit();
    }
}

customElements.define("login-form", LoginForm);
