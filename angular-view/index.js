'use strict';
var util = require('util'),
	fs = require('fs'),
	yeoman = require('yeoman-generator');


var ModuleGenerator = yeoman.generators.NamedBase.extend({
	askForModuleName: function() {
		var done = this.async();

		var prompts = [{
			name: 'moduleName',
			message: 'Which module does this view belongs to?',
			default: 'core'
		}, {
			name: 'controllerName',
			message: 'Which controller does this view use?'
		}];

		this.prompt(prompts, function(props) {
			this.moduleName = props.moduleName;
			this.controllerName = props.controllerName;

			done();
		}.bind(this));
	},

	askToAddRoute: function() {
		var done = this.async();

		var prompts = [{
			type: 'confirm',
			name: 'addRoute',
			message: 'Would you like to add a route for this view?',
			default: true
		}];

		this.prompt(prompts, function(props) {
			this.addRoute = props.addRoute;

			done();
		}.bind(this));
	},

	askForRouteDetails: function() {
		if (this.addRoute) {
			var done = this.async();

			var prompts = [{
				name: 'routePath',
				message: 'What is your view route path?'
			}];

			this.prompt(prompts, function(props) {
				this.routePath = props.routePath;

				done();
			}.bind(this));
		}
	},

	renderRoute: function() {
		if (this.addRoute) {
			var routesFilePath = process.cwd() + '/public/modules/' + this._.slugify(this.moduleName) + '/config/routes.js';
			
			// If routes file exists we add a new state otherwise we render a new one
			if (fs.existsSync(routesFilePath)) {
				// Read the source routes file content
				var routesFileContent = this.readFileAsString(routesFilePath);

				// Append the new state
				routesFileContent = routesFileContent.replace('$stateProvider.', this.engine(this.read('_route.js'), this));
				
				// Save route file
				this.writeFileFromString(routesFileContent, routesFilePath);
			} else {
				this.template('_routes.js', 'public/modules/' + this._.slugify(this.moduleName) + '/views/routes.js')
			}
		}
	},

	renderViewFile: function() {
		this.template('_view.html', 'public/modules/' + this._.slugify(this.moduleName) + '/views/' + this._.slugify(this.name) + '.html')
	}
});

module.exports = ModuleGenerator;