"use strict";(self.webpackChunkwettma=self.webpackChunkwettma||[]).push([[151],{557:function(e,t,s){s.d(t,{T:function(){return i}});class i{constructor(e,t,s){this.listElement=e,this.keySelector=t,this.createElement=s,this.keyToElement=new Map,this.elementToKey=new WeakMap}update(e,t){let s=new Map,i=e=>s.get(e)||(()=>{let t=this.keySelector(e);return s.set(e,t),t})();for(let s of Array.from(this.listElement.children)){let l=s,n=e.find((e=>this.elementToKey.get(l)==i(e)));n?t(l,n):this.listElement.removeChild(l)}let l=null,n=new Map;for(let s of e){let e=i(s),a=this.keyToElement.get(e);a||(a=this.createElement(s),t(a,s),this.elementToKey.set(a,e)),n.set(e,a),null==l&&a!=this.listElement.firstElementChild?this.listElement.prepend(a):null!=l&&l.nextElementSibling!=a&&l.insertAdjacentElement("afterend",a),l=a}this.keyToElement=n}}},151:function(e,t,s){s.r(t),s.d(t,{SetResultComponent:function(){return m}});var i=s(258),l=s(557);class n{constructor(e,t,s){this.gameId=e,this.team1Goals=t,this.team2Goals=s,this.type=6}}var a=s(36),r=s(234);let o=new Intl.DateTimeFormat(["de-AT"],{weekday:"short",day:"2-digit",month:"2-digit",hour:"2-digit",minute:"2-digit"});class m extends HTMLElement{constructor(){super(),this.innerHTML='<div class="container"> <section class="section"> <h2> Ergebnis eintragen </h2> <form> <div> <label for="game">Spiel</label> <select id="game" name="game" required="required"></select> </div> <div> <label for="team1-goals">Team1 Tore</label> <input type="number" id="team1-goals" name="team1-goals" min="0" required="required"> </div> <div> <label for="team2-goals">Team2 Tore</label> <input type="number" id="team2-goals" name="team2-goals" min="0" required="required"> </div> <button type="submit">Speichern</button> </form> <span style="display:none" id="save-failed">Speichern fehlgeschlagen</span> <span style="display:none" id="save-successful">Speichern erfolgreich</span> </section> </div>',this.store=r.y.getInstance(),this.gamesSelectRenderer=new l.T(this.querySelector("#game"),(e=>e.id),(()=>document.createElement("option"))),this.saveFailed=this.querySelector("#save-failed"),this.saveSuccess=this.querySelector("#save-successful")}connectedCallback(){this.abortController=new AbortController,this.store.subscribe((e=>this.updateState(e)),this.abortController.signal),this.updateState(this.store.state),(0,i.I)(this.querySelector("form"),"submit",(e=>this.onFormSubmit(e)),this.abortController.signal)}onFormSubmit(e){e.preventDefault();let t=new FormData(this.querySelector("form"));this.store.postAction(new n(parseInt(t.get("game")),parseInt(t.get("team1-goals")),parseInt(t.get("team2-goals"))))}updateState(e){null!=e&&(this.gamesSelectRenderer.update(e.upcomingGames,((e,t)=>{e.value=`${t.id}`,e.innerText=`${t.team1} - ${t.team2} ${o.format(t.time)}`})),this.saveFailed.style.display=e.setResultRequest==a.y.Failed?"flex":"none",this.saveSuccess.style.display=e.setResultRequest==a.y.Successful?"flex":"none")}disconnectedCallback(){this.abortController.abort()}}customElements.define("set-result-component",m)}}]);
//# sourceMappingURL=7b27028cc8667c6821be.bundle.js.map