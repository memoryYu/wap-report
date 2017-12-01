const Proxy = require('../../proxy');
let Util = require('../../util').Util;
class IndexController{
    IndexController(){}

    /**
     * 首页
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    index(req, res, next){
        Proxy.IndexProxy.indexInfo(req, (error, result) => {
            if(result.data.code === 'S0000001' && result.data.data){
                /**
                 * 产品列表
                 */
                let investProjectList = result.data.data.investProjectList;
                result.data.data.newBid = [];
                result.data.data.fixedBid = [];
                for(let i = 0; i < investProjectList.length; i++){
                    investProjectList[i].proStatusCn = Util.getBidStatus(investProjectList[i].status, investProjectList[i].proStatusCn);
                    if(investProjectList[i].proMark === "0"){
                        result.data.data.newBid.push(investProjectList[i]);//新手标
                    }else{
                        result.data.data.fixedBid.push(investProjectList[i]);//定期理财
                    }
                }
            }
            let viewModel = {};
            viewModel.title = '映贝金服首页';
            viewModel.keywords = '<meta name="keywords" content="映贝金服,互联网理财,投资理财,理财,理财产品,票据理财,车贷理财,互联网金融" />';
            viewModel.description = '<meta name="description" content="映贝金服,互联网理财,投资理财,理财,理财产品,票据理财,车贷理财,互联网金融"/>';
            viewModel.stylesheets = [//必须为数组
                Util.setCSSLink(Util.getUrl('css/index.css')),
                Util.setCSSLink(Util.getUrl('css/common/products.css')),
                Util.setCSSLink(Util.getUrl('css/common/box.css'))
            ],
            viewModel.scripts = [//必须为数组
                Util.setJSLink(Util.getUrl('lib/SuperSlide.js')),
                Util.setJSLink(Util.getUrl('js/common/box.js')),
                Util.setJSLink(Util.getUrl('js/index.js'))
            ];
            viewModel.body = Util.getHTML('index');
            viewModel.dataList = result.data.data;
            viewModel.box = '收益计算器';
            res.render('template', viewModel);
        });
    }
    /**
     * 登录页
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    signin(req, res, next){       
        let viewModel = {};
        viewModel.title = '登录';
        viewModel.stylesheets = [//必须为数组
            Util.setCSSLink(Util.getUrl('css/signin.css')),
        ],
        viewModel.scripts = [//必须为数组
            Util.setJSLink(Util.getUrl('js/signin.js'))
        ];
        viewModel.body = Util.getHTML('signin');
        res.render('wapTemplate', viewModel);
    }
    /**
     * 当前报表页
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    currentReport(req, res, next){     
        let viewModel = {};
        viewModel.title = '业务数据统计报表';
        viewModel.stylesheets = [//必须为数组
            Util.setCSSLink(Util.getUrl('css/currentReport.css')),
        ],
        viewModel.scripts = [//必须为数组
            Util.setJSLink(Util.getUrl('js/currentReport.js'))
        ];
        viewModel.body = Util.getHTML('currentReport');
        res.render('wapTemplate', viewModel);
    }
    /**
     * 历史报表页
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    historyReport(req, res, next){     
        let viewModel = {};
        viewModel.title = '历史报表';
        viewModel.stylesheets = [//必须为数组
            Util.setCSSLink(Util.getUrl('css/historyReport.css')),
            Util.setCSSLink(Util.getUrl('css/common/select-date.ios.css')),
            Util.setCSSLink(Util.getUrl('css/common/select-date.min.css')),
        ],
        viewModel.scripts = [//必须为数组
            Util.setJSLink(Util.getUrl('lib/select-date.js')),
            Util.setJSLink(Util.getUrl('js/historyReport.js'))
        ];
        viewModel.body = Util.getHTML('historyReport');
        res.render('wapTemplate', viewModel);
    }
    /**
     * 定期回款页
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    returnReport(req, res, next){     
        let viewModel = {};
        viewModel.title = '定期回款统计';
        viewModel.stylesheets = [//必须为数组
            Util.setCSSLink(Util.getUrl('css/returnReport.css')),
            Util.setCSSLink(Util.getUrl('css/common/select-date.ios.css')),
            Util.setCSSLink(Util.getUrl('css/common/select-date.min.css')),
        ],
        viewModel.scripts = [//必须为数组
            Util.setJSLink(Util.getUrl('lib/select-date.js')),
            Util.setJSLink(Util.getUrl('js/returnReport.js'))
        ];
        viewModel.body = Util.getHTML('returnReport');
        res.render('wapTemplate', viewModel);
    }
    /**
     * 定期复投页
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    reinvestReport(req, res, next){     
        let viewModel = {};
        viewModel.title = '定期回款统计';
        viewModel.stylesheets = [//必须为数组
            Util.setCSSLink(Util.getUrl('css/reinvestReport.css')),
            Util.setCSSLink(Util.getUrl('css/common/select-date.ios.css')),
            Util.setCSSLink(Util.getUrl('css/common/select-date.min.css')),
        ],
        viewModel.scripts = [//必须为数组
            Util.setJSLink(Util.getUrl('lib/select-date.js')),
            Util.setJSLink(Util.getUrl('js/reinvestReport.js'))
        ];
        viewModel.body = Util.getHTML('reinvestReport');
        res.render('wapTemplate', viewModel);
    }
    /**
     * 平台渠道页
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    channelReport(req, res, next){     
        let viewModel = {};
        viewModel.title = '平台渠道统计';
        viewModel.stylesheets = [//必须为数组
            Util.setCSSLink(Util.getUrl('css/channelReport.css')),
            Util.setCSSLink(Util.getUrl('css/common/select-date.ios.css')),
            Util.setCSSLink(Util.getUrl('css/common/select-date.min.css')),
        ],
        viewModel.scripts = [//必须为数组
            Util.setJSLink(Util.getUrl('lib/select-date.js')),
            Util.setJSLink(Util.getUrl('js/channelReport.js'))
        ];
        viewModel.body = Util.getHTML('channelReport');
        res.render('wapTemplate', viewModel);
    }
}

const indexController = new IndexController();

exports = module.exports = {
    //首页
    index           : indexController.index,
    signin          : indexController.signin,
    currentReport   : indexController.currentReport,
    historyReport   : indexController.historyReport,
    returnReport    : indexController.returnReport,
    reinvestReport  : indexController.reinvestReport,
    channelReport   : indexController.channelReport
};