"use strict";

var sdkVersion = exports.sdkVersion = require('../../package').version;
var userAgent = exports.userAgent = 'GameballSDK/gameball-node-SDK' + sdkVersion + ' (node ' + process.version + '-' + process.arch + '-' + process.platform  + '; OpenSSL ' + process.versions.openssl + ')';

var default_options = exports.default_options = {
    'schema': 'https',
    'host': 'gb-api.azurewebsites.net',
    'path':"/api/v2.0/Integrations",
    'port': process.env.PORT
};


var error_codes = exports.error_codes = {
    DEFAULT_ERROR_CODE: 0,
    PARSING_ERROR_CODE:3,
    MISSING_REFERRAL_CODE: 152,
    MISSING_TRANSACTION_KEY: 110,
    MISSING_EVENTS_FIELD: 1,
    MISSING_PLAYER_UNIQUE_ID: 2,
    INVALID_HASH: 11,
    HASH_IS_REQUIRED: 4,
    PLACED_TRANSACTION: 305

}

var DEFAULT_TIMEOUT_MS = 5000
