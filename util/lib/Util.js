let Status = require('../../config/status');
let Config = require('../../config/config');
let Request = require('request');
let request = Request.defaults({jar: true});
const config = require('../../config/config');
const current = config[config.current];
let manifest = require('../../assets/rev-manifest.json');
class Util {
    Util(){
    }
    /**
     * 模版地址
     */
    getUrl(url){
        return current.templateUrl + (manifest[url] ? manifest[url] : '');
    }
    getDefaultImg(){
        return 'https://image.yingbeijf.com/common/default.png';
    }
    /**
     * 获取HTML
     * @param {*} path 
     */
    getHTML(path){
        return path + '.html'
    }
    /**
     * css Link
     * @param {*} url 
     */
    setCSSLink(url){
        return url ? '<link rel="stylesheet" type="text/css" href="' + url + '"/>' : '';
    }
    /**
     * js link
     * @param {*} url 
     */
    
    setJSLink(url){
        return url ? '<script src="' + url + '"></script>' : '';
    }
    /**
     * 返回封装
     * @param res
     * @param result
     */
    responseJSON(res, result){
        let cookie = result.cookie;
        if(cookie && cookie.JSESSIONID){
            res.cookie('JSESSIONID', (cookie.JSESSIONID.split('=')[1]));
        }
        res.json(result.data);
    }
    /**
     * 请求
     * @param {*请求类型} type 
     * @param {*} url 
     * @param {*} params 
     * @param {*} callback 
     * @param {*} req 
     */
    handleRequest(type, url, params, callback, req){
        let me = this;
        let paramsToString = '';
        let options = {
            url : current.url + url + '?1=1'
        };
        if(req.cookies && req.cookies.JSESSIONID){
            options.headers = {
                Cookie : req.cookies.JSESSIONID.indexOf('=') != -1 ? req.cookies.JSESSIONID : 'JSESSIONID=' + req.cookies.JSESSIONID
            };
        }
        // if(options.headers){
        //     options.headers.ybVersion = current.ybVersion;
        // }else{
        //     options.headers = {
        //         ybVersion : current.ybVersion
        //     }
        // }
        let forms = typeof(params) == 'function' ? current.commonParams : Object.assign(params, current.commonParams);
        for(let i in forms){
            options.url += '&' + i + '=' + forms[i] + '';
        }
        options.jar = request.jar();
        request[type](options, (error, response, body) => {
            console.log(body)
            console.log(12331);
            const data = me.convertData(error, req, response, body);
            callback(error, data);
        });
    };
    /**
     * Request GET
     * @param url {url 可为链接，可为对象}
     * @param callback
     */
    get(url, params, callback, req){
        this.handleRequest('get', url, params, callback, req);
    }

     /**
     * Request POST
     * @param url {url 可为链接，可为对象}
     * @param callback
     */
    post(url, params, callback, req){
        this.handleRequest('post', url, params, callback, req);
    }

    /**
     * 深复制
     * @param {*} obj 
     */
    deepClone(source){
        if(!source && typeof source !== 'object'){
            throw new Error('error arguments', 'shallowClone');
        }
        let targetObj = source.constructor === Array ? [] : {};
        for(let keys in source){
            if(source.hasOwnProperty(keys)){
                if(source[keys] && typeof source[keys] === 'object'){
                    targetObj[keys] = source[keys].constructor === Array ? [] : {};
                    targetObj[keys] = this.deepClone(source[keys]);
                }else{
                 targetObj[keys] = source[keys];
                }
            } 
        }
        return targetObj;
    }
    /**
     * 获取GET参数
     */
    getParams(req){
        // for(let i in req.query){
        //     if(!req.query[i]){
        //         req.query = JSON.parse(i);
        //     }
        // }
        return req;
    }
    /**
     * 获取POST参数
     */
    postParams(req){
        // for(let i in req.body){
        //    if(!req.body[i]){
        //      req.body = JSON.parse(i);
        //    }
        // }
        return req;
    }
    /**
     * 补全url
     * @param url
     * @returns {*}
     */
    completeUrl(url){
        if(url[0] == '/'){
            url = url.substring(1, url.length);
        }
        return Config[Config.current].url + url;
    }

