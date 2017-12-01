'use strict';
let chai = require('chai');
let expect = chai.expect;
let assert = chai.assert;
let AccountProxy = require('../../proxy').AccountProxy;

describe('AccountProxy', () => {
    it('should exist', () => {
       expect(AccountProxy).to.not.be.undefined;
    });
});

describe('AccountProxy.accountInfo', () => {
    it('should exist', () => {
       expect(AccountProxy.accountInfo).to.not.be.undefined;
    });
});

describe('AccountProxy.accountInfo', () => {
    it('should load data from server from /proxy/lib/AccountProxy.js', (done) => {
        let req  = {
            query : {
                token : '12323'
            }
        };
        AccountProxy.accountInfo(req, function(result){
            expect(result).to.not.be.undefined;
            done();
        });
    });
});

describe('AccountProxy.addUserRiskInfo', () => {
    it('should exist', () => {
       expect(AccountProxy.addUserRiskInfo).to.not.be.undefined;
    });
});

describe('AccountProxy.addUserRiskInfo', () => {
    it('should load data from server from /proxy/lib/AccountProxy.js', (done) => {
        let req  = {
            body : {
                type : '12323'
            }
        };
        AccountProxy.addUserRiskInfo(req, function(result){
            expect(result).to.not.be.undefined;
            done();
        });
    });
});

describe('AccountProxy.bindBank', () => {
    it('should exist', () => {
       expect(AccountProxy.bindBank).to.not.be.undefined;
    });
});

describe('AccountProxy.bindBank', () => {
    it('should load data from server from /proxy/lib/AccountProxy.js', (done) => {
        let req  = {
            body : {
                type : '12323'
            }
        };
        AccountProxy.bindBank(req, function(result){
            expect(result).to.not.be.undefined;
            done();
        });
    });
});


describe('AccountProxy.getNoticeMessage', () => {
    it('should exist', () => {
       expect(AccountProxy.getNoticeMessage).to.not.be.undefined;
    });
});

describe('AccountProxy.getNoticeMessage', () => {
    it('should load data from server from /proxy/lib/AccountProxy.js', (done) => {
        let req  = {
            query : {
                type : '12323'
            }
        };
        AccountProxy.getNoticeMessage(req, function(result){
            expect(result).to.not.be.undefined;
            done();
        });
    });
});

describe('AccountProxy.getRiskList', () => {
    it('should exist', () => {
       expect(AccountProxy.getRiskList).to.not.be.undefined;
    });
});

describe('AccountProxy.getRiskList', () => {
    it('should load data from server from /proxy/lib/AccountProxy.js', (done) => {
        let req  = {
            query : {
                type : '12323'
            }
        };
        AccountProxy.getRiskList(req, function(result){
            expect(result).to.not.be.undefined;
            done();
        });
    });
});

describe('AccountProxy.getUserBankList', () => {
    it('should exist', () => {
       expect(AccountProxy.getUserBankList).to.not.be.undefined;
    });
});

describe('AccountProxy.getUserBankList', () => {
    it('should load data from server from /proxy/lib/AccountProxy.js', (done) => {
        let req  = {
            query : {
                type : '12323'
            }
        };
        AccountProxy.getUserBankList(req, function(result){
            expect(result).to.not.be.undefined;
            done();
        });
    });
});

describe('AccountProxy.preBindBank', () => {
    it('should exist', () => {
       expect(AccountProxy.preBindBank).to.not.be.undefined;
    });
});

describe('AccountProxy.preBindBank', () => {
    it('should load data from server from /proxy/lib/AccountProxy.js', (done) => {
        let req  = {
            body : {
                type : '12323'
            }
        };
        AccountProxy.preBindBank(req, function(result){
            expect(result).to.not.be.undefined;
            done();
        });
    });
});

describe('AccountProxy.setDealPwd', () => {
    it('should exist', () => {
       expect(AccountProxy.setDealPwd).to.not.be.undefined;
    });
});

describe('AccountProxy.setDealPwd', () => {
    it('should load data from server from /proxy/lib/AccountProxy.js', (done) => {
        let req  = {
            body : {
                type : '12323'
            }
        };
        AccountProxy.setDealPwd(req, function(result){
            expect(result).to.not.be.undefined;
            done();
        });
    });
});

describe('AccountProxy.setPwd', () => {
    it('should exist', () => {
       expect(AccountProxy.setPwd).to.not.be.undefined;
    });
});

describe('AccountProxy.setPwd', () => {
    it('should load data from server from /proxy/lib/AccountProxy.js', (done) => {
        let req  = {
            body : {
                type : '12323'
            }
        };
        AccountProxy.setPwd(req, function(result){
            expect(result).to.not.be.undefined;
            done();
        });
    });
});

describe('AccountProxy.setSignatureTypeFdd', () => {
    it('should exist', () => {
       expect(AccountProxy.setSignatureTypeFdd).to.not.be.undefined;
    });
});

describe('AccountProxy.setSignatureTypeFdd', () => {
    it('should load data from server from /proxy/lib/AccountProxy.js', (done) => {
        let req  = {
            body : {
                type : '12323'
            }
        };
        AccountProxy.setSignatureTypeFdd(req, function(result){
            expect(result).to.not.be.undefined;
            done();
        });
    });
});