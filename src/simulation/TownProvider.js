"use strict";

var Town = require("./Town");
var DIRECTION = require("../utils/constants").DIRECTION;

/**
 * Creates new instance of TownProvider.
 *
 * @constructor
 */
function TownProvider () {
}

/**
 * Allows to load towns array into the provider.
 *
 * @param {String} filePath path to the JSON file containing the array of towns
 */
TownProvider.prototype.loadTowns = function (filePath) {
    this.towns = require(filePath).map(function (town) {
        return new Town(town.population, town.name);
    });
};

/**
 * Retrieves next destination along with next direction for a vehicle based on current town it's in and its current
 * direction.
 *
 * @param {Object} currentTown current town the vehicle is in
 * @param {Object} direction current direction of the vehicle
 * @returns {{town: Object, direction: Object}} destination town for the vehicle and its next direction along the line
 */
TownProvider.prototype.getNextTown = function (currentTown, direction) {
    var currentTownIndex = this.towns.indexOf(currentTown);
    var nextTownIndex;
    var nextDirection = direction;

    if (direction === DIRECTION.FORWARDS) {
        nextTownIndex = currentTownIndex + 1;

        if (nextTownIndex >= this.towns.length) {
            nextTownIndex = this.towns.length - 2;
            nextDirection = DIRECTION.BACKWARDS;
        }
    } else {
        nextTownIndex = currentTownIndex - 1;

        if (nextTownIndex < 0) {
            nextTownIndex = 1;
            nextDirection = DIRECTION.FORWARDS;
        }
    }

    return {
        town: this.towns[nextTownIndex],
        direction: nextDirection
    };
};

module.exports = TownProvider;