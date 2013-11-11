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
        simplemocha: {
            options: {
                timeout: 3000,
                ignoreLeaks: false,
                reporter: "spec"
            },
            all: {
                src: "test/**/*Test.js"
            }
        }
    });

    grunt.loadNpmTasks("grunt-jsdoc");
    grunt.loadNpmTasks("grunt-simple-mocha");

    grunt.registerTask("test", function () {
        var reporter = this.args[0] || "spec";
        process.env["XUNIT_FILE"] = this.args[1] || "";

        grunt.config.set("simplemocha.options.reporter", reporter);

        grunt.task.run("simplemocha");
    });
};