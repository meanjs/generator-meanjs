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
			message: 'Which module does this view belongs to?',
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

	askForControllerName: function() {
		var done = this.async();

		var prompts = [{
			name: 'controllerName',
			message: 'What is the name of the controller this view will use?',
			default: this.classifiedName
		}];

		this.prompt(prompts, function(props) {
			this.controllerName = props.controllerName;

			this.slugifiedControllerName = s(this.controllerName).slugify().value();
			this.classifiedControllerName = s(this.slugifiedControllerName).classify().value();

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
				this.slugifiedRoutePath = s(this.routePath).slugify().value();

				done();
			}.bind(this));
		}
	},

	renderRoute: function() {
		if (this.addRoute) {
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
		}
	},

	renderViewFile: function() {
		this.template('_.client.view.html', 'modules/' + this.slugifiedModuleName + '/client/views/' + this.slugifiedName + '.client.view.html')
	}
});

module.exports = ViewGenerator;
