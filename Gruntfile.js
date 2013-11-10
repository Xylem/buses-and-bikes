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
        }
    });

    grunt.loadNpmTasks("grunt-jsdoc");
};