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
    headers: {}
};
var unexpectedResponse = {
    statusCode: 200
};
var redirectToErrorPageResponse = {
    statusCode: 302,
    headers: {
        location: "/test-program/error"
    }
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
            if (counter === 0) {
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
            if (counter === 0) {
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
            if (counter === 0) {
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
    it('#07 - if the initial request results in an unexpected status code the correct error should be passed to the callback', function (callback) {
        getToken.__set__("request", function (options, callback) {
            return callback(null, unexpectedResponse);
        });
        var options = _.clone(defaultOptions);
        getToken(options, getTokenComplete);
        function getTokenComplete(err) {
            expect(err).to.be.ok;
            expect(err.message.indexOf(getToken.messages.postToLoginWasNot302)).to.equal(0);
            callback();
        }
    });
    it('#08 - if the initial request succeeds but the second results in an unexpected status code this should return the correct error to the callback', function (callback) {
        counter = 0;
        getToken.__set__("request", function (options, callback) {
            if (counter === 0) {
                counter++;
                return callback(null, successResponse);
            }
            return callback(null, unexpectedResponse);
        });
        var options = _.clone(defaultOptions);
        getToken(options, getTokenComplete);
        function getTokenComplete(err) {
            expect(err).to.be.ok;
            expect(err.message.indexOf(getToken.messages.redirectFromLoginWasNot302)).to.equal(0);
            callback();
        }
    });
    it('#09 token should be retrievable if there is an ampersand after it', function (callback) {
        getToken.__set__("request", function (options, callback) {
            var token = 'bob#123%3==';
            var response = {
                statusCode: 302,
                headers: {
                    location: "fake&access_token="+token+"&code=hi"
                }
            };
            return callback(null, response);
        });
        var options = _.clone(defaultOptions);
        getToken(options, getTokenComplete);
        function getTokenComplete(err, token) {
            expect(err).to.be.not.ok;
            expect(token).to.equal(token);
            callback();
        }
    });
    it('#09 token should be retrievable if there is nothing after it', function (callback) {
        getToken.__set__("request", function (options, callback) {
            var token = 'bob#123%3==';
            var response = {
                statusCode: 302,
                headers: {
                    location: "fake&access_token="+token
                }
            };
            return callback(null, response);
        });
        var options = _.clone(defaultOptions);
        getToken(options, getTokenComplete);
        function getTokenComplete(err, token) {
            expect(err).to.be.not.ok;
            expect(token).to.equal(token);
            callback();
        }
    });
    it('#10 - if the initial request results in a 302 but the location is :programName/error then return an appropriate error', function (callback) {
        getToken.__set__("request", function (options, callback) {
            return callback(null, redirectToErrorPageResponse);
        });
        var options = _.clone(defaultOptions);
        getToken(options, getTokenComplete);
        function getTokenComplete(err) {
            expect(err).to.be.ok;
            expect(err.message.indexOf(getToken.messages.postResultedInARedirectToErrorPage)).to.equal(0);
            callback();
        }
    });
    it('#11 - if the initial request was successful but the second results in a 302 but the location is :programName/error then return an appropriate error', function (callback) {
        counter = 0;
        getToken.__set__("request", function (options, callback) {
            if (counter === 0) {
                counter++;
                return callback(null, successResponse);
            }
            return callback(null, redirectToErrorPageResponse);
        });
        var options = _.clone(defaultOptions);
        getToken(options, getTokenComplete);
        function getTokenComplete(err) {
            expect(err).to.be.ok;
            expect(err.message.indexOf(getToken.messages.postResultedInARedirectToErrorPage)).to.equal(0);
            callback();
        }
    });
});
