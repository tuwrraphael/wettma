!function(){"use strict";let e={code:"code-4f55441acf79f82a62daeb9f34e0713c5fc05bb1",asset:"asset-v1"};self.addEventListener("install",(function(t){let a=[{'revision':null,'url':'/00a76e1b588a62b0fad9.svg'},{'revision':null,'url':'/05c8d69783e68aaad2f4.svg'},{'revision':null,'url':'/0c35d18bf06992036b69.woff2'},{'revision':null,'url':'/12e7432b428f8d631eb5.svg'},{'revision':null,'url':'/151.8c5b220bf6f482881a90.css'},{'revision':null,'url':'/1a25a96e26fcca676c08.svg'},{'revision':null,'url':'/203cd83bad982b3f2d2a.bundle.js'},{'revision':null,'url':'/219aa9140e099e6c72ed.woff2'},{'revision':null,'url':'/226bc11fbeff4566cd8e.bundle.js'},{'revision':null,'url':'/3a4004a46a653d4b2166.woff'},{'revision':null,'url':'/3b67d7bed888271edff6.svg'},{'revision':null,'url':'/3baa5b8f3469222b822d.woff'},{'revision':null,'url':'/3ea7f906eaf807123a28.svg'},{'revision':null,'url':'/4d73cb90e394b34b7670.woff'},{'revision':null,'url':'/4dd2af1e8df532f41db8.woff2'},{'revision':null,'url':'/4ef4218c522f1eb6b5b1.woff2'},{'revision':null,'url':'/51e6180ced2cf59fd51e.svg'},{'revision':null,'url':'/554.8c5b220bf6f482881a90.css'},{'revision':null,'url':'/5697f2973616282e4c76.svg'},{'revision':null,'url':'/5d681e2edae8c60630db.woff'},{'revision':null,'url':'/5ea38fff9eebef99c5df.woff'},{'revision':null,'url':'/5ec13287c2da0d77a7e7.svg'},{'revision':null,'url':'/5f600d98a73d800ae575.woff2'},{'revision':null,'url':'/64cfb66c866ea50cad47.woff2'},{'revision':null,'url':'/698.914aee05d18f9b23de70.css'},{'revision':null,'url':'/6ab41579915de3e4b806.bundle.js'},{'revision':null,'url':'/6d89acbd21d7e3fbecb2.woff'},{'revision':null,'url':'/6f420cf17cc0d7676fad.woff2'},{'revision':null,'url':'/73288d91c325e82a5b92.woff'},{'revision':null,'url':'/77f90d8e620af4d9604d.svg'},{'revision':null,'url':'/7be6ca137c0a396154ac.svg'},{'revision':null,'url':'/876.c5502427a37266afd21b.css'},{'revision':null,'url':'/92fbd4e93cf0a5dbebaa.woff2'},{'revision':null,'url':'/9611c2cc85866ed92021.bundle.js'},{'revision':null,'url':'/9e784e4a7531ed612838.bundle.js'},{'revision':null,'url':'/a69b6bb076d89808e064.svg'},{'revision':null,'url':'/b3825b28f7a64779d80d.svg'},{'revision':null,'url':'/b89a5b80ca1a71c3b96a.svg'},{'revision':null,'url':'/b9a346574cdc8950dd34.svg'},{'revision':null,'url':'/bc63d25be57acf721e56.svg'},{'revision':null,'url':'/c380809fd3677d7d6903.woff2'},{'revision':null,'url':'/c945dfdfaee26ad2861c.svg'},{'revision':null,'url':'/d3314e07ae686ec6a2d7.bundle.js'},{'revision':null,'url':'/dbdc272cb217fd407ff8.svg'},{'revision':null,'url':'/e02e9d6ff5547f7e9962.woff'},{'revision':null,'url':'/f3f2e25c45a219c68654.svg'},{'revision':null,'url':'/f882956fd323fd322f31.woff'},{'revision':'550ba503bcd7ed802fe15ee8b4fc3cf3','url':'/favicons/android-chrome-192x192.png'},{'revision':'711dad101d123505c0c469c5d7760233','url':'/favicons/android-chrome-512x512.png'},{'revision':'ba85e1a9df93f1c3d0866beb5280100f','url':'/favicons/apple-touch-icon.png'},{'revision':'e4e40b0c82d228add33b5bcfe276a859','url':'/favicons/browserconfig.xml'},{'revision':'530cc8a62de8133286a5081596547b74','url':'/favicons/favicon-16x16.png'},{'revision':'692b4410ea10a5d7e028520e999f410d','url':'/favicons/favicon-32x32.png'},{'revision':'434b14a5b35621f8e7c0d951d4b2d875','url':'/favicons/favicon.ico'},{'revision':'708be8b4a19471ca2d41ca3eabd60c3e','url':'/favicons/mstile-144x144.png'},{'revision':'062469cabd3f11e8d19fad1638c91641','url':'/favicons/mstile-150x150.png'},{'revision':'1abe39d1601dadf71f2950779e3b6e19','url':'/favicons/mstile-310x150.png'},{'revision':'f034e13722c24ba9140653dd2f1704c0','url':'/favicons/mstile-310x310.png'},{'revision':'5efe430eb3b5a0a3bc689c914770b6d8','url':'/favicons/mstile-70x70.png'},{'revision':'be561b305b62a6f7e9847de99dba1b3c','url':'/favicons/safari-pinned-tab.svg'},{'revision':'4a63d3f6d096dc39acdad199d51ef36c','url':'/favicons/site.webmanifest'},{'revision':null,'url':'/index.80bacb6132220dcdeade.css'},{'revision':'9c04970ecbb4b3d992f5f02f7992c575','url':'/index.html'},{'revision':'a2e87b605f002790f705e38f370e6116','url':'/licenses.txt'},{'revision':'95033bb08279a77c3a49d5fdbe4aebb5','url':'/site.webmanifest'}].reduce(((e,t)=>(t.url.indexOf("favicons/")>-1||t.url.indexOf(".svg")>-1?e.asset.push(t.url):e.code.push(t.url),e)),{asset:[],code:[]}),s=[{name:e.code,assets:[...a.code]},{name:e.asset,assets:a.asset}];t.waitUntil((async()=>{let e=s.map((async e=>{let t=await caches.open(e.name);await t.addAll(e.assets)}));await Promise.all(e)})())})),self.addEventListener("activate",(t=>{t.waitUntil((async()=>{let t=await caches.keys(),a=Object.values(e),s=t.filter((e=>a.indexOf(e)<0)).map((async e=>{await caches.delete(e)}));await Promise.all(s)})())})),self.addEventListener("fetch",(function(t){if("navigate"!==t.request.mode)t.respondWith(caches.match(t.request).then((function(e){return e||fetch(t.request)})));else{if("GET"!==t.request.method)return;t.respondWith(caches.match("index.html",{cacheName:e.code}).then((e=>e||fetch(t.request))))}}))}();
//# sourceMappingURL=sw.js.map