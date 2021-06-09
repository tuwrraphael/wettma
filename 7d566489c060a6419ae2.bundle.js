!function(){"use strict";var e,t={2028:function(e,t,n){n(285),n(5306);var s=n(8402);class i{constructor(e,t,n){this.listElement=e,this.keySelector=t,this.createElement=n,this.keyToElement=new Map,this.elementToKey=new WeakMap}update(e,t){let n=new Map,s=e=>n.get(e)||(()=>{let t=this.keySelector(e);return n.set(e,t),t})();for(let n of Array.from(this.listElement.children)){let i=n,r=e.find((e=>this.elementToKey.get(i)==s(e)));r?t(i,r):this.listElement.removeChild(i)}let i=null,r=new Map;for(let n of e){let e=s(n),o=this.keyToElement.get(e);o||(o=this.createElement(n),t(o,n),this.elementToKey.set(o,e)),r.set(e,o),null==i&&o!=this.listElement.firstElementChild?this.listElement.prepend(o):null!=i&&i.nextElementSibling!=o&&i.insertAdjacentElement("afterend",o),i=o}this.keyToElement=r}}class r{constructor(){this._state=null,this.subscriptions=[],this.worker=new Worker(new URL(n.p+n.u(772),n.b)),this.worker.addEventListener("message",(e=>{this._state=e.data;for(let e of this.subscriptions)try{e.call(this._state)}catch(e){console.error("Error while updating",e)}}))}get state(){return this._state}static getInstance(){return null==this.instance&&(this.instance=new r),this.instance}subscribe(e,t){let n={call:e};this.subscriptions.push(n),t&&t.addEventListener("abort",(()=>{this.subscriptions.splice(this.subscriptions.indexOf(n),1)}))}postAction(e){this.worker.postMessage(e)}}function o(e,t,n,s){e.addEventListener(t,n),s.addEventListener("abort",(()=>{e.removeEventListener(t,n)}))}r.instance=null;const a="choice",l="display";class c extends HTMLElement{constructor(){super(),this.innerHTML='<button type="button" class="odds-button"/>',this.btn=this.querySelector("button")}connectedCallback(){this.abortController=new AbortController,o(this.btn,"click",(e=>{e.preventDefault(),this.dispatchEvent(new CustomEvent("oddsclicked",{bubbles:!0,detail:parseInt(this.getAttribute(a))}))}),this.abortController.signal)}disconnectedCallback(){this.abortController.abort()}attributeChangedCallback(){this.updateAttributes()}updateAttributes(){this.btn.innerText=this.getAttribute(l)}static get observedAttributes(){return[a,l]}}customElements.define("odds-button",c);class d{constructor(e,t){this.oddsId=e,this.choice=t,this.type=0}}var u;!function(e){e[e.Team1=0]="Team1",e[e.Team2=1]="Team2",e[e.Draw=2]="Draw"}(u||(u={}));let h=new Intl.DateTimeFormat(["de-AT"],{weekday:"short",day:"2-digit",month:"2-digit",hour:"2-digit",minute:"2-digit"});class m extends HTMLElement{constructor(){super(),this.innerHTML='<h3> <span data-ref="team1"></span> - <span data-ref="team2"></span> </h3> <span data-ref="time"></span> <form data-ref="odds-form" class="odds-form"> <odds-button choice="0" data-ref="team1-odds"></odds-button> <odds-button choice="2" data-ref="draw-odds"></odds-button> <odds-button choice="1" data-ref="team2-odds"></odds-button> </form> <div data-ref="my-bet" class="status-msg my-bet"> <span class="material-icons" title="Tipp abgegeben"> done </span> <span> Dein Tipp <strong> <span data-ref="my-bet-team"></span> </strong> für <strong> <span data-ref="my-bet-odds"></span></strong>. </span> </div> <div data-ref="saving" class="status-msg saving"> <span class="material-icons" title="Tipp wird gepeichert."> donut_large </span> Dein Tipp wird gespeichert. </div> <div data-ref="odds-changed-error" class="status-msg warning"> <span class="material-icons" title="Tipp nicht gespeichert: Quoten geändert"> warning </span> Dein Tipp wurde nicht gespeichert, weil sich die Quoten geändert haben. </div> <div data-ref="game-started-error" class="status-msg error"> <span class="material-icons" title="Spiel hat bereits begonnen"> error </span> Dein Tipp wurde nicht gespeichert, weil das Spiel bereits begonnen hat. </div> <div data-ref="save-error" class="status-msg error"> <span class="material-icons" title="Tipp konnte nicht gespeichert werden"> error </span> Beim Speichern ist ein Fehler aufgetreten. </div>',this.team1Label=this.querySelector('[data-ref="team1"]'),this.team2Label=this.querySelector('[data-ref="team2"]'),this.team1Odds=this.querySelector('[data-ref="team1-odds"]'),this.drawOdds=this.querySelector('[data-ref="draw-odds"]'),this.team2Odds=this.querySelector('[data-ref="team2-odds"]'),this.oddsForm=this.querySelector('[data-ref="odds-form"]'),this.timeDisplay=this.querySelector('[data-ref="time"]'),this.myBetContainer=this.querySelector('[data-ref="my-bet"]'),this.myBetTeam=this.querySelector('[data-ref="my-bet-team"]'),this.myBetOdds=this.querySelector('[data-ref="my-bet-odds"]'),this.saving=this.querySelector('[data-ref="saving"]'),this.oddsChangedError=this.querySelector('[data-ref="odds-changed-error"]'),this.gameStartedError=this.querySelector('[data-ref="game-started-error"]'),this.unknownError=this.querySelector('[data-ref="save-error"]'),this.store=r.getInstance()}connectedCallback(){this.abortController=new AbortController,o(this.oddsForm,"oddsclicked",(e=>{this.store.postAction(new d(this.game.odds.id,e.detail))}),this.abortController.signal)}disconnectedCallback(){this.abortController.abort()}setGame(e){var t,n,s;this.game=e,this.team1Label.innerText=e.team1,this.team2Label.innerText=e.team2,this.oddsForm.style.visibility=e.odds?"visible":"hidden",e.odds&&(this.team1Odds.setAttribute(l,`${e.odds.team1}`),this.drawOdds.setAttribute(l,`${e.odds.draw}`),this.team2Odds.setAttribute(l,`${e.odds.team2}`),this.timeDisplay.innerText=h.format(e.time)),this.myBetContainer.style.display=e.myBet&&!e.saving?"flex":"none",e.myBet&&(this.myBetTeam.innerText=e.myBet.choice==u.Team1?e.team1:e.myBet.choice==u.Team2?e.team2:"Unentschieden",this.myBetOdds.innerText=`${e.myBet.choice==u.Team1?e.myBet.odds.team1:e.myBet.choice==u.Team2?e.myBet.odds.team2:e.myBet.odds.draw}`),this.saving.style.display=e.saving?"flex":"none",this.oddsChangedError.style.display=(null===(t=e.saveError)||void 0===t?void 0:t.oddsChanged)?"flex":"none",this.gameStartedError.style.display=(null===(n=e.saveError)||void 0===n?void 0:n.gameStarted)?"flex":"none",this.unknownError.style.display=(null===(s=e.saveError)||void 0===s?void 0:s.unknown)?"flex":"none"}}customElements.define("upcoming-game-display",m);class p extends HTMLElement{constructor(){super(),this.innerHTML='<div class="container"> <section class="section"> <h2> Nächste Spiele </h2> <ol id="upcoming-games" class="gameslist"> </ol> </section> </div>',this.store=r.getInstance(),this.upcomingGamesList=this.querySelector("#upcoming-games"),this.upcomingGamesRenderer=new i(this.upcomingGamesList,(e=>e.id),(e=>{let t=document.createElement("li");return t.appendChild(new m),t}))}connectedCallback(){this.abortController=new AbortController,this.store.subscribe((e=>this.updateState(e)),this.abortController.signal),this.updateState(this.store.state)}updateState(e){this.upcomingGamesRenderer.update(e.upcomingGames,((e,t)=>{e.children[0].setGame(t)}))}disconnectedCallback(){this.abortController.abort()}}var g;customElements.define("home-component",p);class b extends HTMLElement{constructor(){super(),this.innerHTML='<form method="GET" action="https://accounts.google.com/o/oauth2/v2/auth" id="login_form"> <input type="hidden" name="client_id" id="client_id" value="1074789941765-gfvvc65dl37u9upl9opgo3q1f7hmqh5n.apps.googleusercontent.com"> <input type="hidden" name="redirect_uri" id="redirect_uri"> <input type="hidden" name="response_type" value="token id_token"> <input type="hidden" name="login_hint" id="login_hint"> <input type="hidden" name="nonce" id="nonce"> <input type="hidden" name="scope" value="openid"> <button type="submit">Login über Google</button> </form>'}connectedCallback(){this.nonceInput=this.querySelector("#nonce"),this.redirectUriInput=this.querySelector("#redirect_uri"),this.redirectUriInput.value=window.location.href.replace(/\/(login)|(\?.+)|(\#.+)/g,"").replace(/(\/$)/g,""),this.loginHintInput=this.querySelector("#login_hint"),this.loginForm=this.querySelector("#login_form"),this.nonceInput.value=function(e){for(var t="",n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",s=0;s<8;s++)t+=n.charAt(Math.floor(Math.random()*n.length));return t}()}disconnectedCallback(){}setLoginHint(e){this.loginHintInput.value=e}submit(){this.loginForm.submit()}}customElements.define("login-form",b);class f extends HTMLElement{constructor(){super(),this.innerHTML='<div class="container"> <section class="section"> <h2> Login </h2> <p>Du musst dich zuerst anmelden bevor du fortfahren kannst.</p> <login-form></login-form> </section> </div>',this.loginForm=this.querySelector("login-form")}connectedCallback(){"FederatedCredential"in window&&navigator.credentials.get({federated:{providers:["https://accounts.google.com"]},mediation:"optional"}).then((e=>{e&&"federated"==e.type&&(this.loginForm.setLoginHint(e.id),this.loginForm.submit())}))}disconnectedCallback(){}}customElements.define("login-component",f);class y{constructor(e){this.displayName=e,this.type=3}}!function(e){e[e.Unset=0]="Unset",e[e.InProgress=1]="InProgress",e[e.Successful=2]="Successful",e[e.Failed=3]="Failed"}(g||(g={}));class v extends HTMLElement{constructor(){super(),this.innerHTML='<div class="container"> <section class="section"> <h2> Anzeigenamen </h2> <p>Lege einen Anzeigenamen fest. Dieser wird <strong>für alle ersichtlich</strong> im Scoreboard angezeigt.</p> <form> <label for="display-name">Anzeigename</label> <input type="text" id="display-name" name="display-name" maxlength="15" required="required"> <button type="submit">Speichern</button> </form> <span style="display:none" id="register-failed">Registrierung fehlgeschlagen</span> </section> </div>',this.form=this.querySelector("form"),this.registerFailed=this.querySelector("#register-failed"),this.store=r.getInstance(),this.router=w.getInstance()}connectedCallback(){this.abortController=new AbortController,o(this.form,"submit",(e=>this.onFormSubmit(e)),this.abortController.signal),this.store.subscribe((e=>this.updateState(e)),this.abortController.signal),this.updateState(this.store.state)}updateState(e){e.register==g.Successful&&this.router.router.navigate("","wettma",!0),this.registerFailed.style.display=e.register==g.Failed?"inline":"none"}onFormSubmit(e){e.preventDefault();let t=new FormData(this.form).get("display-name");this.store.postAction(new y(t))}disconnectedCallback(){this.abortController.abort()}}customElements.define("register-component",v);class w{constructor(){let e=this;this.router=new s.F0(new class{async resolve(t,n,s){switch(n){case"login":return e.activeRoute="login",new f;case"register":return e.activeRoute="register",new v;default:return e.activeRoute="home",new p}}},new s.NP(document.getElementById("content")))}static getInstance(){return null==this.instance&&(this.instance=new w),this.instance}}w.instance=null;class S{constructor(e){this.accessToken=e,this.type=2}}class k{constructor(){this.type=1}}class T{constructor(){this.type=4}}class C extends HTMLElement{constructor(){super(),this.innerHTML='<div class="app-bar__container"> <nav class="app-bar"> <h1> <span class="material-icons"> sports_soccer </span> wettma</h1> <div class="user-container" id="user-container"> <span id="logged-in-user"></span> <button id="logout" style="display:none">Logout</button> <button id="login" style="display:none">Login</button> </div> </nav> </div>',this.store=r.getInstance(),this.router=w.getInstance(),this.displayName=this.querySelector("#logged-in-user"),this.logoutBtn=this.querySelector("#logout"),this.loginBtn=this.querySelector("#login"),this.userContainer=this.querySelector("#user-container")}connectedCallback(){this.abortController=new AbortController,o(this.logoutBtn,"click",(e=>{this.store.postAction(new T),sessionStorage.clear()}),this.abortController.signal),o(this.loginBtn,"click",(e=>{this.router.router.navigate("login","wettma - Login")}),this.abortController.signal),this.store.subscribe((e=>this.updateState(e)),this.abortController.signal),this.updateState(this.store.state)}updateState(e){this.displayName.innerText=e.displayName||"",this.displayName.style.display=e.accessToken?"inline":"none",this.logoutBtn.style.display=e.accessToken?"inline":"none",this.loginBtn.style.display=e.accessToken?"none":"inline"}disconnectedCallback(){this.abortController.abort()}}customElements.define("app-bar",C),"serviceWorker"in navigator&&window.addEventListener("load",(async()=>{navigator.serviceWorker.register("./sw.js").then((e=>{})).catch((e=>{console.log("SW registration failed: ",e)}))})),async function(){let e=w.getInstance();e.router.run();let t=r.getInstance();t.subscribe((n=>{n.goToLogin&&"login"!=e.activeRoute?(t.postAction(new k),e.router.navigate("login","wettma - Login")):n.goToRegister&&"register"!=e.activeRoute&&(t.postAction(new k),e.router.navigate("register","wettma - Registrieren"))}));let n=await async function(){const e="wettma-webapp-token";let t=new URLSearchParams(window.location.hash.replace(/^#/,"")),n=t.get("id_token");if(n){history.replaceState(null,null," ");let i=await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${n}`),r=await i.json();if(!i.ok)throw new Error(`access token validation resulted in ${i.status}`);let o={token:n,exp:+new Date+1e3*parseInt(t.get("expires_in")),scope:r.scope,sub:r.sub};if(sessionStorage.setItem(e,JSON.stringify(o)),"FederatedCredential"in window){var s=await navigator.credentials.create({federated:{id:r.sub,provider:"https://accounts.google.com"}});await navigator.credentials.store(s)}return o}{let t=sessionStorage.getItem(e);if(null!=t){let e=JSON.parse(t);if(e.exp>+new Date)return e}}return null}();t.postAction(new S(n))}().catch((e=>console.error(e)))}},n={};function s(e){var i=n[e];if(void 0!==i)return i.exports;var r=n[e]={exports:{}};return t[e](r,r.exports,s),r.exports}s.m=t,e=[],s.O=function(t,n,i,r){if(!n){var o=1/0;for(c=0;c<e.length;c++){n=e[c][0],i=e[c][1],r=e[c][2];for(var a=!0,l=0;l<n.length;l++)(!1&r||o>=r)&&Object.keys(s.O).every((function(e){return s.O[e](n[l])}))?n.splice(l--,1):(a=!1,r<o&&(o=r));a&&(e.splice(c--,1),t=i())}return t}r=r||0;for(var c=e.length;c>0&&e[c-1][2]>r;c--)e[c]=e[c-1];e[c]=[n,i,r]},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,{a:t}),t},s.d=function(e,t){for(var n in t)s.o(t,n)&&!s.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},s.u=function(e){return"d61f2cd73db8106be47c.bundle.js"},s.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/wettma/",function(){s.b=document.baseURI||self.location.href;var e={826:0};s.O.j=function(t){return 0===e[t]};var t=function(t,n){var i,r,o=n[0],a=n[1],l=n[2],c=0;for(i in a)s.o(a,i)&&(s.m[i]=a[i]);if(l)var d=l(s);for(t&&t(n);c<o.length;c++)r=o[c],s.o(e,r)&&e[r]&&e[r][0](),e[o[c]]=0;return s.O(d)},n=self.webpackChunkwettma=self.webpackChunkwettma||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}();var i=s.O(void 0,[401],(function(){return s(2028)}));i=s.O(i)}();
//# sourceMappingURL=7d566489c060a6419ae2.bundle.js.map