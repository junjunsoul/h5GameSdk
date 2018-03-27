(function(){var v,m;(function(){function l(a){var d=a.factory;a.exports={};delete a.factory;d(function(d){var f=d;"."===d.charAt(0)&&(f=a.id.slice(0,a.id.lastIndexOf("."))+"."+d.slice(2));return v(f)},a.exports,a);return a.exports}var e={},n=[],h={};v=function(a){if(!e[a])throw"module "+a+" not found";if(a in h)throw"Cycle in require graph: "+(n.slice(h[a]).join("->")+"->"+a);if(e[a].factory)try{return h[a]=n.length,n.push(a),l(e[a])}finally{delete h[a],n.pop()}return e[a].exports};m=function(a,d){if(e[a])throw"module "+a+" already defined";e[a]={id:a,factory:d}};m.remove=function(a){delete e[a]};m.moduleMap=e})();"object"===typeof module&&"function"===typeof v&&(module.exports.require=v,module.exports.define=m);m("cordova",function(l,e,n){function h(c,b){var g=document.createEvent("Events");g.initEvent(c,!1,!1);if(b)for(var a in b)b.hasOwnProperty(a)&&(g[a]=b[a]);return g}if(window.cordova&&!(window.cordova instanceof HTMLElement))throw Error("cordova already defined");var a=l("cordova/channel");e=l("cordova/platform");var d=document.addEventListener,k=document.removeEventListener,f=window.addEventListener,b=window.removeEventListener,c={},g={};document.addEventListener=function(b,g,a){var f=b.toLowerCase();"undefined"!=typeof c[f]?c[f].subscribe(g):d.call(document,b,g,a)};window.addEventListener=function(c,b,a){var d=c.toLowerCase();"undefined"!=typeof g[d]?g[d].subscribe(b):f.call(window,c,b,a)};document.removeEventListener=function(b,a,g){var f=b.toLowerCase();"undefined"!=typeof c[f]?c[f].unsubscribe(a):k.call(document,b,a,g)};window.removeEventListener=function(c,a,f){var d=c.toLowerCase();"undefined"!=typeof g[d]?g[d].unsubscribe(a):b.call(window,c,a,f)};var p={define:m,require:l,version:"4.4.0",platformVersion:"4.4.0",platformId:e.id,addWindowEventHandler:function(c){return g[c]=a.create(c)},addStickyDocumentEventHandler:function(b){return c[b]=a.createSticky(b)},addDocumentEventHandler:function(b){return c[b]=a.create(b)},removeWindowEventHandler:function(c){delete g[c]},removeDocumentEventHandler:function(b){delete c[b]},getOriginalHandlers:function(){return{document:{addEventListener:d,removeEventListener:k},window:{addEventListener:f,removeEventListener:b}}},fireDocumentEvent:function(b,a,g){var f=h(b,a);"undefined"!=typeof c[b]?g?c[b].fire(f):setTimeout(function(){"deviceready"==b&&document.dispatchEvent(f);c[b].fire(f)},0):document.dispatchEvent(f)},fireWindowEvent:function(b,c){var a=h(b,c);"undefined"!=typeof g[b]?setTimeout(function(){g[b].fire(a)},0):window.dispatchEvent(a)},callbackId:Math.floor(2E9*Math.random()),callbacks:{},callbackStatus:{NO_RESULT:0,OK:1,CLASS_NOT_FOUND_EXCEPTION:2,ILLEGAL_ACCESS_EXCEPTION:3,INSTANTIATION_EXCEPTION:4,MALFORMED_URL_EXCEPTION:5,IO_EXCEPTION:6,INVALID_ACTION:7,JSON_EXCEPTION:8,ERROR:9},callbackSuccess:function(b,c){p.callbackFromNative(b,!0,c.status,[c.message],c.keepCallback)},callbackError:function(b,c){p.callbackFromNative(b,!1,c.status,[c.message],c.keepCallback)},callbackFromNative:function(c,b,a,g,f){try{var d=p.callbacks[c];d&&(b&&a==p.callbackStatus.OK?d.success&&d.success.apply(null,g):b||d.fail&&d.fail.apply(null,g),f||delete p.callbacks[c])}catch(t){throw c="Error in "+(b?"Success":"Error")+" callbackId: "+c+" : "+t,console&&console.log&&console.log(c),p.fireWindowEvent("cordovacallbackerror",{message:c}),t}},addConstructor:function(c){a.onCordovaReady.subscribe(function(){try{c()}catch(w){console.log("Failed to run constructor: "+w)}})}};n.exports=p});m("cordova/argscheck",function(l,e,n){var h=l("cordova/utils"),a=n.exports,d={A:"Array",D:"Date",N:"Number",S:"String",F:"Function",O:"Object"};a.checkArgs=function(k,f,b,c){if(a.enableChecks){for(var g=null,p,e=0;e<k.length;++e){var l=k.charAt(e),q=l.toUpperCase(),r=b[e];if("*"!=l&&(p=h.typeName(r),(null!==r&&void 0!==r||l!=q)&&p!=d[q])){g="Expected "+d[q];break}}if(g)throw g+=", but got "+p+".",k=e,g='Wrong type for parameter "'+/.*?\((.*?)\)/.exec(c||b.callee)[1].split(", ")[k]+'" of '+f+": "+g,"undefined"==typeof jasmine&&console.error(g),TypeError(g);}};a.getValue=function(a,f){return void 0===a?f:a};a.enableChecks=!0});m("cordova/base64",function(l,e,n){e.fromArrayBuffer=function(a){a=new Uint8Array(a);for(var f=a.byteLength,b="",c,g=d(),p=0;p<f-2;p+=3)c=(a[p]<<16)+(a[p+1]<<8)+a[p+2],b+=g[c>>12],b+=g[c&4095];2==f-p?(c=(a[p]<<16)+(a[p+1]<<8),b+=g[c>>12],b+=h[(c&4095)>>6],b+="="):1==f-p&&(c=a[p]<<16,b+=g[c>>12],b+="==");return b};e.toArrayBuffer=function(a){a="undefined"!=typeof atob?atob(a):(new Buffer(a,"base64")).toString("binary");for(var f=new ArrayBuffer(a.length),b=new Uint8Array(f),c=0,g=a.length;c<g;c++)b[c]=a.charCodeAt(c);return f};var h="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",a,d=function(){a=[];for(var e=0;64>e;e++)for(var f=0;64>f;f++)a[64*e+f]=h[e]+h[f];d=function(){return a};return a}});m("cordova/builder",function(l,e,n){function h(c,b,a){for(var g in c)c.hasOwnProperty(g)&&b.apply(a,[c[g],g])}function a(c,a,f){e.replaceHookForTesting(c,a);var g=!1;try{c[a]=f}catch(w){g=!0}(g||c[a]!==f)&&b.defineGetter(c,a,function(){return f})}function d(c,f,d,e){e?b.defineGetter(c,f,function(){console.log(e);delete c[f];a(c,f,d);return d}):a(c,f,d)}function k(c,a,e,y){h(a,function(a,g){try{var p=a.path?l(a.path):{};e?("undefined"===typeof c[g]?d(c,g,p,a.deprecated):"undefined"!==typeof a.path&&(y?f(c[g],p):d(c,g,p,a.deprecated)),p=c[g]):"undefined"==typeof c[g]?d(c,g,p,a.deprecated):p=c[g];a.children&&k(p,a.children,e,y)}catch(z){b.alert("Exception building Cordova JS globals: "+z+' for key "'+g+'"')}})}function f(c,b){for(var g in b)b.hasOwnProperty(g)&&(c.prototype&&c.prototype.constructor===c?a(c.prototype,g,b[g]):"object"===typeof b[g]&&"object"===typeof c[g]?f(c[g],b[g]):a(c,g,b[g]))}var b=l("cordova/utils");e.buildIntoButDoNotClobber=function(b,a){k(a,b,!1,!1)};e.buildIntoAndClobber=function(b,a){k(a,b,!0,!1)};e.buildIntoAndMerge=function(b,a){k(a,b,!0,!0)};e.recursiveMerge=f;e.assignOrWrapInDeprecateGetter=d;e.replaceHookForTesting=function(){}});m("cordova/channel",function(l,e,n){function h(b){if("function"!==typeof b&&"function"!==typeof b.handleEvent)throw Error("Must provide a function or an EventListener object implementing the handleEvent interface.");}var a=l("cordova/utils"),d=1,k=function(b,a){this.type=b;this.handlers={};this.state=a?1:0;this.fireArgs=null;this.numHandlers=0;this.onHasSubscribersChange=null},f={join:function(b,a){for(var c=a.length,f=c,d=function(){--f||b()},e=0;e<c;e++){if(0===a[e].state)throw Error("Can only use join with sticky channels.");a[e].subscribe(d)}c||b()},create:function(a){return f[a]=new k(a,!1)},createSticky:function(a){return f[a]=new k(a,!0)},deviceReadyChannelsArray:[],deviceReadyChannelsMap:{},waitForInitialization:function(a){if(a){var b=f[a]||this.createSticky(a);this.deviceReadyChannelsMap[a]=b;this.deviceReadyChannelsArray.push(b)}},initializationComplete:function(a){(a=this.deviceReadyChannelsMap[a])&&a.fire()}};k.prototype.subscribe=function(b,c){h(b);var f,e;b&&"object"===typeof b?(f=b.handleEvent,c=b):f=b;2==this.state?f.apply(c||this,this.fireArgs):(e=b.observer_guid,"object"===typeof c&&(f=a.close(c,f)),e||(e=""+d++),f.observer_guid=e,b.observer_guid=e,this.handlers[e]||(this.handlers[e]=f,this.numHandlers++,1==this.numHandlers&&this.onHasSubscribersChange&&this.onHasSubscribersChange()))};k.prototype.unsubscribe=function(a){h(a);a=(a&&"object"===typeof a?a.handleEvent:a).observer_guid;this.handlers[a]&&(delete this.handlers[a],this.numHandlers--,0===this.numHandlers&&this.onHasSubscribersChange&&this.onHasSubscribersChange())};k.prototype.fire=function(a){var c=Array.prototype.slice.call(arguments);1==this.state&&(this.state=2,this.fireArgs=c);if(this.numHandlers){var b=[],f;for(f in this.handlers)b.push(this.handlers[f]);for(f=0;f<b.length;++f)b[f].apply(this,c);2==this.state&&this.numHandlers&&(this.numHandlers=0,this.handlers={},this.onHasSubscribersChange&&this.onHasSubscribersChange())}};f.createSticky("onDOMContentLoaded");f.createSticky("onNativeReady");f.createSticky("onCordovaReady");f.createSticky("onPluginsReady");f.createSticky("onDeviceReady");f.create("onResume");f.create("onPause");f.waitForInitialization("onCordovaReady");f.waitForInitialization("onDOMContentLoaded");n.exports=f});m("cordova/exec",function(l,e,n){function h(a){if(!a||"Array"!=p.typeName(a))return a;var b=[];a.forEach(function(a,c){"ArrayBuffer"==p.typeName(a)?b.push({CDVType:"ArrayBuffer",data:y.fromArrayBuffer(a)}):b.push(a)});return b}function a(a){if("ArrayBuffer"==a.CDVType){a=atob(a.data);for(var b=new Uint8Array(a.length),c=0;c<a.length;c++)b[c]=a.charCodeAt(c);a=b.buffer}return a}function d(b){var c=[];b&&b.hasOwnProperty("CDVType")?"MultiPart"==b.CDVType?b.messages.forEach(function(b){c.push(a(b))}):c.push(a(b)):c.push(b);return c}function k(a,b,c,d,e){var k;if("string"!==typeof a)k="INVALID";else throw Error("The old format of this exec call has been removed (deprecated since 2.1). Change to: cordova.exec(null, null, 'Service', 'action', [ arg1, arg2 ]);");e=e||[];if(a||b)k=c+g.callbackId++,g.callbacks[k]={success:a,fail:b};e=h(e);q.push(JSON.stringify([k,c,d,e]));r||1!=q.length||f()}function f(){document.body?(w&&w.contentWindow?w.contentWindow.location="gap://ready":(w=document.createElement("iframe"),w.style.display="none",w.src="gap://ready",document.body.appendChild(w)),m=setTimeout(function(){if(q.length){var a;a=b();if(c!==a&&k!==a){for(a=q.shift();a;){a=JSON.parse(a);var d=g.callbacks[a[0]]||{};c(d.success,d.fail,a[1],a[2],a[3]);a=q.shift()}a=!0}else a=!1;a||f()}},50)):setTimeout(f)}function b(){var a=l("cordova/exec");return"function"===typeof a.nativeFetchMessages&&"function"===typeof a.nativeEvalAndFetch&&"function"===typeof a.nativeCallback&&c!==a?a:k}function c(){b().apply(null,arguments)}var g=l("cordova"),p=l("cordova/utils"),y=l("cordova/base64"),w,q=[],r=0,m=0;k.nativeFetchMessages=function(){m&&(clearTimeout(m),m=0);if(!q.length)return"";var a="["+q.join(",")+"]";q.length=0;return a};k.nativeCallback=function(a,b,c,f,e){return k.nativeEvalAndFetch(function(){var e=0===b||1===b,k=d(c);setTimeout(function(){g.callbackFromNative(a,e,b,k,f)},0)})};k.nativeEvalAndFetch=function(a){r++;try{return a(),k.nativeFetchMessages()}finally{r--}};c.nativeFetchMessages=function(){return b().nativeFetchMessages.apply(null,arguments)};c.nativeEvalAndFetch=function(){return b().nativeEvalAndFetch.apply(null,arguments)};c.nativeCallback=function(){return b().nativeCallback.apply(null,arguments)};n.exports=c});m("cordova/exec/proxy",function(l,e,m){var h={};m.exports={add:function(a,d){console.log("adding proxy for "+a);return h[a]=d},remove:function(a){var d=h[a];delete h[a];h[a]=null;return d},get:function(a,d){return h[a]?h[a][d]:null}}});m("cordova/init",function(l,e,m){function h(a){for(var b=0;b<a.length;++b)2!=a[b].state&&console.log("Channel not fired: "+a[b].type)}function a(a){var b=function(){};b.prototype=a;var f=new b;if(b.bind)for(var d in a)"function"==typeof a[d]?f[d]=a[d].bind(a):function(b){c.defineGetterSetter(f,d,function(){return a[b]})}(d);return f}var d=l("cordova/channel");e=l("cordova");var k=l("cordova/modulemapper"),f=l("cordova/platform"),b=l("cordova/pluginloader"),c=l("cordova/utils"),g=[d.onNativeReady,d.onPluginsReady];window.setTimeout(function(){2!=d.onDeviceReady.state&&(console.log("deviceready has not fired after 5 seconds."),h(g),h(d.deviceReadyChannelsArray))},5E3);window.navigator&&(window.navigator=a(window.navigator));window.console||(window.console={log:function(){}});window.console.warn||(window.console.warn=function(a){this.log("warn: "+a)});d.onPause=e.addDocumentEventHandler("pause");d.onResume=e.addDocumentEventHandler("resume");d.onActivated=e.addDocumentEventHandler("activated");d.onDeviceReady=e.addStickyDocumentEventHandler("deviceready");"complete"==document.readyState||"interactive"==document.readyState?d.onDOMContentLoaded.fire():document.addEventListener("DOMContentLoaded",function(){d.onDOMContentLoaded.fire()},!1);window._nativeReady&&d.onNativeReady.fire();k.clobbers("cordova","cordova");k.clobbers("cordova/exec","cordova.exec");k.clobbers("cordova/exec","Cordova.exec");f.bootstrap&&f.bootstrap();setTimeout(function(){b.load(function(){d.onPluginsReady.fire()})},0);d.join(function(){k.mapModules(window);f.initialize&&f.initialize();d.onCordovaReady.fire();d.join(function(){l("cordova").fireDocumentEvent("deviceready")},d.deviceReadyChannelsArray)},g)});m("cordova/init_b",function(l,e,m){function h(a){for(var b=0;b<a.length;++b)2!=a[b].state&&console.log("Channel not fired: "+a[b].type)}function a(a){var b=function(){};b.prototype=a;var f=new b;if(b.bind)for(var d in a)"function"==typeof a[d]?f[d]=a[d].bind(a):function(b){c.defineGetterSetter(f,d,function(){return a[b]})}(d);return f}var d=l("cordova/channel");e=l("cordova");var k=l("cordova/modulemapper"),f=l("cordova/platform"),b=l("cordova/pluginloader"),c=l("cordova/utils"),g=[d.onDOMContentLoaded,d.onNativeReady,d.onPluginsReady];e.exec=l("cordova/exec");window.setTimeout(function(){2!=d.onDeviceReady.state&&(console.log("deviceready has not fired after 5 seconds."),h(g),h(d.deviceReadyChannelsArray))},5E3);window.navigator&&(window.navigator=a(window.navigator));window.console||(window.console={log:function(){}});window.console.warn||(window.console.warn=function(a){this.log("warn: "+a)});d.onPause=e.addDocumentEventHandler("pause");d.onResume=e.addDocumentEventHandler("resume");d.onActivated=e.addDocumentEventHandler("activated");d.onDeviceReady=e.addStickyDocumentEventHandler("deviceready");"complete"==document.readyState||"interactive"==document.readyState?d.onDOMContentLoaded.fire():document.addEventListener("DOMContentLoaded",function(){d.onDOMContentLoaded.fire()},!1);window._nativeReady&&d.onNativeReady.fire();f.bootstrap&&f.bootstrap();setTimeout(function(){b.load(function(){d.onPluginsReady.fire()})},0);d.join(function(){k.mapModules(window);f.initialize&&f.initialize();d.onCordovaReady.fire();d.join(function(){l("cordova").fireDocumentEvent("deviceready")},d.deviceReadyChannelsArray)},g)});m("cordova/modulemapper",function(l,e,n){function h(a,c,e,h){if(!(c in d))throw Error("Module "+c+" does not exist.");k.push(a,c,e);h&&(f[e]=h)}var a=l("cordova/builder"),d=m.moduleMap,k,f;e.reset=function(){k=[];f={}};e.clobbers=function(a,c,f){h("c",a,c,f)};e.merges=function(a,c,f){h("m",a,c,f)};e.defaults=function(a,c,f){h("d",a,c,f)};e.runs=function(a){h("r",a,null)};e.mapModules=function(b){var c={};b.CDV_origSymbols=c;for(var d=0,e=k.length;d<e;d+=3){var h=k[d],m=l(k[d+1]);if("r"!=h){var q=k[d+2],r=q.lastIndexOf("."),n=q.substr(0,r),r=q.substr(r+1),u=q in f?"Access made to deprecated symbol: "+q+". "+u:null;var t;t=b;if(n){for(var n=n.split("."),x=t,v=0;t=n[v];++v)x=x[t]=x[t]||{};n=x}else n=t;t=n[r];if("m"==h&&t)a.recursiveMerge(t,m);else if("d"==h&&!t||"d"!=h)q in c||(c[q]=t),a.assignOrWrapInDeprecateGetter(n,r,m,u)}}};e.getOriginalSymbol=function(a,c){var b=a.CDV_origSymbols;if(b&&c in b)return b[c];c=c.split(".");for(b=0;b<c.length;++b)a=a&&a[c[b]];return a};e.reset()});m("cordova/modulemapper_b",function(l,e,m){function h(a,b,c,e){d.push(a,b,c);e&&(k[c]=e)}var a=l("cordova/builder"),d=[],k;e.reset=function(){d=[];k={}};e.clobbers=function(a,b,c){h("c",a,b,c)};e.merges=function(a,b,c){h("m",a,b,c)};e.defaults=function(a,b,c){h("d",a,b,c)};e.runs=function(a){h("r",a,null)};e.mapModules=function(f){var b={};f.CDV_origSymbols=b;for(var c=0,e=d.length;c<e;c+=3){var h=d[c],m=l(d[c+1]);if("r"!=h){var n=d[c+2],q=n.lastIndexOf("."),r=n.substr(0,q),q=n.substr(q+1),v=n in k?"Access made to deprecated symbol: "+n+". "+v:null;var u;u=f;if(r){for(var r=r.split("."),t=u,x=0;u=r[x];++x)t=t[u]=t[u]||{};r=t}else r=u;u=r[q];if("m"==h&&u)a.recursiveMerge(u,m);else if("d"==h&&!u||"d"!=h)n in b||(b[n]=u),a.assignOrWrapInDeprecateGetter(r,q,m,v)}}};e.getOriginalSymbol=function(a,b){var c=a.CDV_origSymbols;if(c&&b in c)return c[b];b=b.split(".");for(c=0;c<b.length;++c)a=a&&a[b[c]];return a};e.reset()});m("cordova/platform",function(l,e,m){m.exports={id:"ios",bootstrap:function(){l("cordova/channel").onNativeReady.fire()}}});m("cordova/pluginloader",function(l,e,n){function h(a,b,c,d){d=d||c;a in m.moduleMap?c():e.injectScript(b,function(){a in m.moduleMap?c():d()},d)}function a(a,b,c){function d(){if(!--f){for(var a=0,d;d=b[a];a++){if(d.clobbers&&d.clobbers.length)for(var e=0;e<d.clobbers.length;e++)k.clobbers(d.id,d.clobbers[e]);if(d.merges&&d.merges.length)for(e=0;e<d.merges.length;e++)k.merges(d.id,d.merges[e]);d.runs&&k.runs(d.id)}c()}}var f=b.length;if(f)for(var e=0;e<b.length;e++)h(b[e].id,a+b[e].file,d);else c()}function d(){for(var a=null,b=document.getElementsByTagName("script"),c=b.length-1;-1<c;c--){var d=b[c].src.replace(/\?.*$/,"");if(d.indexOf("/cordova.js")==d.length-11){a=d.substring(0,d.length-11)+"/";break}}return a}var k=l("cordova/modulemapper");l("cordova/urlutil");e.injectScript=function(a,b,c){var d=document.createElement("script");d.onload=b;d.onerror=c;d.src=a;document.head.appendChild(d)};e.load=function(f){var b=d();null===b&&(console.log("Could not find cordova.js script tag. Plugin loading may fail."),b="");h("cordova/plugin_list",b+"cordova_plugins.js",function(){var c=l("cordova/plugin_list");a(b,c,f)},f)}});m("cordova/pluginloader_b",function(l,e,m){var h=l("cordova/modulemapper");e.load=function(a){var d=l("cordova/plugin_list");if(d&&d.length)for(var e=0,f;f=d[e];e++){if(f.clobbers&&f.clobbers.length)for(var b=0;b<f.clobbers.length;b++)h.clobbers(f.id,f.clobbers[b]);if(f.merges&&f.merges.length)for(b=0;b<f.merges.length;b++)h.merges(f.id,f.merges[b]);f.runs&&h.runs(f.id)}a()}});m("cordova/urlutil",function(l,e,m){e.makeAbsolute=function(e){var a=document.createElement("a");a.href=e;return a.href}});m("cordova/utils",function(l,e,m){function h(a){for(var d="",e=0;e<a;e++){var f=parseInt(256*Math.random(),10).toString(16);1==f.length&&(f="0"+f);d+=f}return d}e.defineGetterSetter=function(a,d,e,f){Object.defineProperty?(e={get:e,configurable:!0},f&&(e.set=f),Object.defineProperty(a,d,e)):(a.__defineGetter__(d,e),f&&a.__defineSetter__(d,f))};e.defineGetter=e.defineGetterSetter;e.arrayIndexOf=function(a,d){if(a.indexOf)return a.indexOf(d);for(var e=a.length,f=0;f<e;++f)if(a[f]==d)return f;return-1};e.arrayRemove=function(a,d){d=e.arrayIndexOf(a,d);-1!=d&&a.splice(d,1);return-1!=d};e.typeName=function(a){return Object.prototype.toString.call(a).slice(8,-1)};e.isArray=Array.isArray||function(a){return"Array"==e.typeName(a)};e.isDate=function(a){return a instanceof Date};e.clone=function(a){if(!a||"function"==typeof a||e.isDate(a)||"object"!=typeof a)return a;var d,k;if(e.isArray(a)){d=[];for(k=0;k<a.length;++k)d.push(e.clone(a[k]));return d}d={};for(k in a)k in d&&d[k]==a[k]||"undefined"==typeof a[k]||"unknown"==typeof a[k]||(d[k]=e.clone(a[k]));return d};e.close=function(a,d,e){return function(){return d.apply(a,e||arguments)}};e.createUUID=function(){return h(4)+"-"+h(2)+"-"+h(2)+"-"+h(2)+"-"+h(6)};e.extend=function(){var a=function(){};return function(d,e){a.prototype=e.prototype;d.prototype=new a;d.__super__=e.prototype;d.prototype.constructor=d}}();e.alert=function(a){window.alert?window.alert(a):console&&console.log&&console.log(a)}});window.cordova=v("cordova");v("cordova/init")})();