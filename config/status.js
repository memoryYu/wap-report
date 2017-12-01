/**
 * 状态码
 * @type {{SUCCESS: {code: string, msg: string}}}
 */
exports = module.exports = {
    SUCCESS : {
        CODE : 'S0000001',
        MSG : '操作成功',
        STATUS : 'SUCCESS'
    },
    FAIL : {
        CODE : 'S0000002',
        MSG : '操作失败',
        STATUS : 'FAIL'
    },
    ERROR : {
        CODE : 'S0000003',
        MSG : '操作错误',
        STATUS : 'ERROR'
    },
    OVERTIME : {
        CODE : 'S0000004',
        MSG : '操作超时',
        STATUS : 'OVERTIME'
    },
    LOGOUT : {
        CODE : 'S0000005',
        MSG : '该用户已用其他手机登录',
        STATUS : 'LOGOUT'
    },
    BADGETWAY : {
        CODE : 'S0000502',
        MSG : '502 Bad Gateway',
        STATUS : 'BADGETWAY'
    }
};