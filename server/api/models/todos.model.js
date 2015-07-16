var mongoose = require('mongoose');
var todosSchema = mongoose.Schema({
	task: String,
	createdOn: {type: Date, default: Date.now}
});

var Todo = mongoose.model('Todo', todosSchema);

module.exports = Todo;
