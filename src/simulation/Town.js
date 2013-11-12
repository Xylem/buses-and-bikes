"use strict";

var logger = require("../utils/log").getLogger();

/**
 * Creates new instance of Town.
 *
 * @param {Number} population population of the town
 * @param {String} name name of the town
 * @constructor
 */
function Town (population, name) {
    this.population = population;
    this.availablePopulation = population;
    this.name = name;
}

/**
 * Generates random number of people wanting to enter the vehicle, removes a fraction of people that couldn't enter from
 * the pool of available people and returns the number of people that entered.
 *
 * @param {Number} maxPeople maximum number of people that can enter the vehicle
 * @returns {Number} number of people entering the vehicle
 */
Town.prototype.getPeople = function (maxPeople) {
    var waiting = Math.ceil(Math.random() * this.availablePopulation * 0.1);

    var entering = Math.min(maxPeople, waiting);

    this.availablePopulation -= Math.ceil((waiting - entering) * 0.5);

    logger.debug("%s, Waiting: %d, Entered: %d, Population: %d, Remaining: %d",
        this.name, waiting, entering, this.population, this.availablePopulation);

    return entering;
};

module.exports = Town;