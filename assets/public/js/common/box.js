var Box={
    //数据提交回调
    onSubmit:function(res){
        $(".Box").on("click",".submit",function(){
            res();
        });
    },
    //弹框关闭
    onClose:function(){
        var me=this;
        $(".Global_tool_bar").on("click",".close",function(){
            me.onShow($(".Global_tool_bar"));
        });
        $(".Box_protocol_1").on("click",".close",function(){
            Box.onShow($(".Box_protocol_1"));
        });
        $(".Box_protocol_2").on("click",".close",function(){
            Box.onShow($(".Box_protocol_2"));
        });
        $(".Box_protocol_3").on("click",".close",function(){
            Box.onShow($(".Box_protocol_3"));
        });
        $(".Box_protocol_4").on("click",".close",function(){
            Box.onShow($(".Box_protocol_4"));
        });
    },
    //弹框显示 隐藏
    onShow:function(obj){
        var istrue=obj.css("display");
        obj.css("display",(istrue=="block")?"none":"block");
        $("#Box_Fix").css("display",(istrue=="block")?"none":"block");
    },
    init:function(){
        this.onClose();
        this.onSubmit();
    }
};
$(function(){Box.init()});