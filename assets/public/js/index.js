((function(){
    var index={
        setbanner:function(){
            //首页banner
            $(".slideBox").slide({
                titCell:".hd ul", 
                mainCell:".bd ul",
                delayTime:10,
                interTime:4000,
                autoPlay:true,
                autoPage: true, 
                trigger: "click",
                effect:"fold",
                pnLoop:true
            }); 
            //banner 图片适配
            $(".slideBox").find('.bd ul,.bd li').css({'width': '100%','height': '550px'});
            //左右显示
            $(".slideBox").hover(function(){
                $(".warp .bannerBox .prev,.warp .bannerBox .next").css("display","block");
            },function(){
                $(".warp .bannerBox .prev,.warp .bannerBox .next").css("display","none");
            });
            //轮播图焦点 定位
            var sliderBarWidth=$("#Slider li").length*60;
            $(".warp .bannerBox .sliderBar ul").css({"width" : sliderBarWidth,"margin-left" : -sliderBarWidth/2});
        },
        /**
         * 收益计算弹框 
         */
        handleCalculator : function(){
            $("#GlobalToolbar .profitBox").on("click",function(){
                Box.onShow($(".Global_tool_bar"));
            });
        },
        init:function(){
            this.setbanner();
            this.handleCalculator();
        }
    };
    $(function(){index.init()});
})());

