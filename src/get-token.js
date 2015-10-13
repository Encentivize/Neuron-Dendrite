'use strict';
//var request = require('request');
var _ = require('lodash');
//
//var neuronBaseUrl = 'http://localhost:3666';
//var program = 'vivo-admin';
//var fullUrl = neuronBaseUrl + '/' + program + '/login';
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
//function postToLoginComplete(error, httpResponse, body) {
//    if (error) {
//        console.error(error);
//        return;
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
//
//    }
//}
var messages = {
    programNameRequired: 'Program name cannot be blank',
    clientIdRequired: 'Client id cannot be blank',
    usernameRequired: 'Username cannot be blank',
    passwordRequired: 'Password cannot be blank',
    redirectUriRequired: 'Redirect uri cannot be blank',
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
};
module.exports.messages = messages;

