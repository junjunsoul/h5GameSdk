/**
 * 广告统计SDK
 * @type {Object}
 */
var advsdk = {
	config:{
		"sdkversion":"h5-1.0",
		"url" : "http://s.ah9yu.com/sdkapi.php",
		"key" : "BA886FF52827126DCD18E73E0E16420C"
	},
	init:{
		"muid":"",
		"appid":"",//应用id
		"appname":"",//应用名称
	},
	deviceInfo:{},//存放手机设备信息	
	/**
	 * 激活
	 * @return {[type]}         [description]
	 */
	activation:function(){
		if(!this.checkInitParams()) {
			return false;
		}
		var params = this.initParams();
		params.action = "activation";
		params.sign = this.getSign(params);
		this.httpPost(params);
	},

	/**
	 * 注册
	 * @param  {[type]} userid  [平台id]
	 * @return {[type]}         [description]
	 */
	register:function(userid) {
		var params = this.initParams();
		params.action = "register";
		params.userid = userid;
		params.sign = this.getSign(params);
		this.httpPost(params);
	},
	/**
	 * 登录
	 * @param  {[type]} userid  [平台id]
	 * @return {[type]}         [description]
	 */
	login:function(userid) {
		var params = this.initParams();
		params.action = "login";
		params.userid = userid;
		params.sign = this.getSign(params);
		this.httpPost(params);
	},
	/**
	 * 自定义日志
	 * @param  {[type]} userid    [用户id]
	 * @param  {[type]} eventName [事件类型]
	 * @param  {[jsonObject]} jsonData  [其他详细参数]
	 * @return {[type]}           [description]
	 */
	customEvent:function(userid,eventName,jsonData) {
		var params = this.initParams();
		params.action = "customevent";
		params.userid = userid;
		params.content = {};
		params.content.name = eventName;
		params.content.data = jsonData;
		params.sign = this.getSign(params);
		this.httpPost(params);
	},
	/**
	 * 创角
	 * @param  {[type]} userid   [description]
	 * @param  {[type]} jsonData [description]
	 * @return {[type]}          [description]
	 */
	createRole:function(userid,jsonData) {
		this.customevent(userid,"createRole",jsonData);
	},
	/**
	 * 角色升级
	 * @param  {[type]} userid   [description]
	 * @param  {[type]} jsonData [description]
	 * @return {[type]}          [description]
	 */
	upLevel:function(userid,jsonData) {
		this.customevent(userid,"upLevel",jsonData);
	},
	/**
	 * 消费产品
	 * @param  {[type]} userid [用户id]
	 * @param  {[type]} item   [消费点编号]
	 * @param  {[type]} itemnumber  [数量]
	 * @param  {[type]} price  [消费点单价，保留两位小数]
	 * @return {[type]}        [description]
	 */
	consume:function(userid,item,itemnumber,price) {
		var params = this.initParams();
		params.action = "consume";
		params.userid = userid;
		params.content = {};
		params.content.item = item;
		params.content.itemnumber = itemnumber;
		params.content.virtualcurrency = price;
		params.sign = this.getSign(params);
		this.httpPost(params);
	},

	/**
	 * 充值
	 * @param  {[type]} userid [用户id]
	 * @param  {[type]} order  [订单号]
	 * @param  {[type]} price  [价格]
	 * @return {[type]} currency       [货币单位,取RMB]
	 * @return {[type]}        [description]
	 */
	recharge:function(userid,order,price,currency) {
		var params = this.initParams();
		params.action = "recharge";
		params.userid = userid;
		params.content = {};
		params.content.orderid = order;
		params.content.money = price;
		params.content.currency = currency;
		params.sign = this.getSign(params);
		this.httpPost(params);
	},

	/**
	 * 前后台切换
	 * @param  {[type]} userid  [用户id]
	 * @return {[type]}         [description]
	 */
	forground:function(userid){
		var params = this.initParams();
		params.action = "forground";
		params.userid = userid;
		params.sign = this.getSign(params);
		this.httpPost(params);
	},
	/**
	 * 初始化参数
	 * @return {[type]} [description]
	 */
	initParams:function(){

		var params = {};
		params.info = {};
		var ua = navigator.userAgent.toLowerCase();
		if (/iphone|ipad|ipod/.test(ua)) {
			params.osname = "IOS";
		} else if (/android/.test(ua)) {
			params.osname = "ANDROID";	   	
		}else{
			params.osname = "WEB";
		}
		var uuid = this.getCookie("advsdkUuid");
		if(uuid == null || uuid == ""){//生成uuid
			uuid = this.uuid();
			this.setCookie("advsdkUuid",uuid);
		}
		if(typeof(this.deviceInfo) != "object") {
			this.deviceInfo = {};
		}
		if(typeof(this.deviceInfo.info) != "object"){
			this.deviceInfo.info = {};
		}

		params.appid = this.init.appid;
		params.appname = this.init.appname;
		params.time = Date.parse(new Date()) / 1000;
		params.gentime = Date.parse(new Date()) / 1000;
		params.advid = this.getval(this.deviceInfo.advid);
		params.userid = "";
		params.osversion = this.getval(this.deviceInfo.osversion);
		params.sdkversion = this.config.sdkversion;
		params.appversion = this.getval(this.deviceInfo.appversion);
		params.packagename = this.getval(this.deviceInfo.packagename);
		params.resolution = window.screen.width + "*"+window.screen.height;
		params.language = this.getval(this.deviceInfo.language);
		params.country = this.getval(this.deviceInfo.country);
		params.timezone = this.getval(this.deviceInfo.timezone);
		params.testid = "";
		params.uuid = uuid;
		params.info.idfa = this.getval(this.deviceInfo.info.idfa);
		params.info.imei = this.getval(this.deviceInfo.info.imei);
		params.info.mac = this.getval(this.deviceInfo.info.mac);
		params.info.imsi = this.getval(this.deviceInfo.info.imsi);
		params.info.model = this.getval(this.deviceInfo.info.model);
		params.info.buildid = this.getval(this.deviceInfo.info.buildid);
		params.info.manufacturer = this.getval(this.deviceInfo.info.manufacturer);
		params.info.memory_free = this.getval(this.deviceInfo.info.memory_free);
		params.info.memory_total = this.getval(this.deviceInfo.info.memory_total);
		params.info.network = this.getval(this.deviceInfo.info.network);
		params.info.battery = this.getval(this.deviceInfo.info.battery);
		params.info.androidid = this.getval(this.deviceInfo.info.androidid);
		params.info.advertisingid = this.getval(this.deviceInfo.info.advertisingid);
		params.info.deeplink = this.getval(this.deviceInfo.info.deeplink);
		params.content = "";

		// if(params.osname == "IOS"){
		// 	if(params.info.idfa == undefined || params.info.idfa == "") {
		// 		params.info.idfa = uuid;
		// 	}

		// }else{
		// 	if(params.info.imei == undefined || params.info.idfa == "") {
		// 		params.info.imei = uuid;
		// 	}
		// }
		return params;

	},

	/**
	 * 获取当前网络状态
	 * @return {[type]} [description]
	 */
	getNetworkSatus:function(){
		var connection = navigator.connection||navigator.mozConnection||navigator.webkitConnection||{tyep:'unknown'};
		var type_text = ['unknown','ethernet','wifi','2g','3g','4g','none'];
		var status = "";
		if(typeof(connection.type) == "number"){
			connection.type_text = type_text[connection.type];
		}else{
			connection.type_text = connection.type;
		}
		return connection.type_text != null ? connection.type_text:"pc";

	},
	httpPost:function(data){
		var url = this.config.url;
		this.ajax({
	        type: "POST",
	        url: url,
	        data: JSON.stringify(data),
	        dataType: "json",
	        success: function (message) {console.log(message);
	            if(message.code != 1) {
	            	alert(message.msg);
	            }
	            res = message;
	        },
	        error: function (message) {
	            console.log(message);
	        }
	    });

	},

	/**
	 * 获取签名
	 * @param  {[type]} params [description]
	 * @return {[type]}        [description]
	 */
	getSign:function(params) {
		var str = "";
		var sParams = Object.keys(params).sort();;
	
		for(i in sParams){
			if(sParams[i] == "info" || sParams[i] =="content")
				continue;
			params[sParams[i]] = encodeURI(params[sParams[i]]);
			str += sParams[i]+"="+params[sParams[i]]+"&";
		}
		str += this.config.key;
		var sign = hex_md5(str);
		return sign;
	},
	/**
	 * 校验必填参数
	 * @return {[type]} [description]
	 */
	checkInitParams:function(){
		if(typeof(this.init.appid) == undefined || this.init.appid == "") {
			alert("appid不能为空");
			return false;
		}
		return true;
	},
	/**
	 * 设置cookie
	 * @param {[type]} name  [description]
	 * @param {[type]} value [description]
	 */
	setCookie:function(name,value){
        var Days = 30;//缓存有效期:30天
        var exp = new Date();
        exp.setTime(exp.getTime() + Days*24*60*60*1000);
        document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
    },
    /**
     * 获取cookie
     * @param  {[type]} name [description]
     * @return {[type]}      [description]
     */
    getCookie:function(name){
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg))
        return unescape(arr[2]);
        else
        return null;
    },
    /**
     * 生成uuid
     * @return {[type]} [description]
     */
    uuid:function() {
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4"; 
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); 
                                                            
        s[8] = s[13] = s[18] = s[23] = "-";

        var uuid = s.join("");
        return uuid;
    },
    getval:function(value) {
    	if(value != undefined)
    		return value;
    	else
    		return "";
    },
    ajax:function(obj) {
	    var xmlhttp, type, url, async, dataType, data;
	    if (typeof(obj) != 'object')  return false;
	    
	    type = obj.type == undefined ? 'POST' : obj.type.toUpperCase();
	    url = obj.url == undefined ? window.location.href : obj.url;
	    async = obj.async == undefined ? true : obj.type;
	    dataType = obj.dataType == undefined ? 'HTML' : obj.dataType.toUpperCase();
	    data = obj.data == undefined ? {} : obj.data;


	    var formatParams = function () {
	        if (typeof(data) == "object") {
	            var str = "";
	            for (var pro in data) {
	                str += pro + "=" + data[pro] + "&";
	            }
	            data = str.substr(0, str.length - 1);
	        }
	        if (type == 'GET' || dataType == 'JSONP') {
	            if (url.lastIndexOf('?') == -1) {
	                url += '?' + data;
	            } else {
	                url += '&' + data;
	            }
	        }
	    }
	    if (window.XMLHttpRequest) {
	        xmlhttp = new XMLHttpRequest();
	    } else {
	        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	    }


	    if (dataType == 'JSONP') {
	        if (typeof(obj.beforeSend) == 'function')obj.beforeSend(xmlhttp);
	        var callbackName = ('jsonp_' + Math.random()).replace(".", "");
	        var oHead = document.getElementsByTagName('head')[0];
	        data.callback = callbackName;
	        var ele = document.createElement('script');
	        ele.type = "text/javascript";
	        ele.onerror = function () {
	            console.log('请求失败');
	            obj.error && obj.error("请求失败");
	        };

	        oHead.appendChild(ele);
	        window[callbackName] = function (json) {
	            oHead.removeChild(ele);
	            window[callbackName] = null;
	            obj.success && obj.success(json);
	        };
	        formatParams();
	        ele.src = url;


	        return ;
	    } else {
	        formatParams();
	        xmlhttp.open(type, url, async);
	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8");
	        if (typeof(obj.beforeSend) == 'function')obj.beforeSend(xmlhttp);
	        xmlhttp.send(data);
	        xmlhttp.onreadystatechange = function () {

	            if (xmlhttp.status != 200) {
	                console.log(xmlhttp.status + '错误');
	                obj.error && obj.error(xmlhttp.status + '错误');
	                return ;
	            }

	            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

	                if (dataType == 'JSON') {
	                    try {
	                        res = JSON.parse(xmlhttp.responseText);
	                    } catch (e) {
	                        console.log('返回的json格式不正确');
	                        obj.error('返回的json格式不正确');
	                    }

	                } else if (dataType == 'XML') {
	                    res = xmlhttp.responseXML;
	                } else {
	                    res = xmlhttp.responseText;
	                }

	                obj.success && obj.success(res);

	            }
	        }
	    }
	}
};

