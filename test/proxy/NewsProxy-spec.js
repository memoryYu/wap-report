'use strict';
let chai = require('chai');
let expect = chai.expect;
let assert = chai.assert;
let NewsProxy = require('../../proxy').NewsProxy;

describe('NewsProxy', () => {
    it('should exist', () => {
       expect(NewsProxy).to.not.be.undefined;
    });
});

describe('IndexProxy.getNewsByColumn', () => {
    it('should exist', () => {
       expect(NewsProxy.getNewsByColumn).to.not.be.undefined;
    });
});

describe('ProductProxy.getNewsByColumn', () => {
    it('should load data from server from /proxy/lib/ProductProxy.js', (done) => {
        let req  = {
            query : {

            }
        };
        NewsProxy.getNewsByColumn(req, function(result){
            expect(result).to.not.be.undefined;
            done();
        });
    });
});

describe('IndexProxy.getNewsDetail', () => {
    it('should exist', () => {
       expect(NewsProxy.getNewsDetail).to.not.be.undefined;
    });
});

describe('ProductProxy.getNewsDetail', () => {
    it('should load data from server from /proxy/lib/ProductProxy.js', (done) => {
        let req  = {
            query : {
                
            }
        };
        NewsProxy.getNewsDetail(req, function(result){
            expect(result).to.not.be.undefined;
            done();
        });
    });
});

describe('IndexProxy.getRandomNews', () => {
    it('should exist', () => {
       expect(NewsProxy.getRandomNews).to.not.be.undefined;
    });
});

describe('ProductProxy.getRandomNews', () => {
    it('should load data from server from /proxy/lib/ProductProxy.js', (done) => {
        let req  = {
            query : {
                
            }
        };
        NewsProxy.getRandomNews(req, function(result){
            expect(result).to.not.be.undefined;
            done();
        });
    });
});

describe('IndexProxy.index', () => {
    it('should exist', () => {
       expect(NewsProxy.index).to.not.be.undefined;
    });
});

describe('ProductProxy.index', () => {
    it('should load data from server from /proxy/lib/ProductProxy.js', (done) => {
        let req  = {
            query : {
                
            }
        };
        NewsProxy.index(req, function(result){
            expect(result).to.not.be.undefined;
            done();
        });
    });
});