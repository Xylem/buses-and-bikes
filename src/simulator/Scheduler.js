"use strict";

var commons = require("../utils/commons");

function Scheduler () {
    this.events = [];
}

Scheduler.prototype.registerEventEmitter = function (eventEmitter) {
    var self = this;

    eventEmitter.on("event", function (eventData) {
        self.events.push(eventData);

        self.events = self.events.sort(function (a, b) {
            return a.time < b.time ? -1 : 1;
        });
    });
};

Scheduler.prototype.runEvent = function () {
    var event = this.events.shift();

    event.run();

    //setImmediate(this.runEvent);

    setTimeout(commons.curry(this.runEvent, this), 1000);
};

module.exports = Scheduler;