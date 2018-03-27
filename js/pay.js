function eyugame_play(listUrl,brower){
	this.listUrl=listUrl
	this.brower=brower
	this.payParam=null
	this.gameid=1
	this.userid=''
	this.pay_style=
		'.pay-bg{position:fixed;top:0;z-index:11;display:none;display:none;width:100%;height:100%;background-color:rgba(62,38,8,.24);font-family:"Microsoft YaHei","微软雅黑",Arial,sans-serif}\
		.pay-page{position:fixed;top:0;z-index:100;display:none;width:100%;height:100%;background-color:#fff}\
		.pay-pop{position: absolute;top: 50%;left: 50%;z-index: 15;margin-left: -150px;margin-top: -173px;width: 300px;border-radius: 10px;background-color: #ececec;}\
		.pay-pop .top{width:100%;height:60px;border-bottom:1px solid #c5c5c5;line-height:60px}\
		.pay-pop .product{padding:0 30px;width:100%;height:50px;line-height:50px;}\
		.pay-pop .product h4{float:left;margin:0}\
		.pay-pop .product span{float:right;color: #f38123;}\
		.pay-pop .pay-way{padding:0 5px;width:100%;height:150px;}\
		.pay-pop .pay-way p{margin:0;padding-left:20px;color:#908d8d}\
		.pay-pop .pay-way .way{box-sizing:border-box;margin-top:10px;padding:10px;height:110px;border-radius:10px;background-color:#e3e3e3;}\
		.pay-pop .pay-way .way ol{margin:0;padding:0;height:100%;list-style:none}\
		.pay-pop .pay-way .way ol li{position:relative;float:left;box-sizing:border-box;width:25%;height:100%;text-align:center;font-size:14px}\
		.pay-pop .pay-way .way ol li b{position:absolute;top:-6px;right:-6px;display:none;width:15px;height:15px;background-image:url(img/icon_top.png);background-size:15px 15px;}\
		.pay-pop .pay-way .way ol li.active b{display:block}\
		.pay-pop .pay-way .way ol li.active{border:2px solid #f38123;border-radius:10px;background-color:#fff}\
		.pay-pop .pay-way .way ol li i{display:inline-block;margin-top:10px;width:3rem;height:3rem;}\
		.pay-pop .pay-way .way ol li img{width:100%;height:100%}\
		.pay-pop .pay-way .way ol li span{display:inline-block;width:100%}\
		.pay-pop .pay-btn{width:100%;padding:10px 0;text-align:center}\
		.pay-pop .pay-btn button{width:90%;height:40px;border:0;border-radius:10px;background-color:#ff7200;color:#fdfdfd;font-size:16px}\
		.pay-pop .top .close{position:absolute;top:22px;right:22px;width:18px;height:18px;background-image:url(./img/icon_close.png);background-size:cover}\
		.pay-pop .top h3{margin:0 0 0 30px}'
	this.getElement=function(){
		var el=!$(".pay-bg").length?$(
				'<div class="pay-bg">\
		            <div class="pay-pop">\
		                <div class="top">\
		                    <h3>充值中心</h3>\
		                    <span class="close"></span>\
		                </div>\
		                <div class="product">\
		                    <h4></h4>\
		                    <span></span>\
		                </div>\
		                <div class="pay-way">\
		                    <p>支付方式</p>\
		                    <div class="way">\
		                        <ol>\
		                        </ol>\
		                    </div>\
		                </div >\
		                <div class="pay-btn">\
		                    <button>确定充值</button>\
		                </div>\
		            </div>\
		        </div>'):$(".pay-bg")
		var iframePage=$('<div class="pay-page"><iframe src="about:blank" width="100%" height="100%" frameborder="0" marginheight="0" marginwidth="0" scrolling="auto"></iframe></div>')
		if(!$('.pay-page').length){
			iframePage.appendTo('body')
		}
		if(!$('#pay_style').length){
			this.addCssByStyle(this.pay_style,'pay_style',document.getElementsByTagName('head')[0]);
		}
		return el
	}
	this.renderLi=function(data){
		var element=this.getElement()

        element.find('.product h4').html(this.payParam.goodsNumber+ decodeURI(this.payParam.goodsName))
        element.find('.product span').html('¥'+this.payParam.money)
        var str='<li>'
                    +'<b></b>'
                    +'<i><img src=""></i>'
                    +'<span></span>'
                +'</li>';
        var that=this

        //充值
        element.find('.pay-btn button').click(function(e){
            var pay_item=element.find('.pay-way .way ol li.active')
            var url=pay_item.data('payurl')+'&appId='+that.gameid+'&uid='+that.userid+'&goodsId='+that.payParam.goodsId+'&goodsName='+that.payParam.goodsName+'&goodsNumber='+that.payParam.goodsNumber+'&money='+that.payParam.money+'&serverId='+that.payParam.serverId+'&ext='+that.payParam.ext+'&cburl=1';
            var pay_page=$('.pay-page')
            pay_page.find('iframe').attr('src',url)
            pay_page.show()
        })
        //关闭
		element.find('.close').click(function(){
            element.hide()
        })

        element.find('.pay-pop .way ol li').remove()
        $.each(data,function(i,obj){
           var el=$(str)
           el.find('img').attr('src',obj.log)
           el.find('span').html(obj.name)
           el.data('code',obj.code)
           el.data('payurl',obj.payurl)
           el.click(function(e){
                $(this).addClass('active').siblings('li').removeClass('active')
            })
           if(obj.isDefault)
            el.addClass('active')
        	element.find('.pay-pop .way ol').append(el)
        })
        if(!$(".pay-bg").length){
        	element.appendTo('body')
        }
        element.show()
	}
}

