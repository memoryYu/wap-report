((function(){
    var header={
        onClick:function(){
            var me=this;
            /*
            *   头部效果
            */
            //导航二维码显示
            $("#Header .headertop .itemImgShow").hover(function(){
                if($(this).is('.itemImgShow1')){
                    $("#Header .headertop .itemImg1").css({"display":"block"});
                }else if($(this).is('.itemImgShow2')){
                    $("#Header .headertop .itemImg2").css({"display":"block"});
                }else if($(this).is('.itemImgShow3')){
                    $("#Header .headertop .itemImg3").css({"display":"block"});
                }
            },function(){
                if($(this).is('.itemImgShow1')){
                    $("#Header .headertop .itemImg1").css({"display":"none"});
                }else if($(this).is('.itemImgShow2')){
                    $("#Header .headertop .itemImg2").css({"display":"none"});
                }else if($(this).is('.itemImgShow3')){
                    $("#Header .headertop .itemImg3").css({"display":"none"});
                }
            });
            $("#Header .headertop .itemImgOn").hover(function(){
                $(this).css({"display":"block"});
            },function(){
                $(this).css({"display":"none"});
            });

            /*
            *   右侧悬浮
            */
            //回到顶部
            $("#GlobalToolbar").on("click",".goTop",function(){
                $('html,body').animate({ scrollTop: 0 }, 10);
            });
            //二位码显示
            $("#GlobalToolbar .download").hover(function(){
                $("#GlobalToolbarImg").css("display","block");
            },function(){
                $("#GlobalToolbarImg").css("display","none");
            });
            
            //滚动条监控 右边显示 回到顶部
            $(window).scroll(function () {
                (($(window).scrollTop()) >= 100)?$("#GlobalToolbar a.goTop").css({"display":"block"}):$("#GlobalToolbar a.goTop").css({"display":"none"});
            });
            
        },
        /*
        *  首页头部固定跟随
        *  
        */
        setHeaderIndex:function(){
            $("#HeaderFix").css({"width":"100%","height":"132px"});
            $("#Header").css('position','fixed');
        },
        /*
        *  我的帐户 
        */
        setUser:function(){
            $("#Header .goto,#Header .gotoList").hover(function(){
                $("#Header .goto").find("a").addClass("on");
                $("#Header .gotoList").css("display","block");
            },function(){
                $("#Header .goto").find("a").removeClass("on");
                $("#Header .gotoList").css("display","none");
            });
        },
        init:function(){
            this.onClick();
            this.setHeaderIndex();
            this.setUser();
        }
    };
    $(function(){header.init()});
})());
