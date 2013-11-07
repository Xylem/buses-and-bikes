"use strict";

function TownProvider () {

}

TownProvider.prototype.loadTowns = function (filePath) {
    this.towns = require(filePath);
};

TownProvider.prototype.getNextTown = function (currentTown, direction) {
    var currentTownIndex = this.towns.indexOf(currentTown);
    var nextTownIndex;
    var nextDirection = direction;

    if (direction) {
        nextTownIndex = currentTownIndex + 1;

        if (nextTownIndex >= this.towns.length) {
            nextTownIndex = this.towns.length - 2;
            nextDirection = false;
        }
    } else {
        nextTownIndex = currentTownIndex - 1;

        if (nextTownIndex < 0) {
            nextTownIndex = 1;
            nextDirection = true;
        }
    }

    return {
        town: this.towns[nextTownIndex],
        direction: nextDirection
    };
};

module.exports = TownProvider;