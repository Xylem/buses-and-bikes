"use strict";

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

function curry (fn, scope) {
    var args = [];

    for (var i=2, len = arguments.length; i < len; ++i) {
        args.push(arguments[i]);
    }

    return function() {
        fn.apply(scope, args);
    };
}

Scheduler.prototype.runEvent = function () {
    var event = this.events.shift();

    event.run();

    //setImmediate(this.runEvent);

    setTimeout(curry(this.runEvent, this), 1000);
};

module.exports = Scheduler;