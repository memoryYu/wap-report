const Proxy = require('../../proxy');
let Util = require('../../util').Util;
class SelectDateController{
    SelectDateController(){}
/**
     * 登录页
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    select(req, res, next){ 
        let viewModel = {};
        viewModel.title = '时间选择';
        viewModel.stylesheets = [//必须为数组
            Util.setCSSLink(Util.getUrl('css/common/select-date.min.css')),
            Util.setCSSLink(Util.getUrl('css/selectDate.css'))
        ],
        viewModel.scripts = [//必须为数组
            Util.setJSLink(Util.getUrl('lib/select-date.js')),
            Util.setJSLink(Util.getUrl('js/selectDate.js'))
        ];
        viewModel.body = Util.getHTML('selectDate');
        res.render('wapTemplate', viewModel);
    }
}

const selectDateController = new SelectDateController();

exports = module.exports = {
    //首页
    select : selectDateController.select
};