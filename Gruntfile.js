"use strict";

module.exports = function (grunt) {
    grunt.initConfig({
        jsdoc: {
            dist: {
                src: ["src/**/*.js"],
                options: {
                    destination: "doc"
                }
            }
        },
        mochaTest: {
            test: {
                options: {
                    timeout: 3000,
                    ignoreLeaks: false,
                    reporter: "spec"
                },
                src: [ "test/**/*Test.js" ]
            },
            coverage: {
                options: {
                    timeout: 3000,
                    ignoreLeaks: false,
                    require: "./coverage/blanket",
                    reporter: "mocha-lcov-reporter",
                    quiet: true,
                    captureFile: "coverage.lcov"
                },
                src: [ "test/**/*Test.js" ]
            }
        },
        shell: {
            pipeCoverage: {
                command: "cat coverage.lcov | ./node_modules/coveralls/bin/coveralls.js"
            }
        }
    });

    var log = require("./src/utils/log");

    log.configure(__dirname + "/config/logger-test.json");

    grunt.loadNpmTasks("grunt-jsdoc");
    grunt.loadNpmTasks("grunt-mocha-test");
    grunt.loadNpmTasks("grunt-shell");

    grunt.registerTask("test", function () {
        var reporter = this.args[0] || "spec";
        process.env["XUNIT_FILE"] = this.args[1] || "";

        grunt.config.set("mochaTest.test.options.reporter", reporter);

        grunt.task.run("mochaTest:test");
    });

    grunt.registerTask("coverage", function () {
        grunt.task.run(["mochaTest:coverage", "shell:pipeCoverage"]);
    });
};