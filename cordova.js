(function(){var v,m;(function(){function k(a){var b=a.factory;a.exports={};delete a.factory;b(function(b){var c=b;"."===b.charAt(0)&&(c=a.id.slice(0,a.id.lastIndexOf("."))+"."+b.slice(2));return v(c)},a.exports,a);return a.exports}var d={},p=[],h={};v=function(a){if(!d[a])throw"module "+a+" not found";if(a in h)throw"Cycle in require graph: "+(p.slice(h[a]).join("->")+"->"+a);if(d[a].factory)try{return h[a]=p.length,p.push(a),k(d[a])}finally{delete h[a],p.pop()}return d[a].exports};m=function(a,b){if(d[a])throw"module "+a+" already defined";d[a]={id:a,factory:b}};m.remove=function(a){delete d[a]};m.moduleMap=d})();"object"===typeof module&&"function"===typeof v&&(module.exports.require=v,module.exports.define=m);m("cordova",function(k,d,p){function h(e,a){var f=document.createEvent("Events");f.initEvent(e,!1,!1);if(a)for(var b in a)a.hasOwnProperty(b)&&(f[b]=a[b]);return f}if(window.cordova&&!(window.cordova instanceof HTMLElement))throw Error("cordova already defined");var a=k("cordova/channel");d=k("cordova/platform");var b=document.addEventListener,g=document.removeEventListener,c=window.addEventListener,f=window.removeEventListener,e={},l={};document.addEventListener=function(a,f,c){var l=a.toLowerCase();"undefined"!=typeof e[l]?e[l].subscribe(f):b.call(document,a,f,c)};window.addEventListener=function(e,a,f){var b=e.toLowerCase();"undefined"!=typeof l[b]?l[b].subscribe(a):c.call(window,e,a,f)};document.removeEventListener=function(a,f,b){var c=a.toLowerCase();"undefined"!=typeof e[c]?e[c].unsubscribe(f):g.call(document,a,f,b)};window.removeEventListener=function(a,e,b){var c=a.toLowerCase();"undefined"!=typeof l[c]?l[c].unsubscribe(e):f.call(window,a,e,b)};var n={define:m,require:k,version:"6.2.3",platformVersion:"6.2.3",platformId:d.id,addWindowEventHandler:function(e){return l[e]=a.create(e)},addStickyDocumentEventHandler:function(f){return e[f]=a.createSticky(f)},addDocumentEventHandler:function(f){return e[f]=a.create(f)},removeWindowEventHandler:function(e){delete l[e]},removeDocumentEventHandler:function(a){delete e[a]},getOriginalHandlers:function(){return{document:{addEventListener:b,removeEventListener:g},window:{addEventListener:c,removeEventListener:f}}},fireDocumentEvent:function(a,f,b){var c=h(a,f);"undefined"!=typeof e[a]?b?e[a].fire(c):setTimeout(function(){"deviceready"==a&&document.dispatchEvent(c);e[a].fire(c)},0):document.dispatchEvent(c)},fireWindowEvent:function(a,e){var f=h(a,e);"undefined"!=typeof l[a]?setTimeout(function(){l[a].fire(f)},0):window.dispatchEvent(f)},callbackId:Math.floor(2E9*Math.random()),callbacks:{},callbackStatus:{NO_RESULT:0,OK:1,CLASS_NOT_FOUND_EXCEPTION:2,ILLEGAL_ACCESS_EXCEPTION:3,INSTANTIATION_EXCEPTION:4,MALFORMED_URL_EXCEPTION:5,IO_EXCEPTION:6,INVALID_ACTION:7,JSON_EXCEPTION:8,ERROR:9},callbackSuccess:function(a,e){n.callbackFromNative(a,!0,e.status,[e.message],e.keepCallback)},callbackError:function(a,e){n.callbackFromNative(a,!1,e.status,[e.message],e.keepCallback)},callbackFromNative:function(a,e,f,b,c){try{var l=n.callbacks[a];l&&(e&&f==n.callbackStatus.OK?l.success&&l.success.apply(null,b):e||l.fail&&l.fail.apply(null,b),c||delete n.callbacks[a])}catch(r){throw a="Error in "+(e?"Success":"Error")+" callbackId: "+a+" : "+r,console&&console.log&&console.log(a),n.fireWindowEvent("cordovacallbackerror",{message:a}),r}},addConstructor:function(e){a.onCordovaReady.subscribe(function(){try{e()}catch(A){console.log("Failed to run constructor: "+A)}})}};p.exports=n});m("cordova/android/nativeapiprovider",function(k,d,p){var h=this._cordovaNative||k("cordova/android/promptbasednativeapi"),a=h;p.exports={get:function(){return a},setPreferPrompt:function(b){a=b?k("cordova/android/promptbasednativeapi"):h},set:function(b){a=b}}});m("cordova/android/promptbasednativeapi",function(k,d,p){p.exports={exec:function(d,a,b,g,c){return prompt(c,"gap:"+JSON.stringify([d,a,b,g]))},setNativeToJsBridgeMode:function(d,a){prompt(a,"gap_bridge_mode:"+d)},retrieveJsMessages:function(d,a){return prompt(+a,"gap_poll:"+d)}}});m("cordova/argscheck",function(k,d,p){var h=k("cordova/utils"),a=p.exports,b={A:"Array",D:"Date",N:"Number",S:"String",F:"Function",O:"Object"};a.checkArgs=function(g,c,f,e){if(a.enableChecks){for(var l=null,n,d=0;d<g.length;++d){var k=g.charAt(d),t=k.toUpperCase(),q=f[d];if("*"!=k&&(n=h.typeName(q),(null!==q&&void 0!==q||k!=t)&&n!=b[t])){l="Expected "+b[t];break}}if(l)throw l+=", but got "+n+".",g=d,l='Wrong type for parameter "'+/.*?\((.*?)\)/.exec(e||f.callee)[1].split(", ")[g]+'" of '+c+": "+l,"undefined"==typeof jasmine&&console.error(l),TypeError(l);}};a.getValue=function(a,b){return void 0===a?b:a};a.enableChecks=!0});m("cordova/base64",function(k,d,p){d.fromArrayBuffer=function(a){a=new Uint8Array(a);for(var c=a.byteLength,f="",e,l=b(),n=0;n<c-2;n+=3)e=(a[n]<<16)+(a[n+1]<<8)+a[n+2],f+=l[e>>12],f+=l[e&4095];2==c-n?(e=(a[n]<<16)+(a[n+1]<<8),f+=l[e>>12],f+=h[(e&4095)>>6],f+="="):1==c-n&&(e=a[n]<<16,f+=l[e>>12],f+="==");return f};d.toArrayBuffer=function(a){a="undefined"!=typeof atob?atob(a):(new Buffer(a,"base64")).toString("binary");for(var b=new ArrayBuffer(a.length),f=new Uint8Array(b),e=0,l=a.length;e<l;e++)f[e]=a.charCodeAt(e);return b};var h="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",a,b=function(){a=[];for(var d=0;64>d;d++)for(var c=0;64>c;c++)a[64*d+c]=h[d]+h[c];b=function(){return a};return a}});m("cordova/builder",function(k,d,p){function h(a,f,b){for(var e in a)a.hasOwnProperty(e)&&f.apply(b,[a[e],e])}function a(a,b,c){d.replaceHookForTesting(a,b);var e=!1;try{a[b]=c}catch(A){e=!0}(e||a[b]!==c)&&f.defineGetter(a,b,function(){return c})}function b(e,b,c,d){d?f.defineGetter(e,b,function(){console.log(d);delete e[b];a(e,b,c);return c}):a(e,b,c)}function g(a,l,d,B){h(l,function(e,l){try{var n=e.path?k(e.path):{};d?("undefined"===typeof a[l]?b(a,l,n,e.deprecated):"undefined"!==typeof e.path&&(B?c(a[l],n):b(a,l,n,e.deprecated)),n=a[l]):"undefined"==typeof a[l]?b(a,l,n,e.deprecated):n=a[l];e.children&&g(n,e.children,d,B)}catch(x){f.alert("Exception building Cordova JS globals: "+x+' for key "'+l+'"')}})}function c(e,b){for(var f in b)b.hasOwnProperty(f)&&(e.prototype&&e.prototype.constructor===e?a(e.prototype,f,b[f]):"object"===typeof b[f]&&"object"===typeof e[f]?c(e[f],b[f]):a(e,f,b[f]))}var f=k("cordova/utils");d.buildIntoButDoNotClobber=function(a,f){g(f,a,!1,!1)};d.buildIntoAndClobber=function(a,f){g(f,a,!0,!1)};d.buildIntoAndMerge=function(a,f){g(f,a,!0,!0)};d.recursiveMerge=c;d.assignOrWrapInDeprecateGetter=b;d.replaceHookForTesting=function(){}});m("cordova/channel",function(k,d,p){function h(a){if("function"!==typeof a&&"function"!==typeof a.handleEvent)throw Error("Must provide a function or an EventListener object implementing the handleEvent interface.");}var a=k("cordova/utils"),b=1,g=function(a,b){this.type=a;this.handlers={};this.state=b?1:0;this.fireArgs=null;this.numHandlers=0;this.onHasSubscribersChange=null},c={join:function(a,b){for(var f=b.length,e=f,c=function(){--e||a()},d=0;d<f;d++){if(0===b[d].state)throw Error("Can only use join with sticky channels.");b[d].subscribe(c)}f||a()},create:function(a){return c[a]=new g(a,!1)},createSticky:function(a){return c[a]=new g(a,!0)},deviceReadyChannelsArray:[],deviceReadyChannelsMap:{},waitForInitialization:function(a){if(a){var b=c[a]||this.createSticky(a);this.deviceReadyChannelsMap[a]=b;this.deviceReadyChannelsArray.push(b)}},initializationComplete:function(a){(a=this.deviceReadyChannelsMap[a])&&a.fire()}};g.prototype.subscribe=function(f,e){h(f);var c,d;f&&"object"===typeof f?(c=f.handleEvent,e=f):c=f;2==this.state?c.apply(e||this,this.fireArgs):(d=f.observer_guid,"object"===typeof e&&(c=a.close(e,c)),d||(d=""+b++),c.observer_guid=d,f.observer_guid=d,this.handlers[d]||(this.handlers[d]=c,this.numHandlers++,1==this.numHandlers&&this.onHasSubscribersChange&&this.onHasSubscribersChange()))};g.prototype.unsubscribe=function(a){h(a);a=(a&&"object"===typeof a?a.handleEvent:a).observer_guid;this.handlers[a]&&(delete this.handlers[a],this.numHandlers--,0===this.numHandlers&&this.onHasSubscribersChange&&this.onHasSubscribersChange())};g.prototype.fire=function(a){var b=Array.prototype.slice.call(arguments);1==this.state&&(this.state=2,this.fireArgs=b);if(this.numHandlers){var c=[],f;for(f in this.handlers)c.push(this.handlers[f]);for(f=0;f<c.length;++f)c[f].apply(this,b);2==this.state&&this.numHandlers&&(this.numHandlers=0,this.handlers={},this.onHasSubscribersChange&&this.onHasSubscribersChange())}};c.createSticky("onDOMContentLoaded");c.createSticky("onNativeReady");c.createSticky("onCordovaReady");c.createSticky("onPluginsReady");c.createSticky("onDeviceReady");c.create("onResume");c.create("onPause");c.waitForInitialization("onCordovaReady");c.waitForInitialization("onDOMContentLoaded");p.exports=c});m("cordova/exec",function(k,d,p){function h(a,b,c,f,d){if(0>y)throw Error("exec() called without bridgeSecret");void 0===u&&h.setJsToNativeBridgeMode(q.JS_OBJECT);d=d||[];for(var g=0;g<d.length;g++)"ArrayBuffer"==B.typeName(d[g])&&(d[g]=A.fromArrayBuffer(d[g]));var g=c+l.callbackId++,k=JSON.stringify(d);if(a||b)l.callbacks[g]={success:a,fail:b};g=n.get().exec(y,c,f,g,k);u==q.JS_OBJECT&&"@Null arguments."===g?(h.setJsToNativeBridgeMode(q.PROMPT),h(a,b,c,f,d),h.setJsToNativeBridgeMode(q.JS_OBJECT)):g&&(z.push(g),C(e))}function a(){b(!0)}function b(a){0>y||!(a=n.get().retrieveJsMessages(y,!!a))||(z.push(a),e())}function g(){w&&(b(),setTimeout(g,50))}function c(a,b){var f=b.charAt(0);if("s"==f)a.push(b.slice(1));else if("t"==f)a.push(!0);else if("f"==f)a.push(!1);else if("N"==f)a.push(null);else if("n"==f)a.push(+b.slice(1));else if("A"==f)b=b.slice(1),a.push(A.toArrayBuffer(b));else if("S"==f)a.push(window.atob(b.slice(1)));else if("M"==f)for(b=b.slice(1);""!==b;){var f=b.indexOf(" "),e=+b.slice(0,f),d=b.substr(f+1,e);b=b.slice(f+e+1);c(a,d)}else a.push(JSON.parse(b))}function f(a){var b=a.charAt(0);if("J"==b)eval(a.slice(1));else if("S"==b||"F"==b){var b="S"==b,f="1"==a.charAt(1),e=a.indexOf(" ",2),d=+a.slice(2,e),g=a.indexOf(" ",e+1),e=a.slice(e+1,g);a=a.slice(g+1);g=[];c(g,a);l.callbackFromNative(e,b,d,g,f)}else console.log("processMessage failed: invalid message: "+JSON.stringify(a))}function e(){if(!v&&0!==z.length){v=!0;try{var a;var c=z.shift();if("*"==c)a="*";else{var d=c.indexOf(" "),l=+c.slice(0,d),g=c.substr(d+1,l);(c=c.slice(d+l+1))&&z.unshift(c);a=g}"*"==a&&0===z.length?C(b):f(a)}finally{v=!1,0<z.length&&C(e)}}}var l=k("cordova"),n=k("cordova/android/nativeapiprovider"),B=k("cordova/utils"),A=k("cordova/base64"),t=k("cordova/channel"),q={PROMPT:0,JS_OBJECT:1},m={POLLING:0,LOAD_URL:1,ONLINE_EVENT:2,EVAL_BRIDGE:3},u,r=m.EVAL_BRIDGE,w=!1,y=-1,z=[],v=!1,D="undefined"==typeof Promise?null:Promise.resolve(),C=D?function(a){D.then(a)}:function(a){setTimeout(a)};h.init=function(){var a=navigator.userAgent.toLowerCase().match(/android\s[0-9].[0-9]/);null!=(a&&a[0].match(/4.[0-3].*/))&&r==m.EVAL_BRIDGE&&(r=m.ONLINE_EVENT);y=+prompt("","gap_init:"+r);t.onNativeReady.fire()};(function(){function b(a){l.fireWindowEvent(a.type)}window.addEventListener("online",a,!1);window.addEventListener("offline",a,!1);l.addWindowEventHandler("online");l.addWindowEventHandler("offline");document.addEventListener("online",b,!1);document.addEventListener("offline",b,!1)})();h.jsToNativeModes=q;h.nativeToJsModes=m;h.setJsToNativeBridgeMode=function(a){a!=q.JS_OBJECT||window._cordovaNative||(a=q.PROMPT);n.setPreferPrompt(a==q.PROMPT);u=a};h.setNativeToJsBridgeMode=function(a){a!=r&&(r==m.POLLING&&(w=!1),r=a,0<=y&&n.get().setNativeToJsBridgeMode(y,a),a==m.POLLING&&(w=!0,setTimeout(g,1)))};p.exports=h});m("cordova/exec/proxy",function(k,d,m){var h={};m.exports={add:function(a,b){console.log("adding proxy for "+a);return h[a]=b},remove:function(a){var b=h[a];delete h[a];h[a]=null;return b},get:function(a,b){return h[a]?h[a][b]:null}}});m("cordova/init",function(k,d,m){function h(a){for(var b=0;b<a.length;++b)2!=a[b].state&&console.log("Channel not fired: "+a[b].type)}function a(a){var b=function(){};b.prototype=a;var f=new b;if(b.bind)for(var c in a)"function"==typeof a[c]?f[c]=a[c].bind(a):function(b){e.defineGetterSetter(f,c,function(){return a[b]})}(c);return f}var b=k("cordova/channel");d=k("cordova");var g=k("cordova/modulemapper"),c=k("cordova/platform"),f=k("cordova/pluginloader"),e=k("cordova/utils"),l=[b.onNativeReady,b.onPluginsReady];window.setTimeout(function(){2!=b.onDeviceReady.state&&(console.log("deviceready has not fired after 5 seconds."),h(l),h(b.deviceReadyChannelsArray))},5E3);window.navigator&&(window.navigator=a(window.navigator));window.console||(window.console={log:function(){}});window.console.warn||(window.console.warn=function(a){this.log("warn: "+a)});b.onPause=d.addDocumentEventHandler("pause");b.onResume=d.addDocumentEventHandler("resume");b.onActivated=d.addDocumentEventHandler("activated");b.onDeviceReady=d.addStickyDocumentEventHandler("deviceready");"complete"==document.readyState||"interactive"==document.readyState?b.onDOMContentLoaded.fire():document.addEventListener("DOMContentLoaded",function(){b.onDOMContentLoaded.fire()},!1);window._nativeReady&&b.onNativeReady.fire();g.clobbers("cordova","cordova");g.clobbers("cordova/exec","cordova.exec");g.clobbers("cordova/exec","Cordova.exec");c.bootstrap&&c.bootstrap();setTimeout(function(){f.load(function(){b.onPluginsReady.fire()})},0);b.join(function(){g.mapModules(window);c.initialize&&c.initialize();b.onCordovaReady.fire();b.join(function(){k("cordova").fireDocumentEvent("deviceready")},b.deviceReadyChannelsArray)},l)});m("cordova/init_b",function(k,d,m){function h(a){for(var b=0;b<a.length;++b)2!=a[b].state&&console.log("Channel not fired: "+a[b].type)}function a(a){var b=function(){};b.prototype=a;var f=new b;if(b.bind)for(var c in a)"function"==typeof a[c]?f[c]=a[c].bind(a):function(b){e.defineGetterSetter(f,c,function(){return a[b]})}(c);return f}var b=k("cordova/channel");d=k("cordova");var g=k("cordova/modulemapper"),c=k("cordova/platform"),f=k("cordova/pluginloader"),e=k("cordova/utils"),l=[b.onDOMContentLoaded,b.onNativeReady,b.onPluginsReady];d.exec=k("cordova/exec");window.setTimeout(function(){2!=b.onDeviceReady.state&&(console.log("deviceready has not fired after 5 seconds."),h(l),h(b.deviceReadyChannelsArray))},5E3);window.navigator&&(window.navigator=a(window.navigator));window.console||(window.console={log:function(){}});window.console.warn||(window.console.warn=function(a){this.log("warn: "+a)});b.onPause=d.addDocumentEventHandler("pause");b.onResume=d.addDocumentEventHandler("resume");b.onActivated=d.addDocumentEventHandler("activated");b.onDeviceReady=d.addStickyDocumentEventHandler("deviceready");"complete"==document.readyState||"interactive"==document.readyState?b.onDOMContentLoaded.fire():document.addEventListener("DOMContentLoaded",function(){b.onDOMContentLoaded.fire()},!1);window._nativeReady&&b.onNativeReady.fire();c.bootstrap&&c.bootstrap();setTimeout(function(){f.load(function(){b.onPluginsReady.fire()})},0);b.join(function(){g.mapModules(window);c.initialize&&c.initialize();b.onCordovaReady.fire();b.join(function(){k("cordova").fireDocumentEvent("deviceready")},b.deviceReadyChannelsArray)},l)});m("cordova/modulemapper",function(k,d,p){function h(a,e,d,h){if(!(e in b))throw Error("Module "+e+" does not exist.");g.push(a,e,d);h&&(c[d]=h)}var a=k("cordova/builder"),b=m.moduleMap,g,c;d.reset=function(){g=[];c={}};d.clobbers=function(a,b,c){h("c",a,b,c)};d.merges=function(a,b,c){h("m",a,b,c)};d.defaults=function(a,b,c){h("d",a,b,c)};d.runs=function(a){h("r",a,null)};d.mapModules=function(b){var f={};b.CDV_origSymbols=f;for(var d=0,h=g.length;d<h;d+=3){var m=g[d],p=k(g[d+1]);if("r"!=m){var t=g[d+2],q=t.lastIndexOf("."),x=t.substr(0,q),q=t.substr(q+1),u=t in c?"Access made to deprecated symbol: "+t+". "+u:null;var r;r=b;if(x){for(var x=x.split("."),w=r,v=0;r=x[v];++v)w=w[r]=w[r]||{};x=w}else x=r;r=x[q];if("m"==m&&r)a.recursiveMerge(r,p);else if("d"==m&&!r||"d"!=m)t in f||(f[t]=r),a.assignOrWrapInDeprecateGetter(x,q,p,u)}}};d.getOriginalSymbol=function(a,b){var c=a.CDV_origSymbols;if(c&&b in c)return c[b];b=b.split(".");for(c=0;c<b.length;++c)a=a&&a[b[c]];return a};d.reset()});m("cordova/modulemapper_b",function(k,d,m){function h(a,f,e,d){b.push(a,f,e);d&&(g[e]=d)}var a=k("cordova/builder"),b=[],g;d.reset=function(){b=[];g={}};d.clobbers=function(a,b,e){h("c",a,b,e)};d.merges=function(a,b,e){h("m",a,b,e)};d.defaults=function(a,b,e){h("d",a,b,e)};d.runs=function(a){h("r",a,null)};d.mapModules=function(c){var f={};c.CDV_origSymbols=f;for(var e=0,d=b.length;e<d;e+=3){var h=b[e],m=k(b[e+1]);if("r"!=h){var p=b[e+2],t=p.lastIndexOf("."),q=p.substr(0,t),t=p.substr(t+1),v=p in g?"Access made to deprecated symbol: "+p+". "+v:null;var u;u=c;if(q){for(var q=q.split("."),r=u,w=0;u=q[w];++w)r=r[u]=r[u]||{};q=r}else q=u;u=q[t];if("m"==h&&u)a.recursiveMerge(u,m);else if("d"==h&&!u||"d"!=h)p in f||(f[p]=u),a.assignOrWrapInDeprecateGetter(q,t,m,v)}}};d.getOriginalSymbol=function(a,b){var c=a.CDV_origSymbols;if(c&&b in c)return c[b];b=b.split(".");for(c=0;c<b.length;++c)a=a&&a[b[c]];return a};d.reset()});m("cordova/platform",function(k,d,m){function h(b){var d=k("cordova"),c=b.action;switch(c){case"backbutton":case"menubutton":case"searchbutton":case"pause":case"volumedownbutton":case"volumeupbutton":d.fireDocumentEvent(c);break;case"resume":if(1<arguments.length&&b.pendingResult){if(2===arguments.length)b.pendingResult.result=arguments[1];else{for(var f=[],e=1;e<arguments.length;e++)f.push(arguments[e]);b.pendingResult.result=f}a=b}d.fireDocumentEvent(c,b);break;default:throw Error("Unknown event action "+c);}}var a=null;m.exports={id:"android",bootstrap:function(){function b(a){c.addDocumentEventHandler(a+"button").onHasSubscribersChange=function(){f(null,null,l,"overrideButton",[a,1==this.numHandlers])}}var d=k("cordova/channel"),c=k("cordova"),f=k("cordova/exec"),e=k("cordova/modulemapper");f.init();e.clobbers("cordova/plugin/android/app","navigator.app");var l=4<=Number(c.platformVersion.split(".")[0])?"CoreAndroid":"App";c.addDocumentEventHandler("backbutton").onHasSubscribersChange=function(){f(null,null,l,"overrideBackbutton",[1==this.numHandlers])};c.addDocumentEventHandler("menubutton");c.addDocumentEventHandler("searchbutton");b("volumeup");b("volumedown");var m=document.addEventListener;document.addEventListener=function(b,c,d){m(b,c,d);"resume"===b&&a&&c(a)};d.onCordovaReady.subscribe(function(){f(h,null,l,"messageChannel",[]);f(null,null,l,"show",[])})}}});m("cordova/plugin/android/app",function(k,d,m){var h=k("cordova/exec"),a=4<=Number(k("cordova").platformVersion.split(".")[0])?"CoreAndroid":"App";m.exports={clearCache:function(){h(null,null,a,"clearCache",[])},loadUrl:function(b,d){h(null,null,a,"loadUrl",[b,d])},cancelLoadUrl:function(){h(null,null,a,"cancelLoadUrl",[])},clearHistory:function(){h(null,null,a,"clearHistory",[])},backHistory:function(){h(null,null,a,"backHistory",[])},overrideBackbutton:function(b){h(null,null,a,"overrideBackbutton",[b])},overrideButton:function(b,d){h(null,null,a,"overrideButton",[b,d])},exitApp:function(){return h(null,null,a,"exitApp",[])}}});m("cordova/pluginloader",function(k,d,p){function h(a,b,e,g){g=g||e;a in m.moduleMap?e():d.injectScript(b,function(){a in m.moduleMap?e():g()},g)}function a(a,b,d){function c(){if(!--f){for(var a=0,c;c=b[a];a++){if(c.clobbers&&c.clobbers.length)for(var e=0;e<c.clobbers.length;e++)g.clobbers(c.id,c.clobbers[e]);if(c.merges&&c.merges.length)for(e=0;e<c.merges.length;e++)g.merges(c.id,c.merges[e]);c.runs&&g.runs(c.id)}d()}}var f=b.length;if(f)for(var e=0;e<b.length;e++)h(b[e].id,a+b[e].file,c);else d()}function b(){for(var a=null,b=document.getElementsByTagName("script"),d=b.length-1;-1<d;d--){var g=b[d].src.replace(/\?.*$/,"");if(g.indexOf("/cordova.js")==g.length-11){a=g.substring(0,g.length-11)+"/";break}}return a}var g=k("cordova/modulemapper");k("cordova/urlutil");d.injectScript=function(a,b,d){var c=document.createElement("script");c.onload=b;c.onerror=d;c.src=a;document.head.appendChild(c)};d.load=function(c){var d=b();null===d&&(console.log("Could not find cordova.js script tag. Plugin loading may fail."),d="");h("cordova/plugin_list",d+"cordova_plugins.js",function(){var b=k("cordova/plugin_list");a(d,b,c)},c)}});m("cordova/pluginloader_b",function(k,d,m){var h=k("cordova/modulemapper");d.load=function(a){var b=k("cordova/plugin_list");if(b&&b.length)for(var d=0,c;c=b[d];d++){if(c.clobbers&&c.clobbers.length)for(var f=0;f<c.clobbers.length;f++)h.clobbers(c.id,c.clobbers[f]);if(c.merges&&c.merges.length)for(f=0;f<c.merges.length;f++)h.merges(c.id,c.merges[f]);c.runs&&h.runs(c.id)}a()}});m("cordova/urlutil",function(k,d,m){d.makeAbsolute=function(d){var a=document.createElement("a");a.href=d;return a.href}});m("cordova/utils",function(k,d,m){function h(a){for(var b="",d=0;d<a;d++){var c=parseInt(256*Math.random(),10).toString(16);1==c.length&&(c="0"+c);b+=c}return b}d.defineGetterSetter=function(a,b,d,c){Object.defineProperty?(d={get:d,configurable:!0},c&&(d.set=c),Object.defineProperty(a,b,d)):(a.__defineGetter__(b,d),c&&a.__defineSetter__(b,c))};d.defineGetter=d.defineGetterSetter;d.arrayIndexOf=function(a,b){if(a.indexOf)return a.indexOf(b);for(var d=a.length,c=0;c<d;++c)if(a[c]==b)return c;return-1};d.arrayRemove=function(a,b){b=d.arrayIndexOf(a,b);-1!=b&&a.splice(b,1);return-1!=b};d.typeName=function(a){return Object.prototype.toString.call(a).slice(8,-1)};d.isArray=Array.isArray||function(a){return"Array"==d.typeName(a)};d.isDate=function(a){return a instanceof Date};d.clone=function(a){if(!a||"function"==typeof a||d.isDate(a)||"object"!=typeof a)return a;var b,g;if(d.isArray(a)){b=[];for(g=0;g<a.length;++g)b.push(d.clone(a[g]));return b}b={};for(g in a)g in b&&b[g]==a[g]||"undefined"==typeof a[g]||"unknown"==typeof a[g]||(b[g]=d.clone(a[g]));return b};d.close=function(a,b,d){return function(){return b.apply(a,d||arguments)}};d.createUUID=function(){return h(4)+"-"+h(2)+"-"+h(2)+"-"+h(2)+"-"+h(6)};d.extend=function(){var a=function(){};return function(b,d){a.prototype=d.prototype;b.prototype=new a;b.__super__=d.prototype;b.prototype.constructor=b}}();d.alert=function(a){window.alert?window.alert(a):console&&console.log&&console.log(a)}});window.cordova=v("cordova");queryString("gameid")?(window.device={gameid:queryString("gameid"),imei:window.localStorage.getItem("imei")||hex_md5((new Date).getTime()+Math.random()+"")},window.platform="h5"):v("cordova/init")})();