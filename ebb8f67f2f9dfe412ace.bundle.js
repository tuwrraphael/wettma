!function(){"use strict";var e;let s;!function(e){e[e.Unset=0]="Unset",e[e.InProgress=1]="InProgress",e[e.Successful=2]="Successful",e[e.Failed=3]="Failed"}(e||(e={})),s="https://wettma.azurewebsites.net";const t="https://wettma.azurewebsites.net";let a={upcomingGames:[],goToLogin:!1,goToRegister:!1,accessToken:null,displayName:null,userId:null,register:e.Unset,scoreboard:[],scoreboardRequest:e.Unset,setResultRequest:e.Unset,finishedGames:[]},i=[];function n(e){a=e(a),self.postMessage(a)}async function c(){let e=async function(){let e=new Headers;a.accessToken&&e.append("Authorization",`Bearer ${a.accessToken.token}`);let s=await fetch(`${t}/games`,{headers:e}),i=await s.json();n((e=>Object.assign(Object.assign({},e),{upcomingGames:i.filter((e=>!e.result)).map((s=>{let t=e.upcomingGames.find((e=>e.id==s.id));return Object.assign(Object.assign({},t),{id:s.id,team1:s.team1,team2:s.team2,time:new Date(s.time),myBet:s.myBet?{choice:s.myBet.choice,odds:{team1:s.myBet.odds.team1Odds,team2:s.myBet.odds.team2Odds,draw:s.myBet.odds.drawOdds}}:null})})).sort(((e,s)=>+e.time-+s.time)),finishedGames:i.filter((e=>e.result)).map((e=>({id:e.id,team1:e.team1,team2:e.team2,time:new Date(e.time),myBet:e.myBet?{choice:e.myBet.choice,odds:{team1:e.myBet.odds.team1Odds,team2:e.myBet.odds.team2Odds,draw:e.myBet.odds.drawOdds}}:null,result:{team1Goals:e.result.team1Goals,team2Goals:e.result.team2Goals}}))).sort(((e,s)=>+s.time-+e.time))})))}(),s=async function(){let e=await fetch(`${t}/odds`);return i=await e.json(),i}(),[c,o]=await Promise.all([e,s]);n((e=>{let s=[...e.upcomingGames];for(let e of o){let t=s.find((s=>e.gameId==s.id));if(t&&+t.time>+new Date-3e5){let a=s.indexOf(t);s[a]=Object.assign(Object.assign({},t),{odds:{draw:e.drawOdds,id:e.id,team1:e.team1Odds,team2:e.team2Odds}})}}return Object.assign(Object.assign({},e),{upcomingGames:s})}))}function o(e,s){n((t=>{let a=[...t.upcomingGames],i=a.find((s=>e==s.id)),n=a.indexOf(i);return a[n]=Object.assign(Object.assign({},i),s),Object.assign(Object.assign({},t),{upcomingGames:a})}))}async function d(e){let s=await fetch(`${t}/user/profile`,{headers:{Authorization:`Bearer ${e.token}`}});if(401==s.status)n((s=>Object.assign(Object.assign({},s),{goToRegister:!0,accessToken:e})));else if(200==s.status){let t=await s.json();return n((s=>Object.assign(Object.assign({},s),{accessToken:e,userId:t.userId,displayName:t.displayName}))),!0}return!1}self.addEventListener("message",(s=>{(async function(s){switch(s.type){case 0:await async function(e){let s=i.find((s=>s.id==e.oddsId));o(s.gameId,{saving:!0,saveError:null}),null==a.accessToken?n((e=>Object.assign(Object.assign({},e),{goToLogin:!0}))):null==a.userId&&n((e=>Object.assign(Object.assign({},e),{goToRegister:!0})));try{let i=await fetch(`${t}/bets`,{headers:{Authorization:`Bearer ${a.accessToken.token}`,"Content-Type":"application/json"},method:"POST",body:JSON.stringify({oddsId:e.oddsId,choice:e.choice})});if(200==i.status)o(s.gameId,{myBet:{choice:e.choice,odds:{draw:s.drawOdds,team1:s.team1Odds,team2:s.team2Odds}},saving:!1});else if(400==i.status){let e=await i.json();"oddschanged"==e.type||"oddsexpired"==e.type?(o(s.gameId,{saving:!1,saveError:{oddsChanged:!0}}),await c()):"gamestarted"==e.type?(o(s.gameId,{saving:!1,saveError:{gameStarted:!0}}),await c()):o(s.gameId,{saving:!1,saveError:{unknown:!0}})}}catch(e){o(s.gameId,{saving:!1,saveError:{unknown:!0}})}}(s);break;case 1:n((e=>Object.assign(Object.assign({},e),{goToLogin:!1})));break;case 2:await async function(e){e&&await d(e),await c()}(s.accessToken);break;case 3:await async function(s){n((s=>Object.assign(Object.assign({},s),{register:e.InProgress,goToRegister:!1})));try{201==(await fetch(`${t}/user/register`,{headers:{"Content-Type":"application/json"},method:"POST",body:JSON.stringify({displayName:s.displayName,token:a.accessToken.token})})).status?await d(a.accessToken)&&n((s=>Object.assign(Object.assign({},s),{register:e.Successful}))):n((s=>Object.assign(Object.assign({},s),{register:e.Failed})))}catch(s){n((s=>Object.assign(Object.assign({},s),{register:e.Failed})))}}(s);break;case 4:await async function(e){"credentials"in navigator&&"preventSilentAccess"in navigator.credentials&&navigator.credentials.preventSilentAccess(),n((e=>Object.assign(Object.assign({},e),{accessToken:null,displayName:null,userId:null}))),await c()}();break;case 5:await async function(s){n((s=>Object.assign(Object.assign({},s),{scoreboardRequest:e.InProgress})));try{let s=await fetch(`${t}/scoreboard`);if(!s.ok)return void n((s=>Object.assign(Object.assign({},s),{scoreboardRequest:e.Failed})));let a=(await s.json()).sort(((e,s)=>s.points-e.points||e.displayName.localeCompare(s.displayName))).map((e=>({displayName:e.displayName,points:e.points,userId:e.userId})));n((s=>Object.assign(Object.assign({},s),{scoreboardRequest:e.Successful,scoreboard:a})))}catch(s){n((s=>Object.assign(Object.assign({},s),{scoreboardRequest:e.Failed})))}}();break;case 6:await async function(s){n((s=>Object.assign(Object.assign({},s),{setResultRequest:e.InProgress})));try{(await fetch(`${t}/games/${s.gameId}/result`,{headers:{Authorization:`Bearer ${a.accessToken.token}`,"Content-Type":"application/json"},method:"PUT",body:JSON.stringify({team1Goals:s.team1Goals,team2Goals:s.team2Goals})})).ok?n((s=>Object.assign(Object.assign({},s),{setResultRequest:e.Successful}))):n((s=>Object.assign(Object.assign({},s),{setResultRequest:e.Failed})))}catch(s){n((s=>Object.assign(Object.assign({},s),{setResultRequest:e.Failed})))}}(s)}})(s.data).catch((e=>console.error(e)))}))}();
//# sourceMappingURL=ebb8f67f2f9dfe412ace.bundle.js.map