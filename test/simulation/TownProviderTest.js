"use strict";

require("should");
var TownProvider = require("../../src/simulation/TownProvider");
var DIRECTION = require("../../src/utils/constants").DIRECTION;

describe("simulation/TownProvider.js", function () {
    var townProvider;
    var TOWNS = [{ name: "Test1" }, { name: "Test2" }, { name: "Test3" }, { name: "Test4" }];

    before(function () {
        townProvider = new TownProvider();
        townProvider.towns = TOWNS;
    });

    describe("#getNextTown", function () {
        it("should return next town and retain direction when going forwards from non-last town", function () {
            var nextTown = townProvider.getNextTown(TOWNS[2], DIRECTION.FORWARDS);

            nextTown.town.should.equal(TOWNS[3]);
            nextTown.direction.should.equal(DIRECTION.FORWARDS);
        });

        it("should return previous town and swap direction when going forwards from last town", function () {
            var nextTown = townProvider.getNextTown(TOWNS[3], DIRECTION.FORWARDS);

            nextTown.town.should.equal(TOWNS[2]);
            nextTown.direction.should.equal(DIRECTION.BACKWARDS);
        });

        it("should return previous town and retain direction when going backwards from non-first town", function () {
            var nextTown = townProvider.getNextTown(TOWNS[2], DIRECTION.BACKWARDS);

            nextTown.town.should.equal(TOWNS[1]);
            nextTown.direction.should.equal(DIRECTION.BACKWARDS);
        });

        it("should return next town and swap direction when going backwards from first town", function () {
            var nextTown = townProvider.getNextTown(TOWNS[0], DIRECTION.BACKWARDS);

            nextTown.town.should.equal(TOWNS[1]);
            nextTown.direction.should.equal(DIRECTION.FORWARDS);
        });
    });

    describe("#getTownByName", function () {
        it("should return the town object when town with given name exists", function () {
            var town = townProvider.getTownByName("Test3");

            town.should.equal(TOWNS[2]);
        });

        it("should return null when town with given name doesn't exist", function () {
            var town = townProvider.getTownByName("Test5");

            (town === null).should.be.true;
        });
    });
});