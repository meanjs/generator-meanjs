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
		}
	},

	renderViewFile: function() {
		this.template('_.client.view.html', 'public/modules/' + this.slugifiedModuleName + '/views/' + this.slugifiedName + '.client.view.html')
	}
});

module.exports = ViewGenerator;
