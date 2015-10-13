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
    it('#01 - Program name is required', function (callback) {
        var options = _.clone(defaultOptions);
        delete options.programName;
        getToken(options, getTokenComplete);
        function getTokenComplete(err) {
            expect(err).to.be.ok;
            expect(err.message).to.equal(getToken.messages.programNotFound);
            callback();
        }
    });
    it('#02 - Client Id is required', function (callback) {
        var options = _.clone(defaultOptions);
        delete options.clientId;
        getToken(options, getTokenComplete);
        function getTokenComplete(err) {
            expect(err).to.be.ok;
            expect(err.message).to.equal(getToken.messages.programNotFound);
            callback();
        }
    });
});