"use strict";
module.exports = function (options, callback) {
    var fakeHttpResponse = {
        statusCode: 302,
        headers: {
            location: "fake&access_token=bob&code=hi"
        }
    };
    return callback(null, fakeHttpResponse);
};