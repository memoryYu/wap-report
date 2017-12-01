/**
 * Created by brodyliao on 2016/12/20.
 */
const Express = require('express');
const Path = require('path');
const Favicon = require('serve-favicon');
const Logger = require('morgan');
const CookieParser = require('cookie-parser');
const BodyParser = require('body-parser');
const Domain = require('domain').create();
let cors = require('cors');
let compression = require('compression');
let proxy = require('http-proxy-middleware');
let ejs = require('ejs');
ejs.delimiter = '$';
// let dest = 'assets/public';
let dest = 'assets/dist/public';
// let views = 'assets/views';
let views = 'assets/dist/views';
let Util = require('./util');

let session = require('express-session');
let RedisStore = require('connect-redis')(session);

const App = Express();

App.locals.H = Util.Helper;

App.use(compression({
    filter : shouldCompress
}))

function shouldCompress (req, res) {
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header
    return false
  }
  // fallback to standard filter function
  return compression.filter(req, res)
}

// view engine setup
App.set('views', Path.join(__dirname, views));
App.set('view engine', 'html');
App.engine('html', ejs.renderFile);
// uncomment after placing your favicon in /public
App.use(Favicon(Path.join(__dirname, 'favicon.ico')));

App.use(Logger('dev'));

App.use(BodyParser.json());
App.use(BodyParser.urlencoded({ extended: false }));

App.use(CookieParser());

App.use(require('node-sass-middleware')({
    src: Path.join(__dirname, dest),
    dest: Path.join(__dirname, dest),
    indentedSyntax: true,
    sourceMap: true
}));
App.use(Express.static(Path.join(__dirname, dest)));

// let options = {
//     host : '172.16.120.7',
//     port : '6379',
//     pass : '123456',
//     db : 9
// };
// App.use(session({
//     name : 'session_id',
//     store: new RedisStore(options),
// 	resave: false,
// 	saveUninitialized: false,
//     secret: 'www.yingbeijf.com huadizg',
//     cookie : {
//         maxAge : 1000 * 60 * 60 * 2
//     }
// }));

function Authentication (req, res, next){
	if(!req.session.phoneNo){
		return res.redirect('/user/login?returnUrl=' + encodeURIComponent(req.originalUrl));		
	}
	next();
}

require('./routes')(App, Express, Authentication);

// catch 404 and forward to error handler
App.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
App.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


Domain.on('error', (err) => {
    console.log(err);
});

process.on('exit', (err) => {
    console.log(err);
});

process.on('uncaughtException',  (err) => {
    //打印出错误
    console.log(err);
    //打印出错误的调用栈方便调试
    console.log(err.stack);
});

module.exports = App;
