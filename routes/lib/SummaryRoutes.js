const Controller = require( '../../controller');

exports = module.exports = (Express, Authentication) => {
    const Router = Express.Router();
    Router.route('/sendVerCode').post(Controller.SummaryController.sendVerCode);
    Router.route('/login').post(Controller.SummaryController.login);
    Router.route('/dailyList').post(Controller.SummaryController.dailyList);
    Router.route('/userLogout').post(Controller.SummaryController.userLogout);
    Router.route('/dailyRepayList').post(Controller.SummaryController.dailyRepayList);
    Router.route('/dailyInvestList').post(Controller.SummaryController.dailyInvestList);
    Router.route('/channelDailyList').get(Controller.SummaryController.channelDailyList);
    Router.route('/channelDailyTotalList').get(Controller.SummaryController.channelDailyTotalList);
    Router.route('/selectChannelByProperties').get(Controller.SummaryController.selectChannelByProperties);
    return Router;
};