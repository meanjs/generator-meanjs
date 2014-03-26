'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');


var MeanGenerator = yeoman.generators.Base.extend({
	init: function() {
		// read the local package file
		this.pkg = yeoman.file.readJSON(path.join(__dirname, '../package.json'));

		// invoke npm install on finish
		this.on('end', function() {
			if (!this.options['skip-install']) {
				this.npmInstall();
			}
		});

		// have Yeoman greet the user
		console.log(this.yeoman);

		// replace it with a short and sweet description of your generator
		console.log(chalk.magenta('You\'re using the official MEAN generator.'));
	},

	askForApplicationName: function() {
		var done = this.async();

		var prompts = [{
			name: 'appName',
			message: 'What would you like to call your application?',
			default: 'MEAN'
		}, {
			name: 'appDescription',
			message: 'How would you describe your application?',
			default: 'Full-Stack JavaScript with MongoDB, Express, AngularJS, and Node.js'
		}];

		this.prompt(prompts, function(props) {
			this.appName = props.appName;
			this.appDescription = props.appDescription;

			done();
		}.bind(this));
	},

	askForApplicationTemplateEngine: function() {
		var done = this.async();

		var prompts = [{
			type: 'list',
			name: 'templateEngine',
			default: 'swig',
			message: 'Which template engine would you like to use?',
			choices: [{
				value: 'swig',
				name: 'SWIG',
			}, {
				value: 'jade',
				name: 'JADE',
			}, {
				value: 'ejs',
				name: 'EJS',
			}]
		}];

		this.prompt(prompts, function(props) {
			this.templateEngine = props.templateEngine;

			done();
		}.bind(this));
	},

	copyApplicationFolders: function() {
		this.directory('mean-project-template/app', 'app');
		this.directory('mean-project-template/config', 'config');
		this.directory('mean-project-template/public', 'public');
	},

	copyViewsFolder: function() {
		this.directory('mean-project-views/' + this.templateEngine, 'app/views');
	},

	renderApplicationDependenciesFiles: function() {
		this.template('mean-project-template/_package.json', 'package.json');
		this.template('mean-project-template/_bower.json', 'bower.json');
	},

	renderAngularApplicationConfigFile: function() {
		this.template('mean-project-template/public/js/config.js', 'public/js/config.js');
	},

	copyProjectFiles: function() {
		this.copy('mean-project-template/bowerrc', '.bowerrc');
		this.copy('mean-project-template/jshintrc', '.jshintrc');
		this.copy('mean-project-template/gitignore', '.gitignore');


		this.copy('mean-project-template/gruntfile.js', 'gruntfile.js');
		this.copy('mean-project-template/karma.conf.js', 'karma.conf.js');
		this.copy('mean-project-template/server.js', 'server.js');
		this.copy('mean-project-template/Procfile', 'Procfile');
	}
});

module.exports = MeanGenerator;