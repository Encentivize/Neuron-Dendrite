"use strict";
/*jshint expr: true*/ // needed so that the .ok passes linting
var chai = require('chai');
var expect = chai.expect;
var _ = require('lodash');
var rewire = require('rewire');
var getToken = rewire('../src/get-token');
var defaultOptions = {
    programName: "test-program",
    clientId: "mySuper-awesomeClient1",
    username: "test-user@encentivize.co.za",
    password: "123456",
    redirectUri: "http://localhost:6792/#/login"
};

var successResponse = {
    statusCode: 302,
    headers: {
        location: "fake&access_token=bob&code=hi"
    }
};
var serverErrorResponse = {
    statusCode: 500
};
var invalidResponseNoHeaders = {
    statusCode: 302
};
var invalidResponseNoLocationInHeaders = {
    statusCode: 302,
    headers:{}
};
var testError = new Error('Test Error');
var counter = 0;
describe('The get token method should return the token', function () {
    it('#01 - if the initial request results in an error this should be passed to the callback', function (callback) {
        getToken.__set__("request", function (options, callback) {
            var fakeHttpResponse = {
                statusCode: 500
            };
            return callback(testError, fakeHttpResponse);
        });
        var options = _.clone(defaultOptions);
        getToken(options, getTokenComplete);
        function getTokenComplete(err) {
            expect(err).to.be.ok;
            expect(err).to.deep.equal(testError);
            callback();
        }
    });
    it('#02 - if the initial request is successful but the second results in an error this should be passed to the callback', function (callback) {
        counter = 0;
        getToken.__set__("request", function (options, callback) {
            if (counter == 0) {
                counter++;
                return callback(null, successResponse);
            }
            return callback(testError, serverErrorResponse);
        });
        var options = _.clone(defaultOptions);
        getToken(options, getTokenComplete);
        function getTokenComplete(err) {
            expect(err).to.be.ok;
            expect(err).to.deep.equal(testError);
            callback();
        }
    });
    it('#03 - if the initial request results in a 302 without a header this should return the correct error to the callback', function (callback) {
        getToken.__set__("request", function (options, callback) {
            return callback(null, invalidResponseNoHeaders);
        });
        var options = _.clone(defaultOptions);
        getToken(options, getTokenComplete);
        function getTokenComplete(err) {
            expect(err).to.be.ok;
            expect(err.message).to.equal(getToken.messages.postToLoginHadNoLocationHeader);
            callback();
        }
    });
    it('#04 - if the initial request results in a 302 with headers but no location header this should return the correct error to the callback', function (callback) {
        getToken.__set__("request", function (options, callback) {
            return callback(null, invalidResponseNoLocationInHeaders);
        });
        var options = _.clone(defaultOptions);
        getToken(options, getTokenComplete);
        function getTokenComplete(err) {
            expect(err).to.be.ok;
            expect(err.message).to.equal(getToken.messages.postToLoginHadNoLocationHeader);
            callback();
        }
    });
    it('#05 - if the initial request succeeds but the second results in a 302 without a header this should return the correct error to the callback', function (callback) {
        counter = 0;
        getToken.__set__("request", function (options, callback) {
            if (counter == 0) {
                counter++;
                return callback(null, successResponse);
            }
            return callback(null, invalidResponseNoHeaders);
        });
        var options = _.clone(defaultOptions);
        getToken(options, getTokenComplete);
        function getTokenComplete(err) {
            expect(err).to.be.ok;
            expect(err.message).to.equal(getToken.messages.postToLoginHadNoLocationHeader);
            callback();
        }
    });
    it('#06 - if the initial request succeeds but the second results in a 302 with headers but no location header this should return the correct error to the callback', function (callback) {
        counter = 0;
        getToken.__set__("request", function (options, callback) {
            if (counter == 0) {
                counter++;
                return callback(null, successResponse);
            }
            return callback(null, invalidResponseNoHeaders);
        });
        var options = _.clone(defaultOptions);
        getToken(options, getTokenComplete);
        function getTokenComplete(err) {
            expect(err).to.be.ok;
            expect(err.message).to.equal(getToken.messages.postToLoginHadNoLocationHeader);
            callback();
        }
    });
});