eyugame_play.prototype.addCssByStyle=function(css, id, target){
	var doc=document, style = document.createElement('style');

	style.setAttribute('type', 'text/css');
	style.setAttribute('id', id);

	if(style.styleSheet){// IE
		  style.styleSheet.cssText = css;
	} else {// w3c
		  var cssText = doc.createTextNode(css);
		  style.appendChild(cssText);
	}
	if(target){
		target.appendChild(style);
	}else{
		doc.documentElement.appendChild(style);
	}
}
eyugame_play.prototype.setUserInfo=function(gameid,userid){
	this.gameid=gameid
	this.userid=userid
}
eyugame_play.prototype.game_pay=function(obj,cb){
    this.payParam=null
	var p=queryString('platform')
    if(p=='ios'|| p=='h5'){//ios
    	alert('支付尚未接通！')
    	return
    }
    if(obj){
        this.payParam=obj
        //接入原生app支付
        if(cordova.sys_android&&window.callJS.gameid){
        	callJS.recharge({
        		serverID:obj.serverId,
        		rolename:'',
        		roleid:'',
        		cporder:'',
        		pext:obj.ext,
        		money:obj.money,
        		itemName:decodeURI(obj.goodsName),
        		itemNum:obj.goodsNumber
        	},cb)
        	return true
        }
        if(this.listUrl){
			$.ajax({
			    type: 'GET',
			    url: this.listUrl,
			    data:{ brower:this.brower},
			    dataType: 'json',
			    context:this,
			    success: function(data){
			        if(data.status!=1){//错误
			            cb(data.info)
			        }
			        else{
			            var res=data.data
			            this.renderLi(res)
			        }
			    },
			    error: function(xhr, type){
			        cb('服务端错误')
			    }
			})
		}else{
			cb('支付列表URL为空')
		}
    }
    else{
        cb('请提供参数')
        return
    }
}
eyugame_play.prototype.game_pay_close=function(){
	this.getElement().hide()
}
eyugame_play.prototype.game_iframe_close=function(){
    var pay_page=$('.pay-page')
    pay_page.find('iframe').attr('src','')
    pay_page.hide()
}