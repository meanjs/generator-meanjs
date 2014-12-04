'use strict';
var util = require('util'),
	fs = require('fs'),
	yeoman = require('yeoman-generator'),
	modulesHelper = require('../utilities/modules.helper');


var ViewGenerator = yeoman.generators.NamedBase.extend({
	init: function() {
		this.slugifiedName = this._.slugify(this._.humanize(this.name));
		this.classifiedName = this._.classify(this.slugifiedName);
		this.humanizedName = this._.humanize(this.slugifiedName);
		
		this.availableModuleChoices = modulesHelper.constructListOfModuleChoices(this.slugifiedViewName);
		if (this.availableModuleChoices == null)
			this.env.error('No modules found!');
	},
	askForModuleName: function() {
		var done = this.async();

		var prompts = [{
			type: 'list',
			name: 'moduleName',
			default: 'core',
			message: 'Which module does this route belongs to?',
			choices: this.availableModuleChoices
		}];

		this.prompt(prompts, function(props) {
			this.moduleName = props.moduleName;

			this.slugifiedModuleName = this._.slugify(this.moduleName);
			this.humanizedModuleName = this._.humanize(this.moduleName);


			done();
		}.bind(this));
	},

	askForRouteDetails: function() {
		var done = this.async();

		var prompts = [{
			name: 'routePath',
			message: 'What do you want your route path to be?',
			default: this.slugifiedName
		}, {
			name: 'viewName',
			message: 'What do you want to call your view?',
			default: this.slugifiedName
		}, {
			name: 'controllerName',
			message: 'What do you want to call your controller?',
			default: this.classifiedName
		}];

		this.prompt(prompts, function(props) {
			this.routePath = props.routePath;
			this.viewName = props.viewName;
			this.controllerName = props.controllerName;

			this.slugifiedRoutePath = this._.slugify(this.routePath);

			this.slugifiedViewName = this._.slugify(this.viewName);
			this.humanizedViewName = this._.humanize(this.viewName);

			this.slugifiedControllerName = this._.slugify(this._.humanize(this.controllerName));
			this.classifiedControllerName = this._.classify(this.slugifiedControllerName);
			this.humanizedControllerName = this._.humanize(this.slugifiedControllerName);

			done();
		}.bind(this));
	},

	renderRoute: function() {
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
	},

	renderRouteViewController: function() {
		this.template('_.client.controller.js', 
					  'modules/' + this.slugifiedModuleName + '/client/controllers/' + this.slugifiedControllerName + '.client.controller.js')
		this.template('_.client.controller.test.js', 
					  'modules/' + this.slugifiedModuleName + '/client/tests/' + this.slugifiedControllerName + '.client.controller.test.js')
		this.template('_.client.view.html', 
					  'modules/' + this.slugifiedModuleName + '/client/views/' + this.slugifiedViewName + '.client.view.html')
	}
});

module.exports = ViewGenerator;
