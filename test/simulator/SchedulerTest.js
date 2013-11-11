"use strict";

var should = require("should");
var sinon = require("sinon");
var Scheduler = require("../../src/simulator/Scheduler");
var SCHEDULER_MODE = require("../../src/utils/constants").SCHEDULER_MODE;
var EventEmitter = require("events").EventEmitter;

describe("simulator/Scheduler.js", function () {
    describe("#runEvent", function () {
        beforeEach(function () {
            sinon.stub(global, "setImmediate");
            sinon.stub(global, "setTimeout");
        });

        it("should take the first element from events array and execute its #run() method", function (done) {
            var scheduler = new Scheduler();

            function validateEventsCount() {
                scheduler.events.length.should.equal(2);

                done();
            }

            scheduler.events = [
                {
                    run: validateEventsCount
                },
                {},
                {}
            ];

            scheduler.runEvent();
        });

        it("should schedule the next execution immediately when full speed mode is set", function (done) {
            global.setImmediate.restore();

            function validateScheduled () {
                global.setImmediate.calledOnce.should.be.true;

                done();
            }

            sinon.stub(global, "setImmediate", validateScheduled);

            var scheduler = new Scheduler();

            scheduler.events = [
                {
                    run: function () {}
                }
            ];

            scheduler.runEvent();
        });

        it("should schedule the next execution with a timeout when step mode is set", function (done) {
            global.setTimeout.restore();

            function validateScheduled () {
                global.setTimeout.calledOnce.should.be.true;

                done();
            }

            sinon.stub(global, "setTimeout", validateScheduled);

            var scheduler = new Scheduler();
            scheduler.switchMode(SCHEDULER_MODE.STEP);

            scheduler.events = [
                {
                    run: function () {}
                }
            ];

            scheduler.runEvent();
        });

        afterEach(function () {
            global.setImmediate.restore();
            global.setTimeout.restore();
        });
    });

    describe("#switchMode", function () {
        it("should properly set operating mode for scheduler to a given one", function () {
            var scheduler = new Scheduler();

            scheduler.mode.should.equal(SCHEDULER_MODE.FULL_SPEED);

            scheduler.switchMode(SCHEDULER_MODE.STEP);

            scheduler.mode.should.equal(SCHEDULER_MODE.STEP);
        });
    });

    describe("#registerEventEmitter", function () {
        it("should properly register an event emitter and react to events \"event\"", function () {
            var eventEmitter = new EventEmitter();
            var scheduler = new Scheduler();

            scheduler.registerEventEmitter(eventEmitter);

            eventEmitter.emit("event", { time: 0 });

            scheduler.events.length.should.equal(1);
        });

        it("should store the events ordered by \"time\" property in ascending order", function () {
            var eventEmitter = new EventEmitter();
            var scheduler = new Scheduler();

            scheduler.registerEventEmitter(eventEmitter);

            var eventArray = [{ time: 0 }, { time: 1 }, { time: 2 }];

            eventEmitter.emit("event", eventArray[2]);
            eventEmitter.emit("event", eventArray[1]);
            eventEmitter.emit("event", eventArray[0]);

            scheduler.events.should.eql(eventArray);
        });
    });
});