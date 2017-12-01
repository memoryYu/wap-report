let config = require('../../config/config');
let log4js = require('log4js');
let r = require('request');
log4js.configure(config.LogConfig);
let debuglogger;
debuglogger = log4js.getLogger('debug');
debuglogger.setLevel('TRACE');

let infologger;
infologger = log4js.getLogger('info');
infologger.setLevel('TRACE');

let errorlogger;
errorlogger = log4js.getLogger('error');
errorlogger.setLevel('TRACE');

let logServer = (AppId,ReqUrl,ReqForm,ErrorLevel,MethodName,AssemblyName,Title,Message,ExceptionName,Header,StackTrace,AddTime,MachineIp) => {
    r.post({
        url:config.LogConfig.serverUrl,
        form:{
            AppId:AppId,
            ReqUrl:ReqUrl,
            ReqForm:ReqForm,
            ErrorLevel:ErrorLevel,
            MethodName: MethodName,
            AssemblyName:AssemblyName,
            Title:Title,
            Message:Message,
            ExceptionName:ExceptionName,
            Header:Header,
            StackTrace:StackTrace,
            AddTime:AddTime,
            MachineIp:MachineIp
        }
    },(err,res,body) => {

        console.log('==========');
        console.log(err);
        console.log(body);
        console.log('==========');

    });

};



let AddLog = (msg, loglevel) => {
    switch (loglevel) {
        case 'trace':
            infologger.trace(msg);
            break;
        case 'debug':
            debuglogger.debug(msg);
            break;
        case 'info':
            infologger.info(msg);
            break;
        case 'warn':
            errorlogger.warn(msg);
            break;
        case 'error':
            errorlogger.error(msg);
            break;
        case 'fatal':
            errorlogger.fatal(msg);
            break;          
    }
}


exports.Trace = (msg) => {
    AddLog(msg, 'trace');
};

exports.Debug = (msg) => {
    AddLog(msg, 'debug');
};

exports.Info = (msg) => {
    AddLog(msg, 'info');
};

exports.Warn = (err) => {
    let o={
        AppId:global.CLIENT_INFO.AppId||'www.yingbeijf.com',                //** 系统ID
        ReqUrl:err.url||global.CLIENT_INFO.ReqUrl||'',                      //** 访问URL
        ReqForm:err.body||'',                                               //form信息
        ErrorLevel:err.level||'Warning',                                    //** 错误级别    Error/Fatal/Warning
        MethodName:err.MethodName||'',                                      //出错方法名
        AssemblyName:err.AssemblyName||'',                                  //出错类名
        Title:err.Title||'',                                                //信息头
        Message:err.Message||'',                                            //错误信息
        ExceptionName:err.ExceptionName||'',                                //异常类型名
        Header:err.Header||global.CLIENT_INFO.Header||'',                   //头信息
        StackTrace:err.StackTrace||'',                                      //错误堆栈信息
        AddTime:err.AddTime||common.GetNowTime(),                           //错误时间**
        MachineIp:global.CLIENT_INFO.MachineIp                              //本地服务器**
    };

    if(config.LogConfig.uploadLog) {
        logServer(o.AppId, o.ReqUrl, o.ReqForm, 'Error', o.MethodName, o.AssemblyName, o.Title, o.Message, o.ExceptionName, o.Header, o.StackTrace, o.AddTime, o.MachineIp);
    }
    AddLog((err.Message||''), 'warn');
};

exports.Error = (err) => {

    let o = {
        AppId:global.CLIENT_INFO.AppId||'www.yingbeijf.com',                //** 系统ID
        ReqUrl:err.url||global.CLIENT_INFO.ReqUrl||'',                      //** 访问URL
        ReqForm:err.body||'',                                               //form信息
        ErrorLevel:err.level||'Warning',                                    //** 错误级别    Error/Fatal/Warning
        MethodName:err.MethodName||'',                                      //出错方法名
        AssemblyName:err.AssemblyName||'',                                  //出错类名
        Title:err.Title||'',                                                //信息头
        Message:err.Message||'',                                            //错误信息
        ExceptionName:err.ExceptionName||'',                                //异常类型名
        Header:err.Header||global.CLIENT_INFO.Header||'',                   //头信息
        StackTrace:err.StackTrace||'',                                      //错误堆栈信息
        AddTime:err.AddTime||common.GetNowTime(),                           //错误时间**
        MachineIp:global.CLIENT_INFO.MachineIp                              //本地服务器**
    };

    if(config.LogConfig.uploadLog) {
        c(o.AppId, o.ReqUrl, o.ReqForm, 'Error', o.MethodName, o.AssemblyName, o.Title, o.Message, o.ExceptionName, o.Header, o.StackTrace, o.AddTime, o.MachineIp);
    }

    //发送至服务端
    AddLog((err.Message||''), 'error');
};

exports.Fatal = (err) => {

    //发送至服务端

    let o={
        AppId:'www.yingbeijf.com',                                          //** 系统ID
        ReqUrl:err.url||global.CLIENT_INFO.ReqUrl||'',                      //** 访问URL
        ReqForm:err.body||'',                                               //form信息
        ErrorLevel:err.level||'Warning',                                    //** 错误级别    Error/Fatal/Warning
        MethodName:err.MethodName||'',                                      //出错方法名
        AssemblyName:err.AssemblyName||'',                                  //出错类名
        Title:err.Title||'',                                                //信息头
        Message:err.Message||'',                                            //错误信息
        ExceptionName:err.ExceptionName||'',                                //异常类型名
        Header:err.Header||global.CLIENT_INFO.Header||'',                   //头信息
        StackTrace:err.StackTrace||'',                                      //错误堆栈信息
        AddTime:err.AddTime||common.GetNowTime(),                        //错误时间**
        MachineIp:global.CLIENT_INFO.MachineIp                              //本地服务器**
    };

    if(config.LogConfig.uploadLog) {
        logServer(o.AppId, o.ReqUrl, o.ReqForm, 'Fatal', o.MethodName, o.AssemblyName, o.Title, o.Message, o.ExceptionName, o.Header, o.StackTrace, o.AddTime, o.MachineIp);
    }

    AddLog((err.Message||''), 'fatal');
};

exports.Monitor = (ip, url, body) => {
    AddLog('ip:' + ip + '----url:' + url + '----body:' + body, 'trace');
};

