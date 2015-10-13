var getToken = require('../src/get-token');
var chai = require('chai');
var expect = chai.expect;
var _ = require('lodash');

var defaultOptions = {
    programName: "vivo-admin",
    clientId: "cairo-frontend-dev",
    username: "vivoenergy@encentivize.co.za",
    password: "123456",
    redirectUri: "http://localhost:6792/#/login"
};

describe('The get token method should validate the inputs that it is passed', function () {
    "use strict";
    it('#01 - programName is required', function (callback) {
        var options = _.clone(defaultOptions);
        delete options.programName;
        getToken(options, getTokenComplete);
        function getTokenComplete(err) {
            expect(err).to.be.ok;
            expect(err.message).to.equal(getToken.messages.programNameRequired);
            callback();
        }
    });
    it('#02 - clientId is required', function (callback) {
        var options = _.clone(defaultOptions);
        delete options.clientId;
        getToken(options, getTokenComplete);
        function getTokenComplete(err) {
            expect(err).to.be.ok;
            expect(err.message).to.equal(getToken.messages.clientIdRequired);
            callback();
        }
    });
    it('#03 - username is required', function (callback) {
        var options = _.clone(defaultOptions);
        delete options.username;
        getToken(options, getTokenComplete);
        function getTokenComplete(err) {
            expect(err).to.be.ok;
            expect(err.message).to.equal(getToken.messages.usernameRequired);
            callback();
        }
    });
    it('#04 - password is required', function (callback) {
        var options = _.clone(defaultOptions);
        delete options.password;
        getToken(options, getTokenComplete);
        function getTokenComplete(err) {
            expect(err).to.be.ok;
            expect(err.message).to.equal(getToken.messages.passwordRequired);
            callback();
        }
    });
    it('#05 - redirectUri is required', function (callback) {
        var options = _.clone(defaultOptions);
        delete options.redirectUri;
        getToken(options, getTokenComplete);
        function getTokenComplete(err) {
            expect(err).to.be.ok;
            expect(err.message).to.equal(getToken.messages.redirectUriRequired);
            callback();
        }
    });
    it('#06 - If no neuronBaseUrl is provided it should use a default and not contain an error', function (callback) {
        var options = _.clone(defaultOptions);
        getToken(options, getTokenComplete);
        function getTokenComplete(err) {
            expect(err).to.not.be.ok;
            callback();
        }
    });
    it('#07 - If the neuronBaseUrl is provided it cannot be blank', function (callback) {
        var options = _.clone(defaultOptions);
        options.neuronBaseUrl = "";
        getToken(options, getTokenComplete);
        function getTokenComplete(err) {
            expect(err).to.be.ok;
            expect(err.message).to.equal(getToken.messages.neuronBaseUrlRequired);
            callback();
        }
    });
    it('#08 - If no responseType is provided it should use a default and not contain an error', function (callback) {
        var options = _.clone(defaultOptions);
        getToken(options, getTokenComplete);
        function getTokenComplete(err) {
            expect(err).to.not.be.ok;
            callback();
        }
    });
    it('#09 - If the responseType is provided it cannot be blank', function (callback) {
        var options = _.clone(defaultOptions);
        options.responseType = "";
        getToken(options, getTokenComplete);
        function getTokenComplete(err) {
            expect(err).to.be.ok;
            expect(err.message).to.equal(getToken.messages.responseTypeRequired);
            callback();
        }
    });
    it('#10 - programName must be a string', function (callback) {
        var options = _.clone(defaultOptions);
        options.programName = [1,2];
        getToken(options, getTokenComplete);
        function getTokenComplete(err) {
            expect(err).to.be.ok;
            expect(err.message).to.equal(getToken.messages.programNameMustBeAString);
            callback();
        }
    });
    it('#11 - clientId must be a string', function (callback) {
        var options = _.clone(defaultOptions);
        options.clientId = [1,2];
        getToken(options, getTokenComplete);
        function getTokenComplete(err) {
            expect(err).to.be.ok;
            expect(err.message).to.equal(getToken.messages.clientIdMustBeAString);
            callback();
        }
    });
    it('#12 - username must be a string', function (callback) {
        var options = _.clone(defaultOptions);
        options.username = [1,2];
        getToken(options, getTokenComplete);
        function getTokenComplete(err) {
            expect(err).to.be.ok;
            expect(err.message).to.equal(getToken.messages.usernameMustBeAString);
            callback();
        }
    });
    it('#13 - password must be a string', function (callback) {
        var options = _.clone(defaultOptions);
        options.password = [1,2];
        getToken(options, getTokenComplete);
        function getTokenComplete(err) {
            expect(err).to.be.ok;
            expect(err.message).to.equal(getToken.messages.passwordMustBeAString);
            callback();
        }
    });
    it('#14 - redirectUri must be a string', function (callback) {
        var options = _.clone(defaultOptions);
        options.redirectUri = [1,2];
        getToken(options, getTokenComplete);
        function getTokenComplete(err) {
            expect(err).to.be.ok;
            expect(err.message).to.equal(getToken.messages.redirectUriMustBeAString);
            callback();
        }
    });
    it('#15 - neuronBaseUrl must be a string', function (callback) {
        var options = _.clone(defaultOptions);
        options.neuronBaseUrl = [1,2];
        getToken(options, getTokenComplete);
        function getTokenComplete(err) {
            expect(err).to.be.ok;
            expect(err.message).to.equal(getToken.messages.neuronBaseUrlMustBeAString);
            callback();
        }
    });
    it('#16 - responseType must be a string', function (callback) {
        var options = _.clone(defaultOptions);
        options.responseType = [1,2];
        getToken(options, getTokenComplete);
        function getTokenComplete(err) {
            expect(err).to.be.ok;
            expect(err.message).to.equal(getToken.messages.responseTypeMustBeAString);
            callback();
        }
    });
    it('#17 - programName must only contain letters, numbers and dashes', function (callback) {
        var options = _.clone(defaultOptions);
        options.programName = "asd/qqqu'#@!.";
        getToken(options, getTokenComplete);
        function getTokenComplete(err) {
            expect(err).to.be.ok;
            expect(err.message).to.equal(getToken.messages.programNameIsInTheWrongFormat);
            callback();
        }
    });
    it('#18 - clientId must only contain letters, numbers and dashes', function (callback) {
        var options = _.clone(defaultOptions);
        options.clientId = "asd/qqqu'#@!.";
        getToken(options, getTokenComplete);
        function getTokenComplete(err) {
            expect(err).to.be.ok;
            expect(err.message).to.equal(getToken.messages.clientIdIsInTheWrongFormat);
            callback();
        }
    });
});