'use strict';
var request = require('request');
var _ = require('lodash');

var messages = {
    programNameRequired: 'Program name cannot be blank',
    programNameMustBeAString : 'Program name must be a string',
    programNameIsInTheWrongFormat : 'Program name can only contain numbers, letters and dashes',
    clientIdRequired: 'Client id cannot be blank',
    clientIdMustBeAString : 'Client id must be a string',
    usernameRequired: 'Username cannot be blank',
    usernameMustBeAString : 'Username must be a string',
    passwordRequired: 'Password cannot be blank',
    passwordMustBeAString : 'Password must be a string',
    redirectUriRequired: 'Redirect uri cannot be blank',
    redirectUriMustBeAString : 'Redirect uri must be a string',
    neuronBaseUrlRequired: 'Neuron base url cannot be blank',
    neuronBaseUrlMustBeAString : 'Neuron base url must be a string',
    responseTypeRequired: 'Response type cannot be blank',
    responseTypeMustBeAString : 'Response type must be a string'
};

module.exports = function getToken(inputOptions, callback) {
    var defaultOptions = {
        neuronBaseUrl: 'https://login.encentivize.co.za',
        responseType: "token",
        scope: "",
        state: ""
    };
    var options = _.merge({}, defaultOptions, inputOptions);
    if (!isValid(options, callback)) {
        return;
    }
    var fullUrl = options.neuronBaseUrl + '/' + options.programName + '/login';
    return callback();
    //var postOptions = {
    //    url: fullUrl,
    //    form: {
    //        client_id: "cairo-frontend-dev",
    //        password: "123456",
    //        redirect_uri: "http://localhost:6792/#/login",
    //        response_type: "token",
    //        scope: "",
    //        state: "",
    //        username: "vivoenergy@encentivize.co.za"
    //    },
    //    method: "POST",
    //    jar: true
    //};
    //request(postOptions, postToLoginComplete);
    //
    //function postToLoginComplete(error, httpResponse) {
    //    if (error) {
    //        return callback(error);
    //    }
    //    if (httpResponse.statusCode === 302) {
    //        var redirectUrl = neuronBaseUrl + httpResponse.headers.location;
    //
    //        var redirectOptions = {
    //            url: redirectUrl,
    //            method: "GET",
    //            jar: true,
    //            followRedirect: false
    //        };
    //
    //        return request(redirectOptions, redirectToAuthoriseComplete)
    //    }
    //
    //}
    //
    //function redirectToAuthoriseComplete(error, httpResponse, body) {
    //    if (httpResponse.statusCode === 302) {
    //        var searchString = 'access_token=';
    //        var startIndex = httpResponse.headers.location.indexOf(searchString);
    //        var tokenRightPart = httpResponse.headers.location.substr(startIndex);
    //        var endIndex = tokenRightPart.indexOf('&');
    //        var token = tokenRightPart.substring(searchString.length, endIndex);
    //    }
    //}
};

module.exports.messages = messages;

function isValid(options, callback) {
    if (_.isEmpty(options.programName)) {
        callback(new Error(messages.programNameRequired));
        return false;
    }
    if (!isString(options.programName)) {
        callback(new Error(messages.programNameMustBeAString));
        return false;
    }
    var alphaNumericDashRegex = new RegExp('^[a-zA-Z0-9/-]*$');
    if(!alphaNumericDashRegex.test(options.programName)){
        callback(new Error(messages.programNameIsInTheWrongFormat));
        return false;
    }
    if (_.isEmpty(options.clientId)) {
        callback(new Error(messages.clientIdRequired));
        return false;
    }
    if (!isString(options.clientId)) {
        callback(new Error(messages.clientIdMustBeAString));
        return false;
    }
    if (_.isEmpty(options.username)) {
        callback(new Error(messages.usernameRequired));
        return false;
    }
    if (!isString(options.username)) {
        callback(new Error(messages.usernameMustBeAString));
        return false;
    }
    if (_.isEmpty(options.password)) {
        callback(new Error(messages.passwordRequired));
        return false;
    }
    if (!isString(options.password)) {
        callback(new Error(messages.passwordMustBeAString));
        return false;
    }
    if (_.isEmpty(options.redirectUri)) {
        callback(new Error(messages.redirectUriRequired));
        return false;
    }
    if (!isString(options.redirectUri)) {
        callback(new Error(messages.redirectUriMustBeAString));
        return false;
    }
    if (_.isEmpty(options.neuronBaseUrl)) {
        callback(new Error(messages.neuronBaseUrlRequired));
        return false;
    }
    if (!isString(options.neuronBaseUrl)) {
        callback(new Error(messages.neuronBaseUrlMustBeAString));
        return false;
    }
    if (_.isEmpty(options.responseType)) {
        callback(new Error(messages.responseTypeRequired));
        return false;
    }
    if (!isString(options.responseType)) {
        callback(new Error(messages.responseTypeMustBeAString));
        return false;
    }
    return true;
}

function isString(value) {
    return typeof value == 'string' || value instanceof String;
}