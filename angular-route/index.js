'use strict';
var util = require('util'),
	fs = require('fs'),
	yeoman = require('yeoman-generator');


var ViewGenerator = yeoman.generators.NamedBase.extend({
	askForModuleName: function() {
		var done = this.async();

		var prompts = [{
			name: 'moduleName',
			message: 'Which module does this route belongs to?',
			default: 'core'
		}];

		this.prompt(prompts, function(props) {
			this.moduleName = props.moduleName;
			this.controllerName = props.controllerName;

			this.slugifiedModuleName = this._.slugify(this.moduleName);
			this.humanizedModuleName = this._.humanize(this.moduleName);

			this.slugifiedName = this._.slugify(this.name);
			this.classifiedName = this._.classify(this.slugifiedName);
			this.humanizedName = this._.humanize(this.slugifiedName);

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

			this.slugifiedControllerName = this._.slugify(this.controllerName);
			this.classifiedControllerName = this._.classify(this.controllerName);

			done();
		}.bind(this));
	},

	renderRoute: function() {
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
			this.template('_routes.js', 'public/modules/' + this.slugifiedModuleName + '/config/routes.js')
		}
	},

	renderRouteViewController: function() {
		this.template('_controller.js', 'public/modules/' + this.slugifiedModuleName + '/controllers/' + this.slugifiedControllerName + '.js')
		this.template('_view.html', 'public/modules/' + this.slugifiedModuleName + '/views/' + this.slugifiedViewName + '.html')
	}
});

module.exports = ViewGenerator;