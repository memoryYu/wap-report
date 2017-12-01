((function(){
	var indexPage = {
		source : common.source,
		init : function(){		
			//请求当前数据		
			$('#time').html(getNowFormatDate());
			var day = getNowFormatDay();
			var parames = {
				pageSize : 1,
				currentPage : 1,
				startDate : day,
				endDate : day
			};
			this.ajax('/summary/dailyList',parames,this.dailyListCb,'POST');										
		},
		checkTouch : function(){//页面点击事件
			var me = this;		
			var second = 30*60*1000;	
			//每隔30分钟。更新一次
			setInterval(function(){
				common.loading(true);	
				$('#time').html(getNowFormatDate());
				var day = getNowFormatDay();
				var parames = {
					pageSize : 1,
					currentPage : 1,
					startDate : day,
					endDate : day
				};
				me.ajax('/summary/dailyList',parames,function(data){
					var dataList = data.data.dataList;
					if(dataList && dataList.length>0){//有数据
						for(var i=0;i<dataList.length;i++){
							dataList[i].totalStock = common.toThousands(dataList[i].totalStock);
							dataList[i].newAddTotalStock = common.toThousands(dataList[i].newAddTotalStock);
							dataList[i].totalCapitalOnCall = common.toThousands(dataList[i].totalCapitalOnCall);
							dataList[i].newAddTotalCapitalOnCall = common.toThousands(dataList[i].newAddTotalCapitalOnCall);
							dataList[i].principalOnCall = common.toThousands(dataList[i].principalOnCall);
							dataList[i].interestOnCall = common.toThousands(dataList[i].interestOnCall);
							dataList[i].capitalOnCallPersonNum = common.toThousands(dataList[i].capitalOnCallPersonNum);
							dataList[i].balanceAmount = common.toThousands(dataList[i].balanceAmount);
							dataList[i].balancePersonNum = common.toThousands(dataList[i].balancePersonNum);
							dataList[i].investUnconfirmedAmount = common.toThousands(dataList[i].investUnconfirmedAmount);
							dataList[i].investUnconfirmedPersonNum = common.toThousands(dataList[i].investUnconfirmedPersonNum);
							dataList[i].investConfirmedAmount = common.toThousands(dataList[i].investConfirmedAmount);
							dataList[i].rechargeAmount = common.toThousands(dataList[i].rechargeAmount);
							dataList[i].withdrawAmount = common.toThousands(dataList[i].withdrawAmount);
							dataList[i].registeredPersonNum = common.toThousands(dataList[i].registeredPersonNum);
							dataList[i].cardPersonNum = common.toThousands(dataList[i].cardPersonNum);
							dataList[i].investPersonNum = common.toThousands(dataList[i].investPersonNum);
							dataList[i].multipleInvestPersonNum = common.toThousands(dataList[i].multipleInvestPersonNum);
							dataList[i].dailyInvestAmount = common.toThousands(dataList[i].dailyInvestAmount);
							dataList[i].dailyInvestPersonNum = common.toThousands(dataList[i].dailyInvestPersonNum);
							dataList[i].dailyMultipleInvestPersonNum = common.toThousands(dataList[i].dailyMultipleInvestPersonNum);
							dataList[i].dailyRechargeAmount = common.toThousands(dataList[i].dailyRechargeAmount);
							dataList[i].dailyWithdrawAmount = common.toThousands(dataList[i].dailyWithdrawAmount);
							dataList[i].dailyRegisteredPersonNum = common.toThousands(dataList[i].dailyRegisteredPersonNum);
							dataList[i].dailyCardPersonNum = common.toThousands(dataList[i].dailyCardPersonNum);

							dataList[i].investInterestTime = common.toThousands(dataList[i].investInterestTime);
							dataList[i].investInterestTimeRepaid = common.toThousands(dataList[i].investInterestTimeRepaid);
							dataList[i].investInterestTimeUnrepay = common.toThousands(dataList[i].investInterestTimeUnrepay);
							dataList[i].investInterestTimeOverdue = common.toThousands(dataList[i].investInterestTimeOverdue);

							dataList[i].noviceInvestTotalAmount = common.toThousands(dataList[i].noviceInvestTotalAmount);
							dataList[i].noviceFirstInvestTotalAmount = common.toThousands(dataList[i].noviceFirstInvestTotalAmount);
							dataList[i].noviceReinvestTotalAmount = common.toThousands(dataList[i].noviceReinvestTotalAmount);
						}
						$('#nothing').addClass('hide');
						$('#reportList').removeClass('hide');
						$('#reportList').html(tmpl($('#reportListTMP').text(),dataList));
					}	
					common.loading(false);	
				},'POST');
			},second);
			// slide({container:"#container",next: function (e) {
			//     //松手之后执行逻辑,ajax请求数据，数据返回后隐藏加载中提示
			//     var that = this;
			//     common.loading(true);
			//     $('#time').html(getNowFormatDate());
			// 	var day = getNowFormatDay();
			// 	var parames = {
			// 		pageSize : 1,
			// 		currentPage : 1,
			// 		startDate : day,
			// 		endDate : day
			// 	};
			// 	me.ajax('/summary/dailyList',parames,function(data){
			// 		var dataList = data.data.dataList;
			// 		if(dataList && dataList.length>0){//有数据
			// 			for(var i=0;i<dataList.length;i++){
			// 				dataList[i].totalStock = common.toThousands(dataList[i].totalStock);
			// 				dataList[i].newAddTotalStock = common.toThousands(dataList[i].newAddTotalStock);
			// 				dataList[i].totalCapitalOnCall = common.toThousands(dataList[i].totalCapitalOnCall);
			// 				dataList[i].newAddTotalCapitalOnCall = common.toThousands(dataList[i].newAddTotalCapitalOnCall);
			// 				dataList[i].principalOnCall = common.toThousands(dataList[i].principalOnCall);
			// 				dataList[i].interestOnCall = common.toThousands(dataList[i].interestOnCall);
			// 				dataList[i].capitalOnCallPersonNum = common.toThousands(dataList[i].capitalOnCallPersonNum);
			// 				dataList[i].balanceAmount = common.toThousands(dataList[i].balanceAmount);
			// 				dataList[i].balancePersonNum = common.toThousands(dataList[i].balancePersonNum);
			// 				dataList[i].investUnconfirmedAmount = common.toThousands(dataList[i].investUnconfirmedAmount);
			// 				dataList[i].investUnconfirmedPersonNum = common.toThousands(dataList[i].investUnconfirmedPersonNum);
			// 				dataList[i].investConfirmedAmount = common.toThousands(dataList[i].investConfirmedAmount);
			// 				dataList[i].rechargeAmount = common.toThousands(dataList[i].rechargeAmount);
			// 				dataList[i].withdrawAmount = common.toThousands(dataList[i].withdrawAmount);
			// 				dataList[i].registeredPersonNum = common.toThousands(dataList[i].registeredPersonNum);
			// 				dataList[i].cardPersonNum = common.toThousands(dataList[i].cardPersonNum);
			// 				dataList[i].investPersonNum = common.toThousands(dataList[i].investPersonNum);
			// 				dataList[i].multipleInvestPersonNum = common.toThousands(dataList[i].multipleInvestPersonNum);
			// 				dataList[i].dailyInvestAmount = common.toThousands(dataList[i].dailyInvestAmount);
			// 				dataList[i].dailyInvestPersonNum = common.toThousands(dataList[i].dailyInvestPersonNum);
			// 				dataList[i].dailyMultipleInvestPersonNum = common.toThousands(dataList[i].dailyMultipleInvestPersonNum);
			// 				dataList[i].dailyRechargeAmount = common.toThousands(dataList[i].dailyRechargeAmount);
			// 				dataList[i].dailyWithdrawAmount = common.toThousands(dataList[i].dailyWithdrawAmount);
			// 				dataList[i].dailyRegisteredPersonNum = common.toThousands(dataList[i].dailyRegisteredPersonNum);
			// 				dataList[i].dailyCardPersonNum = common.toThousands(dataList[i].dailyCardPersonNum);
			// 			}
			// 			$('#nothing').addClass('hide');
			// 			$('#reportList').removeClass('hide');
			// 			$('#reportList').html(tmpl($('#reportListTMP').text(),dataList));
			// 		}else{
			// 			alert('没有更多数据');
			// 		}
			// 		that.back.call();		
			// 		common.loading(false);	
			// 	},'POST');						    
			// }});
			$('#logout').on('click',function(){

				common.loading(true);
				me.ajax('/summary/userLogout',null,me.logoutCb,'POST');
			});
			$('#historyData').on('click',function(){

				common.loading(true);
				//跳转到历史数据报表页面
				window.location.href = "historyReport";
			});
			$('#menu').on('click',function(){
				if($('#menuList').hasClass('hide')){
					$('#menuList').removeClass('hide');
					$('#menuList > li').on('click',function(){
						var href = $(this).attr('id');
						window.location.href = href;
					});
				}else{
					$('#menuList').addClass('hide');
					$('#menuList > li').off();
				}
			});
		},	
		logoutCb : function(data){
			//退出成功，跳转到登录页
			alert('退出登录');
			window.location.href = "signin";
		},
		dailyListCb : function(data){
			var dataList = data.data.dataList;
			if(dataList && dataList.length>0){//有数据
				for(var i=0;i<dataList.length;i++){
					dataList[i].totalStock = common.toThousands(dataList[i].totalStock);
					dataList[i].newAddTotalStock = common.toThousands(dataList[i].newAddTotalStock);
					dataList[i].totalCapitalOnCall = common.toThousands(dataList[i].totalCapitalOnCall);
					dataList[i].newAddTotalCapitalOnCall = common.toThousands(dataList[i].newAddTotalCapitalOnCall);
					dataList[i].principalOnCall = common.toThousands(dataList[i].principalOnCall);
					dataList[i].interestOnCall = common.toThousands(dataList[i].interestOnCall);
					dataList[i].capitalOnCallPersonNum = common.toThousands(dataList[i].capitalOnCallPersonNum);
					dataList[i].balanceAmount = common.toThousands(dataList[i].balanceAmount);
					dataList[i].balancePersonNum = common.toThousands(dataList[i].balancePersonNum);
					dataList[i].investUnconfirmedAmount = common.toThousands(dataList[i].investUnconfirmedAmount);
					dataList[i].investUnconfirmedPersonNum = common.toThousands(dataList[i].investUnconfirmedPersonNum);
					dataList[i].investConfirmedAmount = common.toThousands(dataList[i].investConfirmedAmount);
					dataList[i].rechargeAmount = common.toThousands(dataList[i].rechargeAmount);
					dataList[i].withdrawAmount = common.toThousands(dataList[i].withdrawAmount);
					dataList[i].registeredPersonNum = common.toThousands(dataList[i].registeredPersonNum);
					dataList[i].cardPersonNum = common.toThousands(dataList[i].cardPersonNum);
					dataList[i].investPersonNum = common.toThousands(dataList[i].investPersonNum);
					dataList[i].multipleInvestPersonNum = common.toThousands(dataList[i].multipleInvestPersonNum);
					dataList[i].dailyInvestAmount = common.toThousands(dataList[i].dailyInvestAmount);
					dataList[i].dailyInvestPersonNum = common.toThousands(dataList[i].dailyInvestPersonNum);
					dataList[i].dailyMultipleInvestPersonNum = common.toThousands(dataList[i].dailyMultipleInvestPersonNum);
					dataList[i].dailyRechargeAmount = common.toThousands(dataList[i].dailyRechargeAmount);
					dataList[i].dailyWithdrawAmount = common.toThousands(dataList[i].dailyWithdrawAmount);
					dataList[i].dailyRegisteredPersonNum = common.toThousands(dataList[i].dailyRegisteredPersonNum);
					dataList[i].dailyCardPersonNum = common.toThousands(dataList[i].dailyCardPersonNum);

					dataList[i].investInterestTime = common.toThousands(dataList[i].investInterestTime);
					dataList[i].investInterestTimeRepaid = common.toThousands(dataList[i].investInterestTimeRepaid);
					dataList[i].investInterestTimeUnrepay = common.toThousands(dataList[i].investInterestTimeUnrepay);
					dataList[i].investInterestTimeOverdue = common.toThousands(dataList[i].investInterestTimeOverdue);

					dataList[i].noviceInvestTotalAmount = common.toThousands(dataList[i].noviceInvestTotalAmount);
					dataList[i].noviceFirstInvestTotalAmount = common.toThousands(dataList[i].noviceFirstInvestTotalAmount);
					dataList[i].noviceReinvestTotalAmount = common.toThousands(dataList[i].noviceReinvestTotalAmount);
				}
				$('#nothing').addClass('hide');
				$('#reportList').removeClass('hide');
				$('#reportList').html(tmpl($('#reportListTMP').text(),dataList));
			}
			indexPage.checkTouch();				
			common.loading(false);	
		},		
		ajax: function(action,parames,succCb,type){
			var me = this;
			if(parames){
				if(!parames.source){
					parames.source = me.source;
				}
			}
			$.ajax({
	            url: action,
	            dataType: 'json',
	            data: parames,
	            type: type,
	            xhrFields: { withCredentials: true },
	            crossDomain: true,
	            success: function (data) {
	                var status = data.status;
	                if(status == 'SUCCESS'){
	                	succCb && succCb(data); 
	                }else{	    
	                	alert(data.msg);            		                	                	
	                	if(status == "LOGOUT"){
	                		window.location.href = 'signin';
	                	}else{
	                		common.loading(false);	                		                		
	                	}
	                }	                			   			                
	            },
	            error: function (err) {
	            	common.loading(false);
	            	alert('ERROR:'+JSON.stringify(err));
	            }
	        });
		},	
	};

	var slide = function (option) {
	    var defaults={
	        container:'',
	        next:function(){}
	    }
	    var start,
	            end,
	            length,
	            isLock = false,//是否锁定整个操作
	            isCanDo = false,//是否移动滑块
	            isTouchPad = (/hp-tablet/gi).test(navigator.appVersion),
	            hasTouch = 'ontouchstart' in window && !isTouchPad;
	    var obj = document.querySelector(option.container);
	    var loading=obj.firstElementChild;
	    var offset=loading.clientHeight;
	    var objparent = obj.parentElement;
	    /*操作方法*/
	    var fn =
	    {
	        //移动容器
	        translate: function (diff) {
	            obj.style.webkitTransform='translate3d(0,'+diff+'px,0)';
	            obj.style.transform='translate3d(0,'+diff+'px,0)';
	        },
	        //设置效果时间
	        setTransition: function (time) {
	            obj.style.webkitTransition='all '+time+'s';
	            obj.style.transition='all '+time+'s';
	        },
	        //返回到初始位置
	        back: function () {
	            fn.translate(0 - offset);
	            //标识操作完成
	            isLock = false;
	        },
	        addEvent:function(element,event_name,event_fn){
	            if (element.addEventListener) {
	                element.addEventListener(event_name, event_fn, false);
	            } else if (element.attachEvent) {
	                element.attachEvent('on' + event_name, event_fn);
	            } else {
	                element['on' + event_name] = event_fn;
	            }
	        }
	    };

	    fn.translate(0-offset);
	    fn.addEvent(obj,'touchstart',start);
	    fn.addEvent(obj,'touchmove',move);
	    fn.addEvent(obj,'touchend',end);
	    fn.addEvent(obj,'mousedown',start)
	    fn.addEvent(obj,'mousemove',move)
	    fn.addEvent(obj,'mouseup',end)

	    //滑动开始
	    function start(e) {
	        if (objparent.scrollTop <= 0 && !isLock) {
	            var even = typeof event == "undefined" ? e : event;
	            //标识操作进行中
	            isLock = true;
	            isCanDo = true;
	            //保存当前鼠标Y坐标
	            start = hasTouch ? even.touches[0].pageY : even.pageY;
	            //消除滑块动画时间
	            fn.setTransition(0);
	            loading.innerHTML='下拉刷新数据';
	        }
	        return false;
	    }

	    //滑动中
	    function move(e) {
	        if (objparent.scrollTop <= 0 && isCanDo) {
	            var even = typeof event == "undefined" ? e : event;
	            //保存当前鼠标Y坐标
	            end = hasTouch ? even.touches[0].pageY : even.pageY;
	            if (start < end) {
	                even.preventDefault();
	                //消除滑块动画时间
	                fn.setTransition(0);
	                //移动滑块
	                if((end-start-offset)/2<=150) {
	                    length=(end - start - offset) / 2;
	                    fn.translate(length);
	                }
	                else {
	                    length+=0.3;
	                    fn.translate(length);
	                }
	            }
	        }
	    }
	    //滑动结束
	    function end(e) {
	        if (isCanDo) {
	            isCanDo = false;
	            //判断滑动距离是否大于等于指定值
	            if (end - start >= offset) {
	                //设置滑块回弹时间
	                fn.setTransition(1);
	                //保留提示部分
	                fn.translate(0);
	                //执行回调函数
	                loading.innerHTML='正在刷新数据';
	                if (typeof option.next == "function") {
	                    option.next.call(fn, e);
	                }
	            } else {
	                //返回初始状态
	                fn.back();
	            }
	        }
	    }
	}

	function getNowFormatDate() {
	    var date = new Date();
	    var seperator1 = "-";
	    var seperator2 = ":";
	    var month = date.getMonth() + 1;
	    var strDate = date.getDate();
	    if (month >= 1 && month <= 9) {
	        month = "0" + month;
	    }
	    if (strDate >= 0 && strDate <= 9) {
	        strDate = "0" + strDate;
	    }
	    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
	            + " " + date.getHours() + seperator2 + date.getMinutes()
	            + seperator2 + date.getSeconds();
	    return currentdate;
	}

	function getNowFormatDay() {
	    var date = new Date();
	    var seperator1 = "-";
	    var seperator2 = ":";
	    var month = date.getMonth() + 1;
	    var strDate = date.getDate();
	    if (month >= 1 && month <= 9) {
	        month = "0" + month;
	    }
	    if (strDate >= 0 && strDate <= 9) {
	        strDate = "0" + strDate;
	    }
	    var currentday = date.getFullYear() + seperator1 + month + seperator1 + strDate;
	    return currentday;
	}

	//html模板方法
	var tmpl = (function(cache) {
        var r = /(?:^|%>)([\s|\S]*?)(<%(?!\=)|$)/g,
            z = /(\"|\\)/g,
            m = /<%=([\s\S]*?)%>/g;
        return function(s, data) {
            if (!(s in cache)) {
                cache[s] = s.replace(r, function(a, b) {
                    return ';s.push("' + b.replace(z, "\\$1").replace(m, function(e, f) {
                            return '",' + f.replace(/\\"/g, '"') + ',"';
                        }) + '");';
                }).replace(/\r|\n/g, "");
            }
            var $fn = Function('data', "var s=[];" + cache[s] + " return s.join('');");
            return data ? $fn(data) : $fn;
        };
    })({});

	common.loading(true); 
	indexPage.init();
})());

