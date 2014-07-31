'use strict';

var util = require('util'),
	fs = require('fs'),
	yeoman = require('yeoman-generator');


var ControllerGenerator = yeoman.generators.NamedBase.extend({
	askForModuleName: function() {
		var modulesFolder = process.cwd() + '/public/modules/';
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

			this.slugifiedControllerName = this._.slugify(this._.humanize(this.name));
			this.classifiedControllerName = this._.classify(this.slugifiedControllerName);
			this.humanizedControllerName = this._.humanize(this.slugifiedControllerName);

			done();
		}.bind(this));
	},

	renderControllerFiles: function() {
		this.template('_.client.controller.js', 'public/modules/' + this.slugifiedModuleName + '/controllers/' + this.slugifiedControllerName + '.client.controller.js');
		this.template('_.client.controller.test.js', 'public/modules/' + this.slugifiedModuleName + '/tests/' + this.slugifiedControllerName + '.client.controller.test.js');
	}
});

module.exports = ControllerGenerator;
