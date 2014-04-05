'use strict';

var path = require('path'),
	rootPath = path.normalize(__dirname + '/../..');

module.exports = {
	app: {
		title: '<%= appName %>',
		description: '<%= appDescription %>',
		keywords: '<%= appKeywords %>'
	},
	db: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI,
	root: rootPath,
	port: process.env.PORT || 3000,
	templateEngine: 'swig',
	sessionSecret: '<%= slugifiedAppName %>',
	sessionCollection: 'sessions'
};