"use strict";

var config = require("../config/config.json");
var optimist = require("optimist");

var argv = optimist
               .boolean("v")
               .alias("v", "verbose")
               .describe("v", "Prints logs to console")
               .boolean("h")
               .alias("h", "help")
               .describe("h", "Prints this help")
               .argv;

if (argv.help) {
    optimist.showHelp();
    return;
}

var log = require("./utils/log");
var loggerConfigPath = __dirname + "/../config/" + (argv.verbose ? config.logger.verbose : config.logger.silent);

log.configure(loggerConfigPath);

var Scheduler = require("./simulator/Scheduler");
var scheduler = new Scheduler();

var TownProvider = require("./simulation/TownProvider");
var townProvider = new TownProvider();

var Bus = require("./simulation/Bus");
var bus_1 = new Bus(1, config.busParameters, townProvider);
var bus_2 = new Bus(2, config.busParameters, townProvider);

var constants = require("./utils/constants");

townProvider.loadTowns(__dirname + "/../config/" + config.townsFile);

scheduler.registerEventEmitter(bus_1);
scheduler.registerEventEmitter(bus_2);
scheduler.switchMode(constants.SCHEDULER_MODE.STEP);

bus_1.start(townProvider.towns[0], constants.DIRECTION.FORWARDS);
bus_2.start(townProvider.towns[2], constants.DIRECTION.BACKWARDS);

scheduler.runEvent();