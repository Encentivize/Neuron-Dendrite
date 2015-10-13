'use strict';
var request = require('request');
var _ = require('lodash');

var messages = {
    programNameRequired: 'Program name cannot be blank',
    clientIdRequired: 'Client id cannot be blank',
    usernameRequired: 'Username cannot be blank',
    passwordRequired: 'Password cannot be blank',
    redirectUriRequired: 'Redirect uri cannot be blank',
    neuronBaseUrlRequired: 'Neuron base url cannot be blank',
    responseTypeRequired: 'Response type cannot be blank'
};

module.exports = function getToken(inputOptions, callback) {
    var defaultOptions = {
        neuronBaseUrl: 'https://login.encentivize.co.za',
        responseType: "token",
        scope: "",
        state: ""
    };
    var options = _.merge({}, defaultOptions, inputOptions);
    if (_.isEmpty(options.programName)) {
        return callback(new Error(messages.programNameRequired));
    }
    if (_.isEmpty(options.clientId)) {
        return callback(new Error(messages.clientIdRequired));
    }
    if (_.isEmpty(options.username)) {
        return callback(new Error(messages.usernameRequired));
    }
    if (_.isEmpty(options.password)) {
        return callback(new Error(messages.passwordRequired));
    }
    if (_.isEmpty(options.redirectUri)) {
        return callback(new Error(messages.redirectUriRequired));
    }
    if (_.isEmpty(options.neuronBaseUrl)) {
        return callback(new Error(messages.neuronBaseUrlRequired));
    }
    if (_.isEmpty(options.responseType)) {
        return callback(new Error(messages.responseTypeRequired));
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


