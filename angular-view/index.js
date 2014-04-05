'use strict';
var util = require('util'),
	fs = require('fs'),
	yeoman = require('yeoman-generator');


var ViewGenerator = yeoman.generators.NamedBase.extend({
	askForModuleName: function() {
		var done = this.async();

		var prompts = [{
			name: 'moduleName',
			message: 'Which module does this view belongs to?',
			default: 'core'
		}];

		this.prompt(prompts, function(props) {
			this.moduleName = props.moduleName;
			this.controllerName = props.controllerName;

			this.slugifiedModuleName = this._.slugify(this.moduleName);
			this.humanizedModuleName = this._.humanize(this.moduleName);
			
			this.slugifiedName = this._.slugify(this._.humanize(this.name));
			this.classifiedName = this._.classify(this.slugifiedName);
			this.humanizedName = this._.humanize(this.slugifiedName);

			done();
		}.bind(this));
	},

	askForControllerName: function() {
		var done = this.async();

		var prompts = [{
			name: 'controllerName',
			message: 'What is the name of the controller this view will use?',
			default: this.classifiedName
		}];

		this.prompt(prompts, function(props) {
			this.controllerName = props.controllerName;
			
			this.slugifiedControllerName = this._.slugify(this.controllerName);
			this.classifiedControllerName = this._.classify(this.slugifiedControllerName);

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
				message: 'What is your view route path?',
				default: this.slugifiedName
			}];

			this.prompt(prompts, function(props) {
				this.routePath = props.routePath;
				this.slugifiedRoutePath = this._.slugify(this.routePath);

				done();
			}.bind(this));
		}
	},

	renderRoute: function() {
		if (this.addRoute) {
			var routesFilePath = process.cwd() + '/public/modules/' + this.slugifiedModuleName + '/config/routes.js';
			
			// If routes file exists we add a new state otherwise we render a new one
			if (fs.existsSync(routesFilePath)) {
				// Read the source routes file content
				var routesFileContent = this.readFileAsString(routesFilePath);

				// Append the new state
				routesFileContent = routesFileContent.replace('$stateProvider.', this.engine(this.read('_route.js'), this));
				
				// Save route file
				this.writeFileFromString(routesFileContent, routesFilePath);
			} else {
				this.template('_routes.js', 'public/modules/' + this.slugifiedModuleName + '/views/routes.js')
			}
		}
	},

	renderViewFile: function() {
		this.template('_view.html', 'public/modules/' + this.slugifiedModuleName + '/views/' + this.slugifiedName + '.html')
	}
});

module.exports = ViewGenerator;