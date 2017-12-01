((function(){
	var instance,instance2;
	var selectDate = {
        init : function(date){
        	var now = new Date();
        	var maxValue;
        	if(date){
        		var dateArr = date.split(',');
        		maxValue = new Date(dateArr[0],dateArr[1],dateArr[2]);
        	}else{
        		maxValue = new Date(now.getFullYear()+1,11,31);
        	}
            instance = mobiscroll.date('#start', {
            	max : maxValue,
                theme: 'ios',
                display: 'bottom',
                lang : 'zh',
                yearSuffix : '年',
                setText : '完成',
                dateFormat : 'yy-mm-dd',
                headerText : '请选择开始时间',
                context : 'body',
                onBeforeShow : function(event, inst){
                },
                onBeforeClose : function(event, inst){  
                }
            });
            instance.show();
        }
    };

    var selectDate2 = {
        init : function(date){
        	date = date.toString();
        	var now = new Date();
        	var minValue;
        	if(date){
        		var dateArr = date.split(',');
        		minValue = new Date(dateArr[0],dateArr[1],dateArr[2]);
        	}else{
        		minValue = new Date(now.getFullYear()-100,0,1);
        	}
            instance2 = mobiscroll.date('#end', {
            	min : minValue,
                theme: 'ios',
                display: 'bottom',
                lang : 'zh',
                yearSuffix : '年',
                setText : '完成',
                dateFormat : 'yy-mm-dd',
                headerText : '请选择结束时间',
                context : 'body',
                onBeforeShow : function(event, inst){
                },
                onBeforeClose : function(event, inst){  
                }
            });
            instance2.show();
        }
    };
    
	var indexPage = {
		source : common.source,
		currentPage : 1,//历史数据当前页码
		choosePage : 1,//筛选数据的当前页码
		startDate : '',//筛选开始时间
		endDate : '',//筛选结束时间
		beforeScrollLeft : 0,
		clearTime : null,
		pageSize : 10,
		channelCodes : '',//筛选渠道
		init : function(){		
			var time = '更新时间：' + getNowFormatDate();
			$('#time').html(time);
			//请求当前数据
			var parames = {
				pageSize : this.pageSize,
				currentPage : this.currentPage,
				startDate : '',
				endDate : '',
				channelCodes : this.channelCodes,
			};
			this.ajax('/summary/channelDailyList',parames,this.dailyListCb,'GET');
												
		},
		scrollLoad : function(){
			var me = this;
			common.loading(true);
			 
			var day = getNowFormatDay();
			var parames = {
				pageSize : me.pageSize,
				currentPage : me.currentPage,
				startDate : me.startDate,
				endDate : me.endDate,
				channelCodes : me.channelCodes,
			};
			me.ajax('/summary/channelDailyList',parames,function(data){
				var dataList = data.data.dataList;
				if(dataList && Object.keys(dataList).length>0){//有数据
					for(var key in dataList){						
						for(var i=0;i<dataList[key].length;i++){					
							dataList[key][i].dailyRegPersonNum = common.toThousands(dataList[key][i].dailyRegPersonNum);
							dataList[key][i].dailyCardPersonNum = common.toThousands(dataList[key][i].dailyCardPersonNum);
							dataList[key][i].dailyRechangeAmount = common.toThousands(unRound(dataList[key][i].dailyRechangeAmount,2));
							dataList[key][i].dailyInvestAmount = common.toThousands(unRound(dataList[key][i].dailyInvestAmount,2));
							dataList[key][i].dailyFirstInvestAmount = common.toThousands(unRound(dataList[key][i].dailyFirstInvestAmount,2));
							dataList[key][i].dailyMultInvestAmount = common.toThousands(unRound(dataList[key][i].dailyMultInvestAmount,2));
							dataList[key][i].dailyWithdrawAmount = common.toThousands(unRound(dataList[key][i].dailyWithdrawAmount,2));
						}
						key = (key).replace(/-/g, '/');
					}
					//每行末尾添加数据
					$('#tbody').append(tmpl($('#addTMP').text(),dataList));					
					me.currentPage++;
				}else{
					$('#tbody').off();
					alert('没有更多数据');
				}	
				common.loading(false);	
			},'get');	
		},
		/**
	     * 滚动加载数据
	     */
		scrollInit : function(){
			var me = this;
			me.beforeScrollLeft = 0;
			$('#tbody').off().scroll(function(){		    	
	            me.clearTime && clearTimeout(me.clearTime);
	            var afterScrollLeft = $('#tbody').scrollLeft();
	            var delta = afterScrollLeft - me.beforeScrollLeft;
	            if(delta === 0){
	                return false;
	            }
	            if(delta > 0){
	                me.clearTime = setTimeout(function(){
	                	var num = $('#tbody > ul').length;
	                    var scrollLeft = $('#tbody').scrollLeft();
	                    var scrollWidth = $('#tbody > .dataList:nth-child(1)').width()*num + parseInt($('#tbody').css('padding-left'));
	                    var windowWidth = $(window).width();
	                    if (scrollLeft + windowWidth + 3 >= scrollWidth) {//多出的3px是边框的距离
	                        me.scrollLoad();
	                    }
	                    me.beforeScrollLeft = scrollLeft;
	                }, 200);
	            }
		    });	
		},
		checkTouch : function(){//页面点击事件
			var me = this;	
			me.scrollInit();	
			//筛选
			$('#chooseAll').on('click',function(){
				$('#channelPop').removeClass('hide');	
				common.loading(true);
				//获取渠道列表
				me.ajax('/summary/selectChannelByProperties',null,function(data){
					$('#channelList').html(tmpl($('#channelListTMP').text(),data.data));
					me.checkTouch3();
					common.loading(false);
				},'get');			
								
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
		// 日期格式转换
		convertFormat : function(date){
			var newDate;
			newDate = date.split('-');
			for(var i=0;i<newDate.length;i++){
				if(i==1 || i==2){
					if(newDate[i] < 10){//去掉0
		               newDate[i] = newDate[i].substring(1,2);
		            }
		            if(i==1){//月份减1
		            	newDate[i] = newDate[i]-1;
		            }
				}
			}
			newDate = newDate.join(',');
			return newDate;
		},
		channelChooseOff : function(){
			$('#channelPop').addClass('hide');
			$('#back').off();
			$('#choose').off();
			$('#channelList li').off();
			$('#qr').off();
			$('#cz').off();
		},
		checkTouch3 : function(){
			var me = indexPage;
			//返回主页，隐藏筛选页
			$('#back').on('click',function(){
				me.channelChooseOff();
			});
			//筛选日期	
			$('#choose').on('click',function(){
				$('#inputPop').removeClass('hide');				
				me.checkTouch2();				
			});
			$('#channelList li').on('click',function(){
				if($(this).hasClass('active')){
					$(this).removeClass('active');
				}else{
					$(this).addClass('active');
				}
			});	
			//确认
			$('#qr').on('click',function(){
				$(this).addClass('active');
				$('#cz').removeClass('active');
				if($('#channelList li').hasClass('active')){//选择了渠道
					common.loading(true);
					me.channelChooseOff();
					var channelList = [];
					for(var i=0;i<$('#channelList li').length;i++){
						if($('#channelList li:nth-child('+i+')').hasClass('active')){
							$('#channelList li:nth-child('+i+')').data('channel') && channelList.push($('#channelList li:nth-child('+i+')').data('channel'));
						}
					}
					me.channelCodes = channelList.join(',');
					var day = getNowFormatDay();
					me.choosePage = 1;
					var parames = {
						pageSize : me.pageSize,
						currentPage : me.choosePage,
						startDate : me.startDate,
						endDate : me.endDate,
						channelCodes : me.channelCodes
					};
					
					me.ajax('/summary/channelDailyList',parames,function(data){
						var dataList = data.data.dataList;
						var dataTotalList = data.data.dataTotalList;
						if(dataList && Object.keys(dataList).length>0){//有数据
							for(var key in dataList){								
								for(var i=0;i<dataList[key].length;i++){					
									dataList[key][i].dailyRegPersonNum = common.toThousands(dataList[key][i].dailyRegPersonNum);
									dataList[key][i].dailyCardPersonNum = common.toThousands(dataList[key][i].dailyCardPersonNum);
									dataList[key][i].dailyRechangeAmount = common.toThousands(unRound(dataList[key][i].dailyRechangeAmount,2));
									dataList[key][i].dailyInvestAmount = common.toThousands(unRound(dataList[key][i].dailyInvestAmount,2));
									dataList[key][i].dailyFirstInvestAmount = common.toThousands(unRound(dataList[key][i].dailyFirstInvestAmount,2));
									dataList[key][i].dailyMultInvestAmount = common.toThousands(unRound(dataList[key][i].dailyMultInvestAmount,2));
									dataList[key][i].dailyWithdrawAmount = common.toThousands(unRound(dataList[key][i].dailyWithdrawAmount,2));
								}
								key = (key).replace(/-/g, '/');
							}
							for(var i=0;i<dataTotalList.length;i++){
								dataTotalList[i].dailyMultInvestAmount = common.toThousands(unRound(dataTotalList[i].dailyMultInvestAmount,2));	
								dataTotalList[i].dailyInvestAmount = common.toThousands(unRound(dataTotalList[i].dailyInvestAmount,2));
								dataTotalList[i].dailyRechangeAmount = common.toThousands(unRound(dataTotalList[i].dailyRechangeAmount,2));
								dataTotalList[i].dailyFirstInvestAmount = common.toThousands(unRound(dataTotalList[i].dailyFirstInvestAmount,2));
								dataTotalList[i].dailyWithdrawAmount = common.toThousands(unRound(dataTotalList[i].dailyWithdrawAmount,2));	
							}
							$('#nothing').addClass('hide');
							$('#main').css('overflow','scroll');
							$('#reportTable').removeClass('hide');
							var tmplData = {dataList,dataTotalList};
							console.log(dataList);
							console.log(dataTotalList);
							$('#reportTable').html(tmpl($('#reportTableTMP').text(),tmplData));
							me.choosePage++;
						}else{//显示没有数据
							$('#main').css('overflow','hidden');
							$('#nothing').removeClass('hide');
							$('#reportTable').addClass('hide');
						}
						me.currentPage = me.choosePage;
						
						me.scrollInit();
						common.loading(false);	
					},'get');
				}else{//没有选择渠道
					alert('请至少选择一个渠道！');
				}
			});
			//重置
			$('#cz').on('click',function(){
				$(this).addClass('active');
				$('#qr').removeClass('active');
				var time = '更新时间：' + getNowFormatDate();
				$('#time').html(time);
				$('#time2').html('全部');
				me.startDate = '';
				me.endDate = '';
				$('#channelList li').addClass('active');
			});	
		},	
		checkTouch2 : function(){
			var me = indexPage;
			$('#start').on('click',function(){
				var endDate = $('#end').val();
				instance2 && instance2.destroy();
				selectDate.init(me.convertFormat(endDate));			
			});
			$('#end').on('click',function(){
				var startDate = $('#start').val();
				instance && instance.destroy();
				selectDate2.init(me.convertFormat(startDate));
			});
			$('#cancel').on('click',function(){

				$('#inputPop').addClass('hide');
				$('#cancel').off();
				$('#sure').off();
				$('#start').off();
				$('#end').off();
			});	
			//筛选时间确定，发送请求
			$('#sure').on('click',function(){
				var startDate = $('#start').val();
				var endDate = $('#end').val();
				me.startDate = startDate;
				me.endDate = endDate;
				if(!startDate){
					alert('请输入开始时间');
				}else if(!endDate){
					alert('请输入结束时间');
				}else{
					// common.loading(true);
					var time = '筛选结果：' + startDate + ' 至 ' + endDate;
					var time2 = startDate + ' 至 ' + endDate;
					$('#time').html(time);
					$('#time2').html(time2);
					$('#inputPop').addClass('hide');
					$('#cancel').off();
					$('#sure').off();
					$('#start').off();
					$('#end').off();
				}				
			});		
		},
		dailyListCb : function(data){
			var dataList = data.data.dataList;
			var dataTotalList = data.data.dataTotalList;
			if(dataList && Object.keys(dataList).length>0){//有数据
				for(var key in dataList){					
					for(var i=0;i<dataList[key].length;i++){					
						dataList[key][i].dailyRegPersonNum = common.toThousands(dataList[key][i].dailyRegPersonNum);
						dataList[key][i].dailyCardPersonNum = common.toThousands(dataList[key][i].dailyCardPersonNum);
						dataList[key][i].dailyRechangeAmount = common.toThousands(unRound(dataList[key][i].dailyRechangeAmount,2));
						dataList[key][i].dailyInvestAmount = common.toThousands(unRound(dataList[key][i].dailyInvestAmount,2));
						dataList[key][i].dailyFirstInvestAmount = common.toThousands(unRound(dataList[key][i].dailyFirstInvestAmount,2));
						dataList[key][i].dailyMultInvestAmount = common.toThousands(unRound(dataList[key][i].dailyMultInvestAmount,2));
						dataList[key][i].dailyWithdrawAmount = common.toThousands(unRound(dataList[key][i].dailyWithdrawAmount,2));
					}
					key = (key).replace(/-/g, '/');
				}
				for(var i=0;i<dataTotalList.length;i++){
					dataTotalList[i].dailyMultInvestAmount = common.toThousands(unRound(dataTotalList[i].dailyMultInvestAmount,2));	
					dataTotalList[i].dailyInvestAmount = common.toThousands(unRound(dataTotalList[i].dailyInvestAmount,2));
					dataTotalList[i].dailyRechangeAmount = common.toThousands(unRound(dataTotalList[i].dailyRechangeAmount,2));
					dataTotalList[i].dailyFirstInvestAmount = common.toThousands(unRound(dataTotalList[i].dailyFirstInvestAmount,2));
					dataTotalList[i].dailyWithdrawAmount = common.toThousands(unRound(dataTotalList[i].dailyWithdrawAmount,2));	
				}
				$('#nothing').addClass('hide');
				$('#main').css('overflow','scroll');
				$('#reportTable').removeClass('hide');
				var tmplData = {dataList,dataTotalList};
				console.log(dataList);
				console.log(dataTotalList);
				$('#reportTable').html(tmpl($('#reportTableTMP').text(),tmplData));
				indexPage.currentPage++;
			}else{
				$('#main').css('overflow','hidden');
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

	function unRound(num,digit){
        if(!num){
            num = 0;
        }
        let unRoundNum = (Math.floor(num * Math.pow(10,digit)) / Math.pow(10,digit)).toFixed(digit);
        return unRoundNum;
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

