
let config = require('../../config/config');
let current = config[config.current];
exports = module.exports = {
    /**
     * 千分位
     * @param num
     * @returns {*}
     */
    toThousands: function(num){//千位用逗号隔开
        if(!num){
            return '';
        }
        num = num.toString();
        let tempArr = num.split('.');
        if(tempArr.length > 1){
            return tempArr[0].replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') + '.' + (tempArr[1] && tempArr[1].match(/\d\d/));
        }
        return num.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
    },
    /**
     *  请求路径
     */
    requestPath : function(path){
        return current.host + ':' + current.port + (path || '');
    }
}