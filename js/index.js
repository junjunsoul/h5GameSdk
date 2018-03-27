var app = {
    //所有URL
    url:{
        guestLogin:domain+'api.php?m=api&c=Account&a=guestLogin',//设备快速登录接口
        bound:domain+'api.php?m=api&c=Account&a=bound',//绑定账号接口
        login:domain+'api.php?m=api&c=Account&a=login',//切换账号接口
        rpassword:domain+'api.php?m=api&c=Account&a=modifyPwd',//修改密码
        gameHost:domain+'api.php?m=api&c=App&a=getAppInfo',
        getPayList:domain+'api.php?m=api&c=Pay&a=getPayList',//支付方式列表
        register:domain+'api.php?m=api&c=Account&a=register',//注册
        wx_logoin:wx_api+'user.php'
    },
    imei:'64a18720113a00fe1d58c4c284c66e04',
    payParam:null,
    gameid:'1',
    setLocalStorage:function(name,item){
        var storage=window.localStorage
        var d=JSON.stringify(item);
        storage.setItem(name,d);
    },
    setCookie:function(name,value){
        var Days = 30;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days*24*60*60*1000);
        document.cookie = name + "="+ escape (value) //+ ";expires=" + exp.toGMTString();//关闭浏览器就过期
    },
    getCookie:function(name){
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg))
        return unescape(arr[2]);
        else
        return null;
    },
    getLocalStorage:function(name){
        var storage=window.localStorage
        var json=storage.getItem(name)
        return JSON.parse(json);
    },
    initialize: function() {
        var token,a,sign=null
        token=queryString('token')
        a=queryString('a')
        sign=queryString('sign')
        this.gameid=queryString('gameid')
        if(!queryString('gameid')){
            document.addEventListener('deviceready', this.onDeviceReady.bind(this), false)
            document.addEventListener("backbutton", this.onBackKeyDown.bind(this), false)
        }
        //微信公众号登录
        else if(token&&a=='weixin'&&sign){
            var that=this
            $.ajax({//检查信息
                type: 'GET',
                url: this.url.wx_logoin,
                data:{ token:token,a:a,sign:sign},
                dataType: 'jsonp',
                success: function(data){
                    if(data.code){
                        window.platform='wx'
                        that.imei=hex_md5(new Date().getTime()+Math.random()+'')
                        that.set_local(token,data.userid,data.nickname,data.nickname)
                        that.wx_logoin(data.nickname,token)
                    }
                    else{
                        that.onDeviceReady()
                    }
                },
                error: function(xhr, type){
                    this.onDeviceReady()
                }
            })
        }
        else{
            this.onDeviceReady()
        }
    },
    clear_local(){
        window.localStorage.removeItem('info')
        window.localStorage.removeItem('imei')
        window.localStorage.setItem('version',curV)
        document.cookie ="token="
    },
    set_local(token,userid,username,nickname){
        this.setLocalStorage('info',{userid:userid,username:username,nickname:nickname})
        this.setCookie('token',token)
    },
    wx_logoin(nickname,token){
        $('#h5wrap').show()
        $('.user-pop .btn_click *').hide()
        $('.username').html('微信账号：'+nickname)
        this.getGame('init','',function(){
            this.getGame('',token)
        })//初始统计
    },
    getGame:function(type,sessionid,cb){
        $.ajax({
            type: 'GET',
            url: this.url.gameHost,
            data:{ id:this.gameid,platform:window.platform},
            dataType: 'json',
            context:this,
            success: function(data){
                var res=data.data||{}
                var token=this.getCookie('token')||sessionid
                if(type){//对接统计接口
                    advsdk.init={
                        "appid":res.advAppId,
                        "appname":res.Name,
                    }
                    advsdk.activation()
                    cb.call(this)
                }else{
                    var url=res.AppUrl
                    document.getElementById("gameUrl").src = url+(url.indexOf('?')>0?"&":"?")+"token="+token+'&uuid='+this.imei;                         
                }
            },
            error: function(xhr, type){
                alert('服务端错误')
            }
        })
    },
    register:function(username,password,cb){
        $.ajax({
            type: 'GET',
            url: this.url.register,
            data:{ username:username,password:password,appId:this.gameid },
            dataType: 'json',
            context:this,
            success: function(data){
                if(data.status!=1){//错误 cv 
                    cb(data.info)
                }
                else{
                    var res=data.data
                    this.setCookie('token',res.token)
                    advsdk.register(res.userid)
                    this.setLocalStorage('info',{userid:res.userid,username:username,nickname:username,password:password})
                    $('.username').html('九娱账号：'+username)
                    cb('')
                    this.getGame()
                }
            },
            error: function(xhr, type){
                alert('服务端错误')
            }
        })
    },
    login:function(username,password,cb){
        $.ajax({
            type: 'GET',
            url: this.url.login,
            data:{ username:username,password:password,appId:this.gameid },
            dataType: 'json',
            context:this,
            success: function(data){
                if(data.status!=1){//错误
                    cb(data.info)
                }
                else{
                    var res=data.data
                    this.setCookie('token',res.token)
                    advsdk.login(res.userid)
                    this.setLocalStorage('info',{userid:res.userid,username:username,nickname:username,password:password})
                    $('.username').html('九娱账号：'+username)
                    cb('')
                    this.getGame()
                }
            },
            error: function(xhr, type){
                alert('服务端错误')
            }
        })
    },
    rpassword:function(password,oldpassword,cb){
        var use=this.getLocalStorage('info')
        $.ajax({
            type: 'GET',
            url: this.url.rpassword,
            data:{ userid:use.userid,password:password,oldpassword:oldpassword },
            dataType: 'json',
            context:this,
            success: function(data){
                if(data.status!=1){//错误
                    cb(data.info)
                }
                else{
                    use.password=password
                    this.setLocalStorage('info',use)
                    cb('')
                }
            },
            error: function(xhr, type){
                alert('服务端错误')
            }
        })
    },
    boundAc:function(username,password,cb){
        $.ajax({
            type: 'GET',
            url: this.url.bound,
            data:{ deviceId:this.imei,username:username,password:password },
            dataType: 'json',
            context:this,
            success: function(data){
                if(data.status!=1){//错误
                    cb(data.info)
                }
                else{
                    var re=data.data
                    var use=this.getLocalStorage('info')
                    use.username=username
                    use.nickname=username
                    use.password=password
                    this.setLocalStorage('info',use)
                    $('.username').html('九娱账号：'+username)
                    cb('')
                }
            },
            error: function(xhr, type){
                alert('服务端错误')
            }
        })
    },
    onDeviceReady: function() {
        if(!cordova.sys_android){
            $('#h5wrap').show()
            $('#game_login').hide()
            this.gameid=device.gameid
            this.imei=device.imei
            advsdk.deviceInfo=device.deviceInfo?JSON.parse(device.deviceInfo):""
            window.localStorage.setItem('imei',device.imei)
            var token=this.getCookie('token')
            this.getGame('init','',function(){
                if(!token){
                    var local_s=this.getLocalStorage('info')
                    //匿名用户登录
                    if(!local_s||local_s.username==this.imei){
                        $.ajax({
                            type: 'GET',
                            url: this.url.guestLogin,
                            data:{ username: this.imei,appId:this.gameid},
                            dataType: 'json',
                            context:this,
                            success: function(data){
                                if(data.status!=1){//错误
                                    alert('登录出错！')
                                }
                                else{
                                    var res=data.data
                                    advsdk.login(res.userid)
                                    this.set_local(res.token,res.userid,res.username,res.nickname)
                                    $('.username').html('匿名账号：'+res.nickname)
                                    this.getGame()
                                }
                            },
                            error: function(xhr, type){
                                alert('服务端错误')
                            }
                        })
                        $('#revamp').hide()
                        $('#bound').show()
                    }else{
                        this.login(local_s.username,local_s.password,function(){})//正常用户登录
                        $('#bound').hide()
                        $('#revamp').show()
                    }
                }else{
                    //存在localstorage
                    var use=this.getLocalStorage('info')
                    if(use&&this.imei!=use.username){
                        $('#bound').hide()
                        $('#revamp').show()
                        $('.username').html('九娱账号：'+use.nickname)
                    }else{
                        $('#revamp').hide()
                        $('#bound').show()
                        $('.username').html('匿名账号：'+use.nickname)
                    }
                    this.getGame()
                }
            })

        }else{
            //用原生SDK方法
            app.gameid=callJS.gameid
            native_Sdk.login()
            $('#game_login').show()
        }
    },
    onBackKeyDown:function(){
        $('.close_bg').show()
    }
}

//调用原生SDK
var native_Sdk={
    //登录
    login:function(){
        if(cordova.sys_android){
            $('#game_login').show()
            callJS.callLogin(function(sessionid){
                $('#game_login').hide()
                app.getGame('',sessionid)
            })
        }
    },
    //创建角色统计
    createRole:function(jsonData){
        if(cordova.sys_android)
            callJS.createRole(jsonData,function(msg){

            })
    },
    //注销
    switchover:function(){
        native_Sdk.login()
        document.getElementById("gameUrl").src='about:blank'
    }
}
app.initialize()