const Proxy = require('../../proxy');
let Util = require('../../util').Util;
class SummeryController{
    SummeryController(){}
    
    sendVerCode(req, res, next){
        Proxy.SummaryProxy.sendVerCode(req, (error, result) => {
            Util.responseJSON(res, result);
        });
    }

    login(req, res, next){
        Proxy.SummaryProxy.login(req, (error, result) => {
            Util.responseJSON(res, result);
        });
    }

    dailyList(req, res, next){
        Proxy.SummaryProxy.dailyList(req, (error, result) => {
            Util.responseJSON(res, result);
        });
    }

    userLogout(req, res, next){
        Proxy.SummaryProxy.userLogout(req, (error, result) => {
            Util.responseJSON(res, result);
        });
    }

    dailyRepayList(req, res, next){
        Proxy.SummaryProxy.dailyRepayList(req, (error, result) => {
            Util.responseJSON(res, result);
        });
    }

    dailyInvestList(req, res, next){
        Proxy.SummaryProxy.dailyInvestList(req, (error, result) => {
            Util.responseJSON(res, result);
        });
    }

    channelDailyList(req, res, next){
        Proxy.SummaryProxy.channelDailyList(req, (error, result) => {
            Util.responseJSON(res, result);
        });
    }

    channelDailyTotalList(req, res, next){
        Proxy.SummaryProxy.channelDailyTotalList(req, (error, result) => {
            Util.responseJSON(res, result);
        });
    }

    selectChannelByProperties(req, res, next){
        Proxy.SummaryProxy.selectChannelByProperties(req, (error, result) => {
            Util.responseJSON(res, result);
        });
    }
}

const summeryController = new SummeryController();

exports = module.exports = {
    sendVerCode                 : summeryController.sendVerCode,
    login                       : summeryController.login,
    dailyList                   : summeryController.dailyList,
    userLogout                  : summeryController.userLogout,
    dailyRepayList              : summeryController.dailyRepayList,
    dailyInvestList             : summeryController.dailyInvestList,
    channelDailyList            : summeryController.channelDailyList,
    channelDailyTotalList       : summeryController.channelDailyTotalList,
    selectChannelByProperties   : summeryController.selectChannelByProperties,
};