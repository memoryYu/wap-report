((function(){
    var selectDate = {
        init : function(){
            var instance = mobiscroll.date('#demo', {
                theme: 'ios',
                display: 'bottom',
                lang : 'zh',
                yearSuffix : '年',
                setText : '完成',
                dateFormat : 'yy-mm',
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

    selectDate.init();
})());

