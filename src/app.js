"use strict";

var config = require("../config/config.json");
var Scheduler = require("./simulator/Scheduler");
var scheduler = new Scheduler();

var TownProvider = require("./simulation/TownProvider");
var townProvider = new TownProvider();

var Bus = require("./simulation/Bus");
var bus = new Bus(config.busParameters, townProvider);

townProvider.loadTowns(__dirname + "/../config/" + config.townsFile);

scheduler.registerEventEmitter(bus);

bus.start(townProvider.towns[0], true);

scheduler.runEvent();