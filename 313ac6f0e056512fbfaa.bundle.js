(self.webpackChunkwettma=self.webpackChunkwettma||[]).push([[698],{9698:function(e,t,r){"use strict";r.r(t),r.d(t,{ScoreboardComponent:function(){return l}});var o=r(6258),s=r(8312),n=r(5557);class a{constructor(){this.type=5}}var i=r(8036),c=r(9234);class l extends HTMLElement{constructor(){super(),this.innerHTML='<div class="container"> <section class="section"> <nav class="link-section"> <a href="" id="back-link">zurück zur Startseite</a> </nav> <h2> Rangliste </h2> <div id="scoreboard-load-error" class="status-msg error" style="display:none"> <span class="material-icons" title="Tipp konnte nicht gespeichert werden"> error </span> Rangliste konnte nicht geladen werden. </div> <table class="scoreboard-table"> <thead> <tr> <td>Spieler/in</td> <td>Punkte</td> </tr> </thead> <tbody> </tbody> </table> </section> </div>',this.store=c.y.getInstance(),this.router=s.W.getInstance(),this.tableBody=this.querySelector("tbody"),this.scoreboardLoadError=this.querySelector("#scoreboard-load-error"),this.scoreboardRenderer=new n.T(this.tableBody,(e=>e.userId),(e=>{let t=document.createElement("tr"),r=document.createElement("td");t.appendChild(r);let o=document.createElement("td");return t.appendChild(o),t}))}connectedCallback(){this.abortController=new AbortController,this.store.postAction(new a),this.store.subscribe((e=>{this.scoreboardRenderer.update(e.scoreboard,((e,t)=>{e.children[0].innerText=t.displayName,e.children[1].innerText=`${t.points.toFixed(2)}`})),this.scoreboardLoadError.style.display=e.scoreboardRequest==i.y.Failed?"flex":"none"}),this.abortController.signal),(0,o.I)(this.querySelector("a"),"click",(e=>{e.preventDefault(),this.router.router.navigate("","wettma")}),this.abortController.signal)}disconnectedCallback(){this.abortController.abort()}}customElements.define("scoreboard-component",l)}}]);
//# sourceMappingURL=313ac6f0e056512fbfaa.bundle.js.map