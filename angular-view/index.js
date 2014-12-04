'use strict';
var util = require('util'),
	fs = require('fs'),
	yeoman = require('yeoman-generator'),
	modulesHelper = require('../utilities/modules.helper');


var ViewGenerator = yeoman.generators.NamedBase.extend({
	init: function() {
		this.slugifiedViewName = this._.slugify(this._.humanize(this.name));
		this.classifiedName = this._.classify(this.slugifiedViewName);
		this.humanizedName = this._.humanize(this.slugifiedViewName);

		this.availableModuleChoices = modulesHelper.constructListOfModuleChoices(this.slugifiedViewName);
		if (this.availableModuleChoices == null)
			this.env.error('No modules found!');
	},
	askForModule: function() {
		var done = this.async();

		var prompts = [{
			type: 'list',
			name: 'moduleName',
			default: 'core',
			message: 'Which module does this view belongs to?',
			choices: this.availableModuleChoices
		}];
		
		this.prompt(prompts, function(props) {
			this.moduleName = props.moduleName;

			this.slugifiedModuleName = this._.slugify(this.moduleName);
			this.humanizedModuleName = this._.humanize(this.moduleName);

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
				default: this.slugifiedViewName
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
			var routesFilePath = 'modules/' + this.slugifiedModuleName + '/client/config/' + this.slugifiedModuleName + '.client.routes.js';
			

			// If routes file exists we add a new state otherwise we render a new one
			if (fs.existsSync(routesFilePath)) {
				// Read the source routes file content
				var routesFileContent = this.readFileAsString(routesFilePath);

				// Append the new state
				routesFileContent = routesFileContent.replace('$stateProvider.', this.engine(this.read('_.client.route.js'), this));

				// Save route file
				this.writeFileFromString(routesFileContent, routesFilePath);
			} else {
				this.template('_.client.routes.js', routesFilePath)
			}
		}
	},

	renderViewFile: function() {
		this.template('_.client.view.html', 
					  'modules/' + this.slugifiedModuleName + '/client/views/' + this.slugifiedViewName + '.client.view.html')
	}
});

module.exports = ViewGenerator;