    /**
     * 获取cookie
     * @param key
     * @param cookieStr
     * @returns {*}
     */
    getCookie(key, cookieStr){
        let obj = {};
        if(!cookieStr){
            return obj;
        }

        let strArr = cookieStr.split(';'), keyArr = '';
        for(let i = 0; i < strArr.length; i++){
            keyArr = strArr[i].split('=');
            obj[keyArr[0]] = keyArr[1];
        }
        return obj[key];
    }
    /**
     * 主要用于转换从服务端返回来的数据
     * @param error
     * @param response
     * @param body
     * @returns {string}
     */
    convertData(error, req, response, body){
        let JSESSIONID = '';

        if(req.cookies && req.cookies.JSESSIONID){
            JSESSIONID = 'JSESSIONID=' + req.cookies.JSESSIONID;
        }

        if(response.originalCookieHeader){
            JSESSIONID  = 'JSESSIONID=' + this.getCookie(response.originalCookieHeader);
        }else if(response.headers['set-cookie']){
            JSESSIONID = 'JSESSIONID=' + this.getCookie('JSESSIONID', response.headers['set-cookie'][0]);
        }
        if(error || !body){
            return {
                status :Status.FAIL.STATUS,
                code : Status.FAIL.CODE,
                msg : error,
                data : {}
            };
        }
        let result;
        try{
            result = typeof body == 'string' ? JSON.parse(body) : body;
            /**
             * 当绑定宝付失败时，绑盛付通
             */
            if(result.respStatus === 'FAIL' && result.errorCode === '10000002'){
                result.respStatus = 'SUCCESS';
                result.body.errorCode = '10000002';
            }
            if(!result.respStatus){
                result = {
                    body : {
                        data : JSON.parse(result)
                    }, 
                    respStatus : 'SUCCESS'
                }
            }
        }catch(error){
            return {
                status :Status.BADGETWAY.STATUS,
                code : Status.BADGETWAY.CODE,
                msg : Status.BADGETWAY.MSG,
                data : {}
            };
        }
        let obj = {};
        switch(result.respStatus){
            case 'SUCCESS' :
                obj = {
                    status : Status.SUCCESS.STATUS,
                    code   : Status.SUCCESS.CODE,
                    msg    : Status.SUCCESS.MSG,
                    data   : result.body.data || result
                };
                if(result.redWineEffective){
                    obj.data.redWineEffective = result.redWineEffective;
                    obj.data.alertMsg = result.alertMsg || '';
                }
                break;
            case 'FAIL' :
                obj = {
                    status        : Status.ERROR.STATUS,
                    code          : Status.ERROR.CODE,
                    msg           : result.errorMsgCn,
                    data          : {},
                    loginErrorCnt : result.loginErrorCnt
                };
                break;
            case 'LOGOUT' :
                obj = {
                    status : Status.LOGOUT.STATUS,
                    code   : Status.LOGOUT.CODE,
                    msg    : result.errorMsgCn,
                    data   : {}
                };
                break;
        }
        return {data : obj, cookie : { JSESSIONID : JSESSIONID }};
    }
    /**
     * 标的状态成中文
     * @param status
     * @param defaultString
     */
    getBidStatus(status, defaultString){
        let statusCn = defaultString;
        switch(status){
            case '113004' : 
                statusCn = '还款中';
                break;
            case '113003' : 
            case '113008' : 
                statusCn = '已满标';
                break;
            case '113005' : 
                statusCn = '已结清';
                break;
        }
        return statusCn;
    }

   
}

const util = new Util();

exports = module.exports = {
    convertData  : util.convertData,
    completeUrl  : util.completeUrl,
    get          : util.get,
    post         : util.post,
    responseJSON : util.responseJSON,
    getCookie    : util.getCookie,
    getBidStatus : util.getBidStatus,
    getParams    : util.getParams,
    postParams   : util.postParams,
    getDefaultImg: util.getDefaultImg,
    deepClone    : util.deepClone,
    handleRequest: util.handleRequest,
    getUrl       : util.getUrl,
    setCSSLink   : util.setCSSLink,
    setJSLink    : util.setJSLink,
    getHTML      : util.getHTML
};