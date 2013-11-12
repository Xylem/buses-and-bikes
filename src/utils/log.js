"use strict";

var log4js = require("log4js");

exports.configure = function (configurationPath) {
    log4js.configure(configurationPath, {});
};

exports.getLogger = log4js.getLogger;