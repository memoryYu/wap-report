'use strict';
let chai = require('chai');
let expect = chai.expect;
let assert = chai.assert;
let TreasureProxy = require('../../proxy').TreasureProxy;

describe('TreasureProxy', () => {
    it('should exist', () => {
       expect(TreasureProxy).to.not.be.undefined;
    });
});

describe('TreasureProxy.addAutoInfo', () => {
    it('should exist', () => {
       expect(TreasureProxy.addAutoInfo).to.not.be.undefined;
    });
});

describe('TreasureProxy.addAutoInfo', () => {
    it('should load data from server from /proxy/lib/TreasureProxy.js', (done) => {
        let req  = {
            body : {

            }
        };
        TreasureProxy.addAutoInfo(req, function(result){
            expect(result).to.not.be.undefined;
            done();
        });
    });
});