"use strict";

var EventEmitter = require("events").EventEmitter;
var util = require("util");
var commons = require("../utils/commons");

function Bus (configuration, townProvider) {
    this.configuration = configuration;
    this.townProvider = townProvider;
    this.onBoard = 0;
}

util.inherits(Bus, EventEmitter);

Bus.prototype.start = function (town, direction) {
    this.emit("event", {
        time: 0,
        run: commons.curry(this.run, this, 0, town, direction)
    });
};

Bus.prototype.run = function (time, town, direction) {
    var leavingPeople = Math.floor(Math.random() * this.onBoard);
    this.onBoard -= leavingPeople;

    var enteringPeople = Math.min(this.configuration.capacity - this.onBoard, Math.floor(Math.random() * (town.population * 0.1)));
    this.onBoard += enteringPeople;

    var travelTime = this.configuration.travellingTime + this.configuration.timePerPerson * this.onBoard;

    var nextStopTime = travelTime + time;

    var nextStop = this.townProvider.getNextTown(town, direction);

    this.emit("event", {
        time: nextStopTime,
        run: commons.curry(this.run, this, nextStopTime, nextStop.town, nextStop.direction)
    });

    console.log(util.format("Stop: %s, Arrived: %d, Left: %d, Entered: %d, On board: %d",
        town.name, time, leavingPeople, enteringPeople, this.onBoard));
};

module.exports = Bus;