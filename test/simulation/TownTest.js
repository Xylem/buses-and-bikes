"use strict";

require("should");
var sinon = require("sinon");
var Town = require("../../src/simulation/Town");

describe("simulation/Town.js", function () {
    describe("#getPeople", function () {
        var town;

        beforeEach(function () {
            sinon.stub(Math, "random").returns(0.5);

            town = new Town(10000, "Test");
        });

        it("should return the number of people that were waiting at the bus stop " +
            "when the available capacity is greater or equal to the number of people waiting", function () {
                town.getPeople(1000).should.equal(500);
        });

        it("should return the capacity of the vehicle when the available capacity " +
            "is less than the number of people waiting", function () {
                town.getPeople(100).should.equal(100);
        });

        it("should remove half of the waiting people that didn't enter the vehicle from the pool of available people",
            function () {
                town.getPeople(100);

                town.availablePopulation.should.equal(9800);
        });

        afterEach(function () {
            Math.random.restore();
        });
    });
});