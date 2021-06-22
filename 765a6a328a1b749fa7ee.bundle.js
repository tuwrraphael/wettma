!function(){"use strict";var e;let s;!function(e){e[e.Unset=0]="Unset",e[e.InProgress=1]="InProgress",e[e.Successful=2]="Successful",e[e.Failed=3]="Failed"}(e||(e={})),s="https://wettma.azurewebsites.net";const a="https://wettma.azurewebsites.net";let t={upcomingGames:[],goToLogin:!1,goToRegister:!1,accessToken:null,displayName:null,userId:null,register:e.Unset,scoreboard:[],scoreboardRequest:e.Unset,setResultRequest:e.Unset,finishedGames:[],gameBets:{}},i=[];function n(e){t=e(t),self.postMessage(t)}async function c(){let e=async function(){let e=new Headers;t.accessToken&&e.append("Authorization",`Bearer ${t.accessToken.token}`),e.append("X-Frontend-Version","1");let s=await fetch(`${a}/games`,{headers:e}),i=await s.json();n((e=>Object.assign(Object.assign({},e),{upcomingGames:i.filter((e=>!e.result)).map((s=>{let a=e.upcomingGames.find((e=>e.id==s.id));return Object.assign(Object.assign({},a),{id:s.id,team1:s.team1,team2:s.team2,time:new Date(s.time),myBet:s.myBet?{choice:s.myBet.choice,odds:{team1:s.myBet.odds.team1Odds,team2:s.myBet.odds.team2Odds,draw:s.myBet.odds.drawOdds}}:null})})).sort(((e,s)=>+e.time-+s.time)),finishedGames:i.filter((e=>e.result)).map((s=>{let a=e.finishedGames.find((e=>e.id==s.id));return Object.assign(Object.assign({},a),{id:s.id,team1:s.team1,team2:s.team2,time:new Date(s.time),myBet:s.myBet?{choice:s.myBet.choice,odds:{team1:s.myBet.odds.team1Odds,team2:s.myBet.odds.team2Odds,draw:s.myBet.odds.drawOdds}}:null,result:{team1Goals:s.result.team1Goals,team2Goals:s.result.team2Goals}})})).sort(((e,s)=>+s.time-+e.time))})))}(),s=async function(){let e=await fetch(`${a}/odds`);return i=await e.json(),i}(),[c,o]=await Promise.all([e,s]);n((e=>{let s=[...e.upcomingGames];for(let e of o){let a=s.find((s=>e.gameId==s.id));if(a&&+a.time>+new Date-3e5){let t=s.indexOf(a);s[t]=Object.assign(Object.assign({},a),{odds:{draw:e.drawOdds,id:e.id,team1:e.team1Odds,team2:e.team2Odds}})}}return Object.assign(Object.assign({},e),{upcomingGames:s})}))}function o(e,s){n((a=>{let t=[...a.upcomingGames],i=t.find((s=>e==s.id)),n=t.indexOf(i);return t[n]=Object.assign(Object.assign({},i),s),Object.assign(Object.assign({},a),{upcomingGames:t})}))}async function d(e){let s=await fetch(`${a}/user/profile`,{headers:{Authorization:`Bearer ${e.token}`}});if(401==s.status)n((s=>Object.assign(Object.assign({},s),{goToRegister:!0,accessToken:e})));else if(200==s.status){let a=await s.json();return n((s=>Object.assign(Object.assign({},s),{accessToken:e,userId:a.userId,displayName:a.displayName}))),!0}return!1}self.addEventListener("message",(s=>{(async function(s){switch(s.type){case 0:await async function(e){let s=i.find((s=>s.id==e.oddsId));o(s.gameId,{saving:!0,saveError:null}),null==t.accessToken?n((e=>Object.assign(Object.assign({},e),{goToLogin:!0}))):null==t.userId&&n((e=>Object.assign(Object.assign({},e),{goToRegister:!0})));try{let i=await fetch(`${a}/bets`,{headers:{Authorization:`Bearer ${t.accessToken.token}`,"Content-Type":"application/json"},method:"POST",body:JSON.stringify({oddsId:e.oddsId,choice:e.choice})});if(200==i.status)o(s.gameId,{myBet:{choice:e.choice,odds:{draw:s.drawOdds,team1:s.team1Odds,team2:s.team2Odds}},saving:!1});else if(400==i.status){let e=await i.json();"oddschanged"==e.type||"oddsexpired"==e.type?(o(s.gameId,{saving:!1,saveError:{oddsChanged:!0}}),await c()):"gamestarted"==e.type?(o(s.gameId,{saving:!1,saveError:{gameStarted:!0}}),await c()):o(s.gameId,{saving:!1,saveError:{unknown:!0}})}}catch(e){o(s.gameId,{saving:!1,saveError:{unknown:!0}})}}(s);break;case 1:n((e=>Object.assign(Object.assign({},e),{goToLogin:!1})));break;case 2:await async function(e){e&&await d(e),await c()}(s.accessToken);break;case 3:await async function(s){n((s=>Object.assign(Object.assign({},s),{register:e.InProgress,goToRegister:!1})));try{201==(await fetch(`${a}/user/register`,{headers:{"Content-Type":"application/json"},method:"POST",body:JSON.stringify({displayName:s.displayName,token:t.accessToken.token})})).status?await d(t.accessToken)&&n((s=>Object.assign(Object.assign({},s),{register:e.Successful}))):n((s=>Object.assign(Object.assign({},s),{register:e.Failed})))}catch(s){n((s=>Object.assign(Object.assign({},s),{register:e.Failed})))}}(s);break;case 4:await async function(e){"credentials"in navigator&&"preventSilentAccess"in navigator.credentials&&navigator.credentials.preventSilentAccess(),n((e=>Object.assign(Object.assign({},e),{accessToken:null,displayName:null,userId:null}))),await c()}();break;case 5:await async function(s){n((s=>Object.assign(Object.assign({},s),{scoreboardRequest:e.InProgress})));try{let s=await fetch(`${a}/scoreboard`);if(!s.ok)return void n((s=>Object.assign(Object.assign({},s),{scoreboardRequest:e.Failed})));let t=(await s.json()).sort(((e,s)=>s.points-e.points||e.displayName.localeCompare(s.displayName))).map((e=>({displayName:e.displayName,points:e.points,userId:e.userId})));n((s=>Object.assign(Object.assign({},s),{scoreboardRequest:e.Successful,scoreboard:t})))}catch(s){n((s=>Object.assign(Object.assign({},s),{scoreboardRequest:e.Failed})))}}();break;case 6:await async function(s){n((s=>Object.assign(Object.assign({},s),{setResultRequest:e.InProgress})));try{(await fetch(`${a}/games/${s.gameId}/result`,{headers:{Authorization:`Bearer ${t.accessToken.token}`,"Content-Type":"application/json"},method:"PUT",body:JSON.stringify({team1Goals:s.team1Goals,team2Goals:s.team2Goals})})).ok?n((s=>Object.assign(Object.assign({},s),{setResultRequest:e.Successful}))):n((s=>Object.assign(Object.assign({},s),{setResultRequest:e.Failed})))}catch(s){n((s=>Object.assign(Object.assign({},s),{setResultRequest:e.Failed})))}}(s);break;case 7:await async function(s){n((a=>Object.assign(Object.assign({},a),{gameBets:Object.assign(Object.assign({},a.gameBets),{[s.gameId]:Object.assign(Object.assign({},a.gameBets[s.gameId]),{requestState:e.InProgress})})})));try{let t=await fetch(`${a}/games/${s.gameId}/bets`);if(!t.ok)return void n((a=>Object.assign(Object.assign({},a),{gameBets:Object.assign(Object.assign({},a.gameBets),{[s.gameId]:Object.assign(Object.assign({},a.gameBets[s.gameId]),{requestState:e.Failed})})})));let i=await t.json();n((a=>Object.assign(Object.assign({},a),{gameBets:Object.assign(Object.assign({},a.gameBets),{[s.gameId]:Object.assign(Object.assign({},a.gameBets[s.gameId]),{requestState:e.Successful,bets:i.map((e=>({displayName:e.displayName,choice:e.choice,userId:e.userId})))})})})))}catch(a){n((a=>Object.assign(Object.assign({},a),{gameBets:Object.assign(Object.assign({},a.gameBets),{[s.gameId]:Object.assign(Object.assign({},a.gameBets[s.gameId]),{requestState:e.Failed})})})))}}(s)}})(s.data).catch((e=>console.error(e)))}))}();
//# sourceMappingURL=765a6a328a1b749fa7ee.bundle.js.map