'use strict';
let chai = require('chai');
let expect = chai.expect;
let assert = chai.assert;
let IndexProxy = require('../../proxy').IndexProxy;

describe('IndexProxy', () => {
    it('should exist', () => {
       expect(IndexProxy).to.not.be.undefined;
    });
});

describe('IndexProxy.indexInfo', () => {
    it('should exist', () => {
       expect(IndexProxy.indexInfo).to.not.be.undefined;
    });
});

describe('IndexProxy.indexInfo', () => {
    it('should load data from server from /proxy/lib/IndexProxy.js', (done) => {
        let req  = {};
        IndexProxy.indexInfo(req, function(result){
            expect(result.data.status).to.equal('SUCCESS');
            done();
        });
    });
});

describe('IndexProxy.articleList', () => {
    it('should exist', () => {
       expect(IndexProxy.articleList).to.not.be.undefined;
    });
});

describe('IndexProxy.articleList', () => {
    it('should load data from server from /proxy/lib/IndexProxy.js', (done) => {
        let req  = {
            query : {
                page : 1,
                pageSize : 10
            }
        };
        IndexProxy.articleList(req, function(result){
            expect(result.data.status).to.equal('SUCCESS');
            done();
        });
    });
});

describe('IndexProxy.activityList', () => {
    it('should load data from server from /proxy/lib/IndexProxy.js', (done) => {
        let req  = {
            query : {
                page : 1,
                pageSize : 10
            }
        };
        IndexProxy.activityList(req, function(result){
            expect(result.data.status).to.equal('SUCCESS');
            done();
        });
    });
});

describe('IndexProxy.activityList', () => {
    it('should load data from server from /proxy/lib/IndexProxy.js', (done) => {
        let req  = {
            query : {
                id : '186'
            }
        };
        IndexProxy.articleDetail(req, function(result){
            expect(result.data.status).to.equal('SUCCESS');
            done();
        });
    });
});