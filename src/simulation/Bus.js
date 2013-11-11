"use strict";

var EventEmitter = require("events").EventEmitter;
var util = require("util");
var commons = require("../utils/commons");

/**
 * Creates new instance of Bus.
 *
 * @param {Number} id identifier of the bus
 * @param {{capacity: Number,
 *          travellingTime: Number,
 *          timePerPerson: Number}} configuration object containing configuration of the bus
 * @param {Object} townProvider an instance of TownProvider
 * @constructor
 */
function Bus (id, configuration, townProvider) {
    this.id = id;
    this.configuration = configuration;
    this.townProvider = townProvider;
    this.onBoard = 0;
}

util.inherits(Bus, EventEmitter);

/**
 * Schedules the initial event for the bus.
 *
 * @param {Object} town starting town for the bus
 * @param {Object} direction starting direction for the bus
 */
Bus.prototype.start = function (town, direction) {
    this.emit("event", {
        time: 0,
        run: commons.curry(this.run, this, 0, town, direction)
    });
};

/**
 * Executes one step of the simulation.
 *
 * @param {Number} time time at which the event happens
 * @param {Object} town town the bus stops in in this event
 * @param {Object} direction direction the bus will be headi
 */
Bus.prototype.run = function (time, town, direction) {
    var leavingPeople = Math.floor(Math.random() * this.onBoard);
    this.onBoard -= leavingPeople;

    var enteringPeople = town.getPeople(this.configuration.capacity - this.onBoard);
    this.onBoard += enteringPeople;

    var travelTime = this.configuration.travellingTime + this.configuration.timePerPerson * this.onBoard;

    var nextStopTime = travelTime + time;

    var nextStop = this.townProvider.getNextTown(town, direction);

    this.emit("event", {
        time: nextStopTime,
        run: commons.curry(this.run, this, nextStopTime, nextStop.town, nextStop.direction)
    });

    console.log(util.format("Bus %d - Stop: %s, Arrived: %d, Left: %d, Entered: %d, On board: %d",
        this.id, town.name, time, leavingPeople, enteringPeople, this.onBoard));
};

module.exports = Bus;