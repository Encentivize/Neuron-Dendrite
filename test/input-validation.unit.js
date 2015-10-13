var getToken = require('../src/get-token');
var chai = require('chai');
var expect = chai.expect;
var _ = require('lodash');

var defaultOptions = {
    programName: "",
    clientId: "",
    username: "",
    password: "",
    redirectUri: ""
};

describe('The get token method should validate the inputs that it is passed', function () {
    "use strict";
    it('# Program is required', function () {
        var options = _.clone(defaultOptions);
        delete options.programName;
        getToken(options, getTokenComplete);
        function getTokenComplete(err, token) {
            expect(err.message).to.equal(getToken.messages.programNotFound);
        }
    });
});