'use strict';
let chai = require('chai');
let expect = chai.expect;
let assert = chai.assert;
let UserProxy = require('../../proxy').UserProxy;

describe('UserProxy', () => {
    it('should exist', () => {
       expect(UserProxy).to.not.be.undefined;
    });
});

describe('UserProxy.userLogin', () => {
    it('should exist', () => {
       expect(UserProxy.userLogin).to.not.be.undefined;
    });
});
describe('UserProxy.userLogin', () => {
    it('should load data from server from  /proxy/lib/UserProxy.js', (done) => {
        let req  = {
            body : {
                phoneNo : '13611111111',
                userPwd : '1234567a',
                source : 'WEB'
            }
        }
        UserProxy.userLogin(req, function(result){
            expect(result.data.status).to.equal('SUCCESS');
            done();
        });
    });
});

describe('UserProxy.userReg', () => {
    it('should exist', () => {
       expect(UserProxy.userReg).to.not.be.undefined;
    });
});

describe('UserProxy.sendVerCode', () => {
    it('should exist', () => {
       expect(UserProxy.sendVerCode).to.not.be.undefined;
    });
});

describe('UserProxy.sendVerCode', () => {
    it('should exist', () => {
       expect(UserProxy.sendVerCode).to.not.be.undefined;
    });
});

describe('UserProxy.sendVerCode', () => {
    it('should exist', () => {
       expect(UserProxy.sendVerCode).to.not.be.undefined;
    });
});