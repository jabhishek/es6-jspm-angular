// use strict is required to make let keyword work
"use strict";

var MockTodo = function () {
};
MockTodo.prototype.save = function() {
	"use strict";
	console.log("original save");
};
MockTodo.find = function (condition, select, cb) {
	console.log("original find");
	cb();
};

var chai = require("chai");
var expect = chai.expect;
var sinon = require("sinon");
var todosController = require("./todosController")(MockTodo);

describe("todosController", function () {
	"use strict";
	var req, res, err, statusCode, sentData;
	var sandbox;
	beforeEach(function () {
		res = {
			json: function (resp) {
				err = resp.err;
				sentData = resp;
			},
			status: function (status) {
				statusCode = status;
				return this;
			}
		};

		statusCode = null;
		err = null;
		sentData = null;
		sandbox = sinon.sandbox.create();
	});

	afterEach(function() {
		sandbox.restore();
	});

	describe('index', function () {
		it("should be defined", function () {
			expect(todosController.index).to.exist;
		});

		it("should give results back if no error on find", function () {
			// Arrange
			var results = [{task: 'xyz'}];
			var find = function (condition, select, cb) {
				cb(null, results);
			};
			sandbox.stub(MockTodo, "find", find);

			// Act
			todosController.index(null, res);

			// Assert
			expect(statusCode).to.equal(200);
			expect(sentData).to.equal(results);
			expect(MockTodo.find.called).to.be.true;
		});

		it("should give give 500 error if find method errors", function () {
			// Arrange
			var find = function (condition, select, cb) {
				cb("Error");
			};
			sandbox.stub(MockTodo, "find", find);

			// Act
			todosController.index(null, res);

			// Assert
			expect(statusCode).to.equal(500);
			expect(err).to.equal('Error in finding tasks');
			expect(MockTodo.find.called).to.be.true;
		});
	});

	describe('create', function () {
		it("should be defined", function () {
			expect(todosController.create).to.exist;
		});

		it("should save task", function () {
			// Arrange
			var save = function (cb) {
				cb(null);
			};
			sandbox.stub(MockTodo.prototype, "save", save);
			req = {body: {task: 'Hello'}};

			// Act
			todosController.create(req, res);

			// Assert
			expect(statusCode).to.equal(200);
			expect(MockTodo.prototype.save.called).to.be.true;
		});

		it("should return 500 if task not saved successfully", function () {
			// Arrange
			var save = function (cb) {
				cb("error");
			};
			sandbox.stub(MockTodo.prototype, "save", save);
			req = {body: {task: 'Hello'}};

			// Act
			todosController.create(req, res);

			// Assert
			expect(statusCode).to.equal(500);
			expect(err).to.equal('Error saving task');
			expect(MockTodo.prototype.save.called).to.be.true;
		});

		it("should not save if no task passed", function () {
			// Arrange
			sandbox.spy(MockTodo.prototype, "save");
			req = {body: {}};

			// Act
			todosController.create(req, res);

			// Assert
			expect(statusCode).to.equal(400);
			expect(err).to.equal("Bad request - No task passed");
			expect(MockTodo.prototype.save.called).to.be.false;
		});
	});
});