"use strict";

require("should");
var sinon = require("sinon");
var Bus = require("../../src/simulation/Bus");

describe("simulation/Bus.js", function () {
    describe("#start", function () {
        it("should emit initial event", function (done) {
            var bus = new Bus();

            bus.on("event", function (data) {
                data.time.should.equal(0);
                data.run.should.be.a.Function;

                done();
            });

            bus.start();
        });
    });

    describe("#run", function () {
        var bus;
        var CONFIG = {
            capacity: 10,
            travellingTime: 10,
            timePerPerson: 1
        };
        var TOWN;

        beforeEach(function () {
            TOWN = {
                getPeople: sinon.stub().returns(2)
            };

            var townProvider = {
                getNextTown: sinon.stub().returns({ town: TOWN })
            };

            bus = new Bus(0, CONFIG, townProvider);

            sinon.stub(Math, "random").returns(0.5);
        });

        it("should emit next event", function (done) {
            bus.on("event", function (data) {
                data.run.should.be.a.Function;

                done();
            });

            bus.run(0, TOWN);
        });

        it("should calculate proper time for next event", function (done) {
            bus.on("event", function (data) {
                data.time.should.equal(12);

                done();
            });

            bus.run(0, TOWN);
        })

        afterEach(function () {
            Math.random.restore();
        });
    });
});