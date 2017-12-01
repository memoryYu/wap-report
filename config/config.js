exports.logDir='../log';

exports = module.exports = {
    current : 'dev',
    dev : {
        host : 'http://localhost',
        port : 6005,
        url : 'https://apptest.yingbeijf.com/server-nn-mobile-gateway/',
        commonParams : {
            source : 'WEB'
        },
        imageServer : 'https://image.yingbeijf.com/',
        templateUrl : '/'
    },
    pre : {
        host : 'https://pre.yingbeijf.com',
        port : 6005,
        url : 'https://apppre.yingbeijf.com/',
        commonParams : {
            source : 'WEB'
        },
        imageServer : 'https://image.yingbeijf.com/',
        templateUrl : '/'
    }, 
    pro : {
        host : 'https://www.yingbeijf.com',
        port : 6005,
        url : 'https://app.yingbeijf.com/server-nn-mobile-gateway/',
        commonParams : {
            source : 'WEB'
        },
        imageServer : 'https://image.yingbeijf.com/',
        templateUrl : '/'
    },
    prohybrid : {
        host : '',
        port : 6005,
        url : 'https://app.yingbeijf.com/',
        commonParams : {
            source : 'WEB'
        },
        imageServer : 'https://image.yingbeijf.com/',
        templateUrl : '/'
    },
    LogConfig : {
        logDir : this.logDir,
        uploadLog : false,
        serverUrl: '127.0.0.1',
        "appenders": [{
            category: "debug",
            type: "file",
            filename: this.logDir + "/debug.log",
            layout: {
                type: 'basic'
            },
            patterm: '.yyyy-MM-dd',
            alwaysIncludePattern: true
        }, {
            category: "info",
            type: "file",
            filename: this.logDir + "/info.log",
            layout: {
                type: 'basic'
            },
            patterm: '.yyyy-MM-dd',
            alwaysIncludePattern: true
        }, {
            category: "error",
            type: "file",
            filename: this.logDir + "/error.log",
            layout: {
                type: 'basic'
            },
            patterm: '.yyyy-MM-dd',
            alwaysIncludePattern: true
        }]
    }
};