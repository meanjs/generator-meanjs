'use strict';

var path = require('path'),
	rootPath = path.normalize(__dirname + '/../..');

var port = process.env.PORT || 3000;
var appUrl = process.env.APP_URL || ('http://localhost:' + port);

module.exports = {
	app: {
		title: '<%= appName %>',
		description: '<%= appDescription %>',
		keywords: '<%= appKeywords %>'
	},
	root: rootPath,
	port: port,
	appUrl: appUrl,
	templateEngine: 'swig',
	sessionSecret: '<%= slugifiedAppName %>',
	sessionCollection: 'sessions'
};