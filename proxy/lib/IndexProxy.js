const Util = require('../../util').Util;
class IndexProxy{
    IndexProxy(){}
    /**
     * 获取首页信息
     * @param callback
     */
    indexInfo(req, callback){
        Util.get('index/indexInfo', {}, callback, req);
    }
}

let indexProxy = new IndexProxy();

exports = module.exports = {
    indexInfo  : indexProxy.indexInfo
};