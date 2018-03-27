cordova.sys_android=false
cordova.define("plugin-custom", function(require, exports, module) {
    var exec = require('cordova/exec')
    function CallJS(){
        this.gameid=''
        var me=this
        //初始化
        cordova.require('cordova/channel').onCordovaReady.subscribe(function() {
            exec(function(gameid){
              me.gameid=gameid
              cordova.sys_android=true
              if(queryString('platform')=='h5')//如果platform返回h5就是在webview下运行h5的SDK
                cordova.sys_android=false
            },null, "SdkPlugin", "getInfo", [])
        })
    }

    CallJS.prototype.recharge=function(data,cb){
        cordova.require('cordova/channel').onCordovaReady.subscribe(function() {
            exec(cb, null, "SdkPlugin", "callPay", [JSON.stringify(data)])
        })
    }
    CallJS.prototype.callLogin=function(cb){
        cordova.require('cordova/channel').onCordovaReady.subscribe(function() {
            exec(cb, null, "SdkPlugin", "callLogin", [])
        })
    }
    CallJS.prototype.createRole=function(data,cb){
        cordova.require('cordova/channel').onCordovaReady.subscribe(function() {
            exec(cb, null, "SdkPlugin", "createRole", [JSON.stringify(data)])
        })
    }
    module.exports = new CallJS()
})
