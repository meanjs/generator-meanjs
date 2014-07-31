'use strict';
var util = require('util'),
	fs = require('fs'),
	yeoman = require('yeoman-generator');


var ViewGenerator = yeoman.generators.NamedBase.extend({
	askForModuleName: function() {
		var modulesFolder = process.cwd() + '/public/modules/';
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

			this.slugifiedModuleName = this._.slugify(this.moduleName);
			this.humanizedModuleName = this._.humanize(this.moduleName);

			this.slugifiedName = this._.slugify(this._.humanize(this.name));
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

			this.slugifiedControllerName = this._.slugify(this._.humanize(this.controllerName));
			this.classifiedControllerName = this._.classify(this.slugifiedControllerName);
			this.humanizedControllerName = this._.humanize(this.slugifiedControllerName);

			done();
		}.bind(this));
	},

	renderRoute: function() {
		var routesFilePath = process.cwd() + '/public/modules/' + this.slugifiedModuleName + '/config/' + this.slugifiedModuleName + '.client.routes.js';

		// If routes file exists we add a new state otherwise we render a new one
		if (fs.existsSync(routesFilePath)) {
			// Read the source routes file content
			var routesFileContent = this.readFileAsString(routesFilePath);

			// Append the new state
			routesFileContent = routesFileContent.replace('$stateProvider.', this.engine(this.read('_.client.route.js'), this));

			// Save route file
			this.writeFileFromString(routesFileContent, routesFilePath);
		} else {
			this.template('_.client.routes.js', 'public/modules/' + this.slugifiedModuleName + '/config/' + this.slugifiedModuleName + '.client.routes.js')
		}
	},

	renderRouteViewController: function() {
		this.template('_.client.controller.js', 'public/modules/' + this.slugifiedModuleName + '/controllers/' + this.slugifiedControllerName + '.client.controller.js')
		this.template('_.client.controller.test.js', 'public/modules/' + this.slugifiedModuleName + '/tests/' + this.slugifiedControllerName + '.client.controller.test.js')
		this.template('_.client.view.html', 'public/modules/' + this.slugifiedModuleName + '/views/' + this.slugifiedViewName + '.client.view.html')
	}
});

module.exports = ViewGenerator;
