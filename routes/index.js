module.exports = (App, Express, Authentication) => {
    App.use('/', require('./lib/IndexRoutes')(Express, Authentication));
    App.use('/summary', require('./lib/SummaryRoutes')(Express, Authentication));
}