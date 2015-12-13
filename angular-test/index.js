'use strict';

var util = require('util'),
	fs = require('fs'),
	yeoman = require('yeoman-generator');


var TestGenerator = yeoman.generators.NamedBase.extend({
	askForModuleName: function() {
		var modulesFolder = process.cwd() + '/public/modules/';
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
			this.slugifiedModuleName = this._.slugify(this.moduleName);

			this.slugifiedControllerName = this._.slugify(this._.humanize(this.name));
			this.classifiedControllerName = this._.classify(this.slugifiedControllerName);
			this.humanizedControllerName = this._.humanize(this.slugifiedControllerName);

			done();
		}.bind(this));
	},

	renderTestFile: function() {
		var controllerFilePath = process.cwd() + '/public/modules/' + this.slugifiedModuleName + '/controllers/' + this.slugifiedControllerName + '.client.controller.js';

		// If controller file exists we create a test for it otherwise we will first create a controller
		if (!fs.existsSync(controllerFilePath)) {
			this.template('_.client.controller.js', 'public/modules/' + this.slugifiedModuleName + '/controllers/' + this.slugifiedControllerName + '.client.controller.js')
		}

		// If controller file exists we create a test for it otherwise we will first create a controller
		if (!fs.existsSync(controllerFilePath)) {
			this.template('_.client.controller.js', 'public/modules/' + this.slugifiedModuleName + '/controllers/' + this.slugifiedControllerName + '.client.controller.js')
		}

		this.template('_.client.controller.test.js', 'public/modules/' + this.slugifiedModuleName + '/tests/' + this.slugifiedControllerName + '.client.controller.test.js')
	}
});

module.exports = TestGenerator;