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
    .alias("p", "port")
    .describe("p", "Port the application should listen on")
    .argv;

if (argv.help) {
    optimist.showHelp();
    process.exit(0);
}

var path = require("path");
var log = require("./utils/log");
var loggerConfigPath = path.normalize(__dirname + "/../config/" + (argv.verbose ? config.logger.verbose : config.logger.silent));

log.configure(loggerConfigPath);

var logger = log.getLogger();
var express = require("express");
var app = express();
var constants = require("./utils/constants");
var scheduler = new (require("./simulator/Scheduler"))();
var townProvider = new (require("./simulation/TownProvider"))();
var Bus = require("./simulation/Bus");

townProvider.loadTowns(path.normalize(__dirname + "/../config/" + config.townsFile));

app.use(express.static(path.normalize(__dirname + "/../www")));

var server = require("http").createServer(app);

var sockets = require("./sockets");

sockets.registerExpress(server);
sockets.onFirstUserConnected(function () {
    logger.info("User connected - switching to step processing");

    scheduler.switchMode(constants.SCHEDULER_MODE.STEP);
});
sockets.onEveryoneDisconnected(function () {
    logger.info("All users disconnected - switching to full speed processing");

    scheduler.switchMode(constants.SCHEDULER_MODE.STEP);
});

var port = argv.port || config.port || 3000;

var stats = [];

sockets.sendCurrentStatusOnConnection(function () {
    return stats;
});

function createBus (id, startingTown, startingDirection) {
    var town = townProvider.getTownByName(startingTown);

    if (!town) {
        logger.warn("Town %s doesn't exist. Skipping bus creation.", startingTown);
        return;
    }

    var bus = new Bus(id, config.busParameters, townProvider);

    scheduler.registerEventEmitter(bus);

    bus.on("stats", function (data) {
        stats.push(data);
    });

    sockets.registerEventEmitter("stats", bus);

    bus.start(town, startingDirection);
}

var busesConfig = require(path.normalize(__dirname + "/../config/" + config.busesFile));

var busId = 1;

busesConfig.forEach(function (busConfig) {
    createBus(busId, busConfig.town, busConfig.direction);

    ++busId;
});

server.listen(port);

logger.info("Listening on port %d", port);

scheduler.switchMode(constants.SCHEDULER_MODE.STEP);
scheduler.runEvent();