"use strict";
var express = require('express');
var path = require("path");
var morgan = require('morgan');
var bodyParser = require('body-parser');
var port = process.env.PORT || 9000;


// test let support
var rootPath = path.normalize(__dirname + '/..');
var appPath;

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

if (app.get("env") === "development") {
	app.use(morgan('dev'));
	app.use(require('connect-livereload')());
	appPath = path.join(rootPath, 'client');
}
if (app.get("env") === "production") {
	appPath = path.join(rootPath, 'build');
}


app.use(express.static(appPath));
app.set("appPath", appPath);

app.route('/*')
	.get(function(req, res) {
		res.sendFile(app.get('appPath') + '/index.html');
	});


app.listen(port, function () {
	console.log('Listening on port ' + port + " in mode: " + app.get("env"));
});



