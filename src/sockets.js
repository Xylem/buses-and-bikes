"use strict";

var socketio = require("socket.io");
var io;

exports.registerExpress = function registerExpress (expressServer) {
    io = socketio.listen(expressServer, {
        "log level": 0
    });
};

exports.sendCurrentStatusOnConnection = function sendCurrentStatusOnConnection (dataFunction) {
    io.sockets.on("connection", function (socket) {
        socket.emit("status", dataFunction());
    });
};

exports.registerEventEmitter = function registerEventEmitter (eventName, eventEmitter) {
    io.sockets.on("connection", function (socket) {
        eventEmitter.on(eventName, function (data) {
            socket.emit(eventName, data);
        });
    });
};

exports.onFirstUserConnected = function onFirstUserConnected (firstUserConnectedFunction) {
    io.sockets.on("connection", function () {
        if (io.sockets.clients().length === 1) {
            firstUserConnectedFunction();
        }
    });
};

exports.onEveryoneDisconnected = function onEveryoneDisconnected (everyoneDisconnectedFunction) {
    io.sockets.on("connection", function (socket) {
        socket.on("disconnect", function () {
            if (io.sockets.clients().length === 1) {
                everyoneDisconnectedFunction();
            }
        });
    });
};