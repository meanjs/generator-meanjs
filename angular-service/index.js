'use strict';

var util = require('util'),
	fs = require('fs'),
	yeoman = require('yeoman-generator');


var ServiceGenerator = yeoman.generators.NamedBase.extend({
	askForModuleName: function() {
		var modulesFolder = process.cwd() + '/public/modules/';
		var done = this.async();

		var prompts = [{
			type: 'list',
			name: 'moduleName',
			default: 'core',
			message: 'Which module does this service belongs to?',
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
			this.slugifiedModuleName = this._.slugify(this._.humanize(this.moduleName));

			this.slugifiedName = this._.slugify(this.name);
			this.classifiedName = this._.classify(this.slugifiedName);
			this.humanizedName = this._.humanize(this.slugifiedName);

			done();
		}.bind(this));
	},

	renderServiceFile: function() {
		this.template('_.client.service.js', 'public/modules/' + this.slugifiedModuleName + '/services/' + this.slugifiedName + '.client.service.js')
	}
});

module.exports = ServiceGenerator;
