"use strict";var precacheConfig=[["/pdv-mobile/index.html","7b0d9ffba43bb75cc503e068b232396e"],["/pdv-mobile/static/css/main.419ae16b.css","05ae82b16e02fb15bb3583c132e37bef"],["/pdv-mobile/static/js/0.a198cfed.chunk.js","9f6cc03b6a53ed4f5290cd11f134f5ac"],["/pdv-mobile/static/js/1.304935ab.chunk.js","a8882c7f7af3f87520ab299f029d4133"],["/pdv-mobile/static/js/2.02d03099.chunk.js","3a105cf44a81b6c8b3e4cd50be3cf6b2"],["/pdv-mobile/static/js/3.728a2a13.chunk.js","eb8066906318bc5188794e69fe77184c"],["/pdv-mobile/static/js/4.3e3bb3c7.chunk.js","ddbb3556e3b6bb3ba6a76b29e9f1fcb4"],["/pdv-mobile/static/js/5.522a32dc.chunk.js","2ebdcb7d16d4def22478d1177c594218"],["/pdv-mobile/static/js/main.38751b7e.js","b69b7ae571eb64376d6b8e71b2fc347e"],["/pdv-mobile/static/media/iconfont.5c25e1cb.svg","5c25e1cb9735adf1b556f42b8df9b7d1"],["/pdv-mobile/static/media/iconfont.7e008a77.eot","7e008a771d5079e5051b632adcff1243"],["/pdv-mobile/static/media/iconfont.d828102a.ttf","d828102abc66b0a0a7cd5eb3f9b4e2b4"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var n=new URL(e);return"/"===n.pathname.slice(-1)&&(n.pathname+=t),n.toString()},cleanResponse=function(t){return t.redirected?("body"in t?Promise.resolve(t.body):t.blob()).then(function(e){return new Response(e,{headers:t.headers,status:t.status,statusText:t.statusText})}):Promise.resolve(t)},createCacheKey=function(e,t,n,r){var a=new URL(e);return r&&a.pathname.match(r)||(a.search+=(a.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(n)),a.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var n=new URL(t).pathname;return e.some(function(e){return n.match(e)})},stripIgnoredUrlParameters=function(e,n){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(t){return n.every(function(e){return!e.test(t[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],n=e[1],r=new URL(t,self.location),a=createCacheKey(r,hashParamName,n,/\.\w{8}\./);return[r.toString(),a]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(r){return setOfCachedUrls(r).then(function(n){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!n.has(t)){var e=new Request(t,{credentials:"same-origin"});return fetch(e).then(function(e){if(!e.ok)throw new Error("Request for "+t+" returned a response with status "+e.status);return cleanResponse(e).then(function(e){return r.put(t,e)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var n=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(t){return t.keys().then(function(e){return Promise.all(e.map(function(e){if(!n.has(e.url))return t.delete(e)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(t){if("GET"===t.request.method){var e,n=stripIgnoredUrlParameters(t.request.url,ignoreUrlParametersMatching),r="index.html";(e=urlsToCacheKeys.has(n))||(n=addDirectoryIndex(n,r),e=urlsToCacheKeys.has(n));var a="/pdv-mobile/index.html";!e&&"navigate"===t.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],t.request.url)&&(n=new URL(a,self.location).toString(),e=urlsToCacheKeys.has(n)),e&&t.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(n)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(e){return console.warn('Couldn\'t serve response for "%s" from cache: %O',t.request.url,e),fetch(t.request)}))}});