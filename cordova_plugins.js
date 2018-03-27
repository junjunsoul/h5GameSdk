cordova.define('cordova/plugin_list', function(require, exports, module) {
    var plugins=[        
            {
                "id": "plugin-custom",
                "file": "plugins/cordova-plugin-device/www/custom.js",
                "pluginId": "plugin-custom",
                "clobbers": [
                    "callJS"
                ]
            }, 
            {
                "id": "cordova-plugin-device.device",
                "file": "plugins/cordova-plugin-device/www/device.js",
                "pluginId": "cordova-plugin-device",
                "clobbers": [
                    "device"
                ]
            }
        ]
    var metadata={
        "cordova-plugin-whitelist": "1.3.2",
        "cordova-plugin-device": "1.1.6"
    }
    var p=queryString('platform')

    if(p=='ios'|| p=='h5'){//新版ios SDK控制状态栏
        plugins.push({
            "id": "cordova-plugin-statusbar.statusbar",
            "file": "plugins/cordova-plugin-statusbar/www/statusbar.js",
            "pluginId": "cordova-plugin-statusbar",
            "clobbers": [
                "window.StatusBar"
            ]
        })
        // plugins.push({
        //     "id": "cordova-plugin-splashscreen.SplashScreen",
        //     "file": "plugins/cordova-plugin-splashscreen/www/splashscreen.js",
        //     "pluginId": "cordova-plugin-splashscreen",
        //     "clobbers": [
        //         "navigator.splashscreen"
        //     ]
        // })
        metadata["cordova-plugin-statusbar"]= "2.2.3"

       // metadata["cordova-plugin-splashscreen"]= "4.0.3"
    }
    module.exports = plugins;
    module.exports.metadata =metadata;
});
