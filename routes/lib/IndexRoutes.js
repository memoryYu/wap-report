const Controller = require( '../../controller');

exports = module.exports = (Express, Authentication) => {
    const Router = Express.Router();
    Router.route('/').get(Controller.IndexController.currentReport);
    Router.route('/signin').get(Controller.IndexController.signin);
    Router.route('/currentReport').get(Controller.IndexController.currentReport);
    Router.route('/historyReport').get(Controller.IndexController.historyReport);
    Router.route('/returnReport').get(Controller.IndexController.returnReport);
    Router.route('/reinvestReport').get(Controller.IndexController.reinvestReport);
    Router.route('/channelReport').get(Controller.IndexController.channelReport);
    Router.route('/select').get(Controller.SelectDateController.select);
    return Router;
};