'use strict';

var util = require('util'),
	fs = require('fs'),
	s = require('underscore.string'),
	yeoman = require('yeoman-generator');


var ControllerGenerator = yeoman.generators.NamedBase.extend({
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
			this.slugifiedModuleName = s(this.moduleName).slugify().value();

			this.slugifiedControllerName = s(this.name).humanize().slugify().value();
			this.classifiedControllerName = s(this.slugifiedControllerName).classify().value();
			this.humanizedControllerName = s(this.slugifiedControllerName).humanize().value();

			done();
		}.bind(this));
	},

	renderControllerFiles: function() {
		this.template('_.client.controller.js', 'modules/' + this.slugifiedModuleName + '/client/controllers/' + this.slugifiedControllerName + '.client.controller.js');
		this.template('_.client.controller.tests.js', 'modules/' + this.slugifiedModuleName + '/tests/client/' + this.slugifiedControllerName + '.client.controller.tests.js');
	}
});

module.exports = ControllerGenerator;
