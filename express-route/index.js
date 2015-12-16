'use strict';
var util = require('util'),
	yeoman = require('yeoman-generator');


var RouteGenerator = yeoman.generators.NamedBase.extend({
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

			this.slugifiedName = this._.slugify(this._.humanize(this.name));

			done();
		}.bind(this));
	},

	createRouteFile: function() {
		this.template('_.server.routes.js', 'modules/' + this.slugifiedModuleName + '/server/routes/' + this.slugifiedName + '.server.routes.js')
	}
});

module.exports = RouteGenerator;