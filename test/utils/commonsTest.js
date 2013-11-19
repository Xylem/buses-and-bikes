"use strict";

require("should");
var sinon = require("sinon");
var commons = require("../../src/utils/commons");

describe("utils/commons.js", function () {
    describe("#curry", function () {
        it("should apply given parameters to a function and return a curried function", function () {
            var fn = sinon.spy();

            var curried = commons.curry(fn, this, 13, 32);

            curried.should.be.a.Function;

            curried();

            fn.calledWith(13, 32).should.be.true;
        });
    });
});