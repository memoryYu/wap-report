'use strict';
let chai = require('chai');
let expect = chai.expect;
let assert = chai.assert;
let H5Proxy = require('../../proxy').H5Proxy;

describe('H5Proxy', () => {
    it('should exist', () => {
       expect(H5Proxy).to.not.be.undefined;
    });
});

describe('H5Proxy.projectDetail', () => {
    it('should exist', () => {
       expect(H5Proxy.projectDetail).to.not.be.undefined;
    });
});

describe('H5Proxy.projectDetail', () => {
    it('should load data from server from /proxy/lib/H5Proxy.js', (done) => {
        let req  = {
            query : {}
        };
        H5Proxy.projectDetail(req, function(result){
            expect(result).to.not.be.undefined;
            done();
        });
    });
});

describe('H5Proxy.tenderList', () => {
    it('should exist', () => {
       expect(H5Proxy.tenderList).to.not.be.undefined;
    });
});

describe('H5Proxy.tenderList', () => {
    it('should load data from server from /proxy/lib/H5Proxy.js', (done) => {
        let req  = {
            query : {
                page : 1,
                pageSize : 10
            }
        };
        H5Proxy.tenderList(req, function(result){
            expect(result).to.not.be.undefined;
            done();
        });
    });
});