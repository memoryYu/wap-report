'use strict';
let chai = require('chai');
let expect = chai.expect;
let assert = chai.assert;
let ProductProxy = require('../../proxy').ProductProxy;

describe('ProductProxy', () => {
    it('should exist', () => {
       expect(ProductProxy).to.not.be.undefined;
    });
});

describe('ProductProxy.indexInfo', () => {
    it('should exist', () => {
       expect(ProductProxy.indexInfo).to.not.be.undefined;
    });
});

describe('ProductProxy.indexInfo', () => {
    it('should load data from server from /proxy/lib/ProductProxy.js', (done) => {
        let req  = {};
        ProductProxy.indexInfo(req, function(result){
            expect(result.data.status).to.equal('SUCCESS');
            done();
        });
    });
});

describe('ProductProxy.articleList', () => {
    it('should exist', () => {
       expect(ProductProxy.articleList).to.not.be.undefined;
    });
});

describe('ProductProxy.articleList', () => {
    it('should load data from server from /proxy/lib/ProductProxy.js', (done) => {
        let req  = {
            query : {
                page : 1,
                pageSize : 10
            }
        };
        ProductProxy.articleList(req, function(result){
            expect(result.data.status).to.equal('SUCCESS');
            done();
        });
    });
});

describe('ProductProxy.activityList', () => {
    it('should load data from server from /proxy/lib/ProductProxy.js', (done) => {
        let req  = {
            query : {
                page : 1,
                pageSize : 10
            }
        };
        ProductProxy.activityList(req, function(result){
            expect(result.data.status).to.equal('SUCCESS');
            done();
        });
    });
});

describe('ProductProxy.activityList', () => {
    it('should load data from server from /proxy/lib/ProductProxy.js', (done) => {
        let req  = {
            query : {
                id : '186'
            }
        };
        ProductProxy.articleDetail(req, function(result){
            expect(result.data.status).to.equal('SUCCESS');
            done();
        });
    });
});