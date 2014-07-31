'use strict';

var util = require('util'),
	fs = require('fs'),
	yeoman = require('yeoman-generator');

var ConfigGenerator = yeoman.generators.NamedBase.extend({
	askForModuleName: function() {
		var modulesFolder = process.cwd() + '/public/modules/';
		var done = this.async();

		var prompts = [{
			type: 'list',
			name: 'moduleName',
			default: 'core',
			message: 'Which module does this configuration file belongs to?',
			choices: []
		}];

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
			this.humanizedModuleName = this._.humanize(this.moduleName);

			this.slugifiedName = this._.slugify(this.name);

			done();
		}.bind(this));
	},

	renderConfigFile: function() {
		this.template('_.client.config.js', 'public/modules/' + this.slugifiedModuleName + '/config/' + this.slugifiedName + '.client.config.js')
	}
});

module.exports = ConfigGenerator;
