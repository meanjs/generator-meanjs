'use strict';

var util = require('util'),
	fs = require('fs'),
	s = require('underscore.string'),
	yeoman = require('yeoman-generator');


var TestGenerator = yeoman.generators.NamedBase.extend({
	askForModuleName: function() {
		var modulesFolder = process.cwd() + '/modules/';
		var done = this.async();

		var prompts = [{
			type: 'list',
			name: 'moduleName',
			default: 'core',
			message: 'Which module does this test belongs to?',
			choices: []
		}];

		// Add module choices
		fs.readdirSync(modulesFolder).forEach(function(folder) {
			var stat = fs.statSync(modulesFolder + '/' + folder);

			if (stat.isDirectory()) {
				prompts[0].choices.push({
					value: folder,
					name: folder
				});
			}
		});

		this.prompt(prompts, function(props) {
			this.moduleName = props.moduleName;
			this.slugifiedModuleName = s(this.moduleName).slugify().value();

			this.slugifiedControllerName = s(this.name).humanize().slugify().value();
			this.classifiedControllerName = s(this.slugifiedControllerName).classify().value();
			this.humanizedControllerName = s(this.slugifiedControllerName).humanize().value();

			done();
		}.bind(this));
	},

	renderTestsFile: function() {
		var controllerFilePath = process.cwd() + '/modules/' + this.slugifiedModuleName + '/client/controllers/' + this.slugifiedControllerName + '.client.controller.js';

		// If controller file exists we create a test for it otherwise we will first create a controller
		if (!fs.existsSync(controllerFilePath)) {
			this.template('_.client.controller.js', 'modules/' + this.slugifiedModuleName + '/client/controllers/' + this.slugifiedControllerName + '.client.controller.js')
		}

		// If controller file exists we create a test for it otherwise we will first create a controller
		if (!fs.existsSync(controllerFilePath)) {
			this.template('_.client.controller.js', 'modules/' + this.slugifiedModuleName + '/client/controllers/' + this.slugifiedControllerName + '.client.controller.js')
		}

		this.template('_.client.controller.tests.js', 'modules/' + this.slugifiedModuleName + '/tests/client/' + this.slugifiedControllerName + '.client.controller.tests.js')
	}
});

module.exports = TestGenerator;