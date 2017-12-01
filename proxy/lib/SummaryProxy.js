const Util = require('../../util').Util;
class SummaryProxy{
    SummaryProxy(){}
    /**
     * 发送验证码
     * @param callback
     */
    sendVerCode(req, callback){
        let params = {
            phoneNo : req.body.phoneNo,
            busCode : req.body.busCode
        };
        Util.post('summary/sendVerCode', params, callback, req);
    }
    /**
     * 用户登录
     * @param callback
     */
    login(req, callback){
        let params = {
            phoneNo      : req.body.phoneNo,
            phoneVerCode : req.body.phoneVerCode
        };
        console.log(params);
        Util.post('summary/login', params, callback, req);
    }
    /**
     * 获取日结数据
     * @param callback
     */
    dailyList(req, callback){
        let params = {
            pageSize    : req.body.pageSize,
            currentPage : req.body.currentPage,
            startDate   : req.body.startDate,
            endDate     : req.body.endDate
        };
        Util.post('summary/dailyList', params, callback, req);
    }
    /**
     * 用户登出
     * @param callback
     */
    userLogout(req, callback){
        Util.post('summary/userLogout', {}, callback, req);
    }
    /**
     * 定期还款统计
     * @param callback
     */
    dailyRepayList(req, callback){
        let params = {
            pageSize    : req.body.pageSize,
            currentPage : req.body.currentPage,
            startDate   : req.body.startDate,
            endDate     : req.body.endDate
        };
        Util.post('summary/dailyRepayList', params, callback, req);
    }
    /**
     * 定期复投统计
     * @param callback
     */
    dailyInvestList(req, callback){
        let params = {
            pageSize    : req.body.pageSize,
            currentPage : req.body.currentPage,
            startDate   : req.body.startDate,
            endDate     : req.body.endDate
        };
        Util.post('summary/dailyInvestList', params, callback, req);
    }
    /**
     * 平台渠道统计
     * @param callback
     */
    channelDailyList(req, callback){
        let params = {
            pageSize     : req.query.pageSize,
            currentPage  : req.query.currentPage,
            startDate    : req.query.startDate,
            endDate      : req.query.endDate,
            channelCodes : req.query.channelCodes,
        };
        Util.get('summary/channelDailyList', params, callback, req);
    }
    /**
     * 平台渠道总计
     * @param callback
     */
    channelDailyTotalList(req, callback){
        let params = {
            startDate    : req.query.startDate,
            endDate      : req.query.endDate
        };
        Util.get('summary/channelDailyTotalList', params, callback, req);
    }
    /**
     * 平台渠道列表
     * @param callback
     */
    selectChannelByProperties(req, callback){
        Util.get('summary/selectChannelByProperties', {}, callback, req);
    }
}

let summaryProxy = new SummaryProxy();

exports = module.exports = {
    sendVerCode                 : summaryProxy.sendVerCode,
    login                       : summaryProxy.login,
    dailyList                   : summaryProxy.dailyList,
    userLogout                  : summaryProxy.userLogout,
    dailyRepayList              : summaryProxy.dailyRepayList,
    dailyInvestList             : summaryProxy.dailyInvestList,
    channelDailyList            : summaryProxy.channelDailyList,
    channelDailyTotalList       : summaryProxy.channelDailyTotalList,
    selectChannelByProperties   : summaryProxy.selectChannelByProperties
};