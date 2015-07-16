var Todo = require("../models/todos.model");
var express = require("express");
var router = express.Router();
var controller = require("./todosController")(Todo);

// routes
router.get('/', controller.index);
router.post('/', controller.create);

module.exports = router;

