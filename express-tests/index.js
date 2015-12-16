'use strict';

var util = require('util'),
	inflections = require('underscore.inflections'),
	fs = require('fs'),
	yeoman = require('yeoman-generator');


var TestGenerator = yeoman.generators.NamedBase.extend({
	askForModuleName: function() {
		var modulesFolder = process.cwd() + '/modules/';
		var done = this.async();

		var prompts = [{
			type: 'list',
			name: 'moduleName',
			default: 'core',
			message: 'Which module does this controller belongs to?',
			choices: []
		}];

		// Add module choices
		if (fs.existsSync(modulesFolder)) {

			fs.readdirSync(modulesFolder).forEach(function(folder) {
				var stat = fs.statSync(modulesFolder + '/' + folder);

				if (stat.isDirectory()) {
					prompts[0].choices.push({
						value: folder,
						name: folder
					});
				}
			});
		}

		this.prompt(prompts, function(props) {
			this.moduleName = props.moduleName;
			this.slugifiedModuleName = this._.slugify(this.moduleName);

			// Set model names
			this.slugifiedModelName = this._.slugify(this._.humanize(this.name));
			this.classifiedModelName = this._.classify(this.slugifiedModelName);
			this.humanizedModelName = this._.humanize(this.slugifiedModelName);
			this.camelizedModelName = this._.camelize(this.slugifiedModelName);

			this.slugifiedPluralModelName = inflections.pluralize(this.slugifiedModelName);

			done();
		}.bind(this));
	},
	renderTestsFile: function() {
		var modelFilePath = process.cwd() + '/modules/' + this.slugifiedModuleName + '/server/models/' + this.slugifiedModelName + '.server.model.js';

		// If model file exists we create a test for it otherwise we will first create a model
		if (!fs.existsSync(modelFilePath)) {
			this.template('_.server.model.js', 'modules/' + this.slugifiedModuleName + '/server/models/' + this.slugifiedModelName + '.server.model.js')
		}

		this.template('_.server.model.tests.js', 'modules/' + this.slugifiedModuleName + '/tests/server/' + this.slugifiedModelName + '.server.model.tests.js')
	}
});

module.exports = TestGenerator;