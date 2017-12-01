(function(){
	var TEL;
	var indexPage = {
		source : common.source,
		reg : /(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/,
		init : function(){			
			this.checkTouch();	
			common.loading(false);										
		},
		checkTouch : function(){//页面点击事件
			var me = this;			
			$('#login').on('click',function(){
				var tel = $('#tel').val();
				var code = $('#code').val();
				if(!tel){
					alert('请输入手机号！');					
				}else if(!me.reg.test(tel)){
					alert('请输入正确的手机号！');					
				}else if(!code){
					alert('请输入验证码！');					
				}else{
					common.loading(true);
					var parames = {
						phoneNo: tel,
						phoneVerCode: code,
					};
					TEL = tel;
					me.ajax('/summary/login',parames,me.loginCb,'POST');
				}
			});
			$('#getCode').on('click',function(){
				if($(this).text() == '获取验证码'){
					var tel = $('#tel').val();
					if(!tel){
						alert('请输入手机号！');
					}else if(!me.reg.test(tel)){
						alert('请输入正确的手机号！');
					}else{
						common.loading(true);
						TEL = tel;
						var parames = {
							phoneNo : TEL,
							busCode : 'PHONE_LOGIN_CODE',
						};
						//倒计时
						var time = 120;
						$('#getCode').text(time+'s');
						var myInterval = window.setInterval(function(){
							time--;
							$('#getCode').text(time+'s');
							if(time <= 0){
								window.clearInterval(myInterval);
								$('#getCode').text('获取验证码');
							}
						}, 1000);

						me.ajax('/summary/sendVerCode',parames,me.sendVerCodeCb,'POST');						
					}
				}	
			});
		},	
		loginCb : function(data){
			//存储token
			var token = data.data.token;
			common.setCookie('token',token,'d1');//存储用户token到cookie中
			common.setCookie('tel',TEL,'d1');//存储用户tel到cookie中

			//登录成功，跳转到当前报表页面
			window.location.href = 'currentReport';			
		},
		sendVerCodeCb : function(data){
			common.loading(false);
			alert('短信验证码发送成功！');
		},
		ajax: function(action,parames,succCb,type){
			var me = this;
			if(parames){
				if(!parames.source){
					parames.source = me.source;
				}
			}
			// console.log(JSON.stringify(parames));
			$.ajax({
	            url: action,
	            dataType: 'json',
	            data: parames,
	            type: type,
	            xhrFields: { withCredentials: true },
	            crossDomain: true,
	            success: function (data) {
	                // console.log('SUCCESS:'+JSON.stringify(data));
	                // alert('SUCCESS:'+JSON.stringify(data));
	                var status = data.status;
	                if(status == 'SUCCESS'){
	                	succCb && succCb(data); 
	                }else{	                		                	
	                	common.loading(false);	                	
	                	alert(data.msg);
	                }	                			   			                
	            },
	            error: function (err) {
	            	common.loading(false);
	            	alert('ERROR:'+JSON.stringify(err));
	            }
	        });
		},	
	};
	
	common.loading(true);
	indexPage.init();
})();

