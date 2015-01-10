'use strict';
var util = require('util'),
	fs = require('fs'),
	yeoman = require('yeoman-generator'),
	modulesHelper = require('../utilities/modules.helper');

var ViewGenerator = yeoman.generators.NamedBase.extend({
	init: function() {
		this.slugifiedNgRouteName = this._.slugify(this._.humanize(this.name));
		this.classifiedNgRouteName = this._.classify(this.slugifiedNgRouteName);

		this.availableModuleChoices = modulesHelper.constructListOfModuleChoices(this.slugifiedNgRouteName);
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
			
			done();
		}.bind(this));
	},

	askForRouteDetails: function() {
		var done = this.async();

		var prompts = [{
			name: 'routePath',
			message: 'What do you want your route path to be?',
			default: this.slugifiedNgRouteName
		}, {
			name: 'viewName',
			message: 'What do you want to call your view?',
			default: this.slugifiedNgRouteName
		}, {
			name: 'controllerName',
			message: 'What do you want to call your controller?',
			default: this.classifiedNgRouteName
		}];

		this.prompt(prompts, function(props) {
			this.routePath = props.routePath;
			this.viewName = props.viewName;
			this.controllerName = props.controllerName;

			/* These values may also be used in view templates */
			this.slugifiedNgViewName = this._.slugify(this.viewName);
			this.slugifiedNgControllerName = this._.slugify(this._.humanize(this.controllerName));
			
			done();
		}.bind(this));
	},
	setViewTemplateVariables: function() {
		/* Variables set in this method should be only those variables exclusively used inside the correlated templates */
		this.classifiedNgControllerName = this._.classify(this.slugifiedNgControllerName);
		this.humanizedNgControllerName = this._.humanize(this.slugifiedNgControllerName);
		this.humanizedModuleName = this._.humanize(this.moduleName);
		this.slugifiedNgRoutePath = this._.slugify(this.routePath);		
	},
	renderRoute: function() {
		var routesFilePath = 'modules/' + this.slugifiedModuleName + '/client/config/' + this.slugifiedModuleName + '.client.routes.js';

		// If routes file exists we add a new state otherwise we render a new one
		if (fs.existsSync(routesFilePath)) {
			var routesFileContent = this.readFileAsString(routesFilePath);

			// Append the new state
			routesFileContent = routesFileContent.replace('$stateProvider.', this.engine(this.read('_.client.route.js'), this));

			this.writeFileFromString(routesFileContent, routesFilePath);
		} else {
			this.template('_.client.routes.js', routesFilePath)
		}
	},
	renderRouteViewController: function() {
		this.template('_.client.controller.js', 
					  'modules/' + this.slugifiedModuleName + '/client/controllers/' + this.slugifiedNgControllerName + '.client.controller.js')
		this.template('_.client.controller.test.js', 
					  'modules/' + this.slugifiedModuleName + '/client/tests/' + this.slugifiedNgControllerName + '.client.controller.test.js')
		this.template('_.client.view.html', 
					  'modules/' + this.slugifiedModuleName + '/client/views/' + this.slugifiedNgViewName + '.client.view.html')
	}
});

module.exports = ViewGenerator;
