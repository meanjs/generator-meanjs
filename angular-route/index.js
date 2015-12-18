'use strict';
var util = require('util'),
	fs = require('fs'),
	s = require('underscore.string'),
	yeoman = require('yeoman-generator');


var ViewGenerator = yeoman.generators.NamedBase.extend({
	askForModuleName: function() {
		var modulesFolder = process.cwd() + '/modules/';
		var done = this.async();

		var prompts = [{
			type: 'list',
			name: 'moduleName',
			default: 'core',
			message: 'Which module does this route belongs to?',
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
			this.controllerName = props.controllerName;

			this.slugifiedModuleName = s(this.moduleName).slugify().value();
			this.humanizedModuleName = s(this.moduleName).humanize().value();

			this.slugifiedName = s(this.name).humanize().slugify().value();
			this.classifiedName = s(this.slugifiedName).classify().value();
			this.humanizedName = s(this.slugifiedName).humanize().value();

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

			this.slugifiedRoutePath = s(this.routePath).slugify().value();

			this.slugifiedViewName = s(this.viewName).slugify().value();
			this.humanizedViewName = s(this.viewName).humanize().value();

			this.slugifiedControllerName = s(this.controllerName).humanize().slugify().value();
			this.classifiedControllerName = s(this.slugifiedControllerName).classify().value();
			this.humanizedControllerName = s(this.slugifiedControllerName).humanize().value();

			done();
		}.bind(this));
	},

	renderRoute: function() {
		var routesFilePath = process.cwd() + '/modules/' + this.slugifiedModuleName + '/client/config/' + this.slugifiedModuleName + '.client.routes.js';

		// If routes file exists we add a new state otherwise we render a new one
		if (fs.existsSync(routesFilePath)) {
			// Read the source routes file content
			var routesFileContent = this.readFileAsString(routesFilePath);

			// Append the new state
			routesFileContent = routesFileContent.replace('$stateProvider.', this.engine(this.read('_.client.route.js'), this));

			// Save route file
			this.writeFileFromString(routesFileContent, routesFilePath);
		} else {
			this.template('_.client.routes.js', 'modules/' + this.slugifiedModuleName + '/client/config/' + this.slugifiedModuleName + '.client.routes.js')
		}
	},

	renderRouteViewController: function() {
		this.template('_.client.controller.js', 'modules/' + this.slugifiedModuleName + '/client/controllers/' + this.slugifiedControllerName + '.client.controller.js');
		this.template('_.client.view.html', 'modules/' + this.slugifiedModuleName + '/client/views/' + this.slugifiedViewName + '.client.view.html');
		this.template('_.client.controller.tests.js', 'modules/' + this.slugifiedModuleName + '/tests/client/' + this.slugifiedControllerName + '.client.controller.tests.js');
	}
});

module.exports = ViewGenerator;
