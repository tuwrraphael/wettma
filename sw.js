!function(){"use strict";let e={code:"code-951755b74fe494f4f050351672c5f9692f66553a",asset:"asset-v1",webfont:"webfont"};self.addEventListener("install",(function(t){let s=[{'revision':null,'url':'/wettma/12677a13b267b1c7ecf0.bundle.js'},{'revision':null,'url':'/wettma/5d6b4c625b8c432438f9.bundle.js'},{'revision':null,'url':'/wettma/a82f3680ccf29b4a91f2.bundle.js'},{'revision':'550ba503bcd7ed802fe15ee8b4fc3cf3','url':'/wettma/favicons/android-chrome-192x192.png'},{'revision':'711dad101d123505c0c469c5d7760233','url':'/wettma/favicons/android-chrome-512x512.png'},{'revision':'ba85e1a9df93f1c3d0866beb5280100f','url':'/wettma/favicons/apple-touch-icon.png'},{'revision':'e4e40b0c82d228add33b5bcfe276a859','url':'/wettma/favicons/browserconfig.xml'},{'revision':'530cc8a62de8133286a5081596547b74','url':'/wettma/favicons/favicon-16x16.png'},{'revision':'692b4410ea10a5d7e028520e999f410d','url':'/wettma/favicons/favicon-32x32.png'},{'revision':'434b14a5b35621f8e7c0d951d4b2d875','url':'/wettma/favicons/favicon.ico'},{'revision':'708be8b4a19471ca2d41ca3eabd60c3e','url':'/wettma/favicons/mstile-144x144.png'},{'revision':'062469cabd3f11e8d19fad1638c91641','url':'/wettma/favicons/mstile-150x150.png'},{'revision':'1abe39d1601dadf71f2950779e3b6e19','url':'/wettma/favicons/mstile-310x150.png'},{'revision':'f034e13722c24ba9140653dd2f1704c0','url':'/wettma/favicons/mstile-310x310.png'},{'revision':'5efe430eb3b5a0a3bc689c914770b6d8','url':'/wettma/favicons/mstile-70x70.png'},{'revision':'be561b305b62a6f7e9847de99dba1b3c','url':'/wettma/favicons/safari-pinned-tab.svg'},{'revision':'4a63d3f6d096dc39acdad199d51ef36c','url':'/wettma/favicons/site.webmanifest'},{'revision':null,'url':'/wettma/index.da58e4bc52af06e798da.css'},{'revision':'7ed23bfbbdd2e9543cbb420dfdaaee47','url':'/wettma/index.html'},{'revision':'8362e58e63b1dfbe80cd12c8b65a1523','url':'/wettma/licenses.txt'},{'revision':'95033bb08279a77c3a49d5fdbe4aebb5','url':'/wettma/site.webmanifest'}].reduce(((e,t)=>(t.url.indexOf("favicons/")>-1?e.asset.push(t.url):e.code.push(t.url),e)),{asset:[],code:[]}),a=[{name:e.code,assets:[...s.code]},{name:e.asset,assets:s.asset},{name:e.webfont,assets:["https://fonts.googleapis.com/icon?family=Material+Icons","https://fonts.googleapis.com/css?family=Roboto:300,400,500&display=swap"]}];t.waitUntil((async()=>{let e=a.map((async e=>{let t=await caches.open(e.name);await t.addAll(e.assets)}));await Promise.all(e)})())})),self.addEventListener("activate",(t=>{t.waitUntil((async()=>{let t=await caches.keys(),s=Object.values(e),a=t.filter((e=>s.indexOf(e)<0)).map((async e=>{await caches.delete(e)}));await Promise.all(a)})())})),self.addEventListener("fetch",(function(t){if("navigate"!==t.request.mode)t.respondWith(caches.match(t.request).then((function(s){return s||(["https://fonts.gstatic.com","https://fonts.googleapis.com"].some((e=>t.request.url.startsWith(e)))&&t.waitUntil((async()=>{(await caches.open(e.webfont)).add(t.request)})()),fetch(t.request))})));else{if("GET"!==t.request.method)return;t.respondWith(caches.match("index.html",{cacheName:e.code}).then((e=>e||fetch(t.request))))}}))}();
//# sourceMappingURL=sw.js.map