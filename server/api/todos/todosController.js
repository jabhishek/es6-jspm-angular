var controller = function (Todo) {
	"use strict";
	var index = function (req, res) {
		console.log('getting data');
		"use strict";
		Todo.find({}, 'task createdOn', function (err, results) {
			console.log(results);
			if (!err) {
				res.status(200).json(results);
			} else {
				res.status(500).json({err: 'Error in finding tasks'});
			}
		});
	};

	var create = function (req, res) {
		"use strict";

		if (req.body == null || req.body.task == undefined) {
			return res.status(400).json({err: 'Bad request - No task passed'});
		}

		var todo = new Todo({
			task: req.body.task
		});
		todo.save(function (err) {
			if (!err) {
				res.status(200).json({
					message: 'created'
				});
			} else {
				res.status(500).json({
					err: 'Error saving task'
				});
			}
		});
	};

	return {
		index: index,
		create: create
	}
};

module.exports = controller;

