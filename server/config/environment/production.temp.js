'use strict';
// Edit this file and rename as production.js
var localEnv = require('../local.env');

// Production specific configuration
// =================================
module.exports = {
	// MongoDB connection options - ideally coming from environment config
	mongo: {
		uri: 'prod_url'
	},

	secrets: {
		session: 'SESSION_SECRET'
	}
};