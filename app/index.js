'use strict';
var util = require('util'),
	path = require('path'),
	yeoman = require('yeoman-generator'),
	chalk = require('chalk');


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
		console.log(chalk.magenta('You\'re using the official MEAN.JS 0.4 generator.'));
	},

	askForApplicationDetails: function() {
		var done = this.async();

		var prompts = [{
			name: 'appName',
			message: 'What would you like to call your application?',
			default: 'MEAN'
		}, {
			name: 'appDescription',
			message: 'How would you describe your application?',
			default: 'Full-Stack JavaScript with MongoDB, Express, AngularJS, and Node.js'
		}, {
			name: 'appKeywords',
			message: 'How would you describe your application in comma separated key words?',
			default: 'MongoDB, Express, AngularJS, Node.js'
		}, {
			name: 'appAuthor',
			message: 'What is your company/author name?'
		}, {
			type: 'confirm',
			name: 'addArticleExample',
			message: 'Would you like to generate the article example CRUD module?',
			default: true
		}, {
			type: 'confirm',
			name: 'addChatExample',
			message: 'Would you like to generate the chat example module? (adds socket.io support)',
			default: true
		}];

		this.prompt(prompts, function(props) {
			this.appName = props.appName;
			this.appDescription = props.appDescription;
			this.appKeywords = props.appKeywords;
			this.appAuthor = props.appAuthor;
			this.addArticleExample = props.addArticleExample;
			this.addChatExample = props.addChatExample;

			this.slugifiedAppName = this._.slugify(this.appName);
			this.humanizedAppName = this._.humanize(this.appName);
			this.capitalizedAppAuthor = this._.capitalize(this.appAuthor);

			done();
		}.bind(this));
	},

	askForAngularApplicationModules: function() {
		var done = this.async();

		var prompts = [
			{
				type: 'checkbox',
				name: 'modules',
				message: 'Which modules would you like to include?',
				choices: [{
					value: 'angularCookies',
					name: 'ngCookies',
					checked: true
				}, {
					value: 'angularAnimate',
					name: 'ngAnimate',
					checked: true
				}, {
					value: 'angularTouch',
					name: 'ngTouch',
					checked: true
				}, {
					value: 'angularSanitize',
					name: 'ngSanitize',
					checked: true
				}, {
					value: 'socket.io',
					name: 'socketio',
					checked: true
				}]
			}
		];

		this.prompt(prompts, function(props) {
			this.angularCookies = this._.contains(props.modules, 'angularCookies');
			this.angularAnimate = this._.contains(props.modules, 'angularAnimate');
			this.angularTouch = this._.contains(props.modules, 'angularTouch');
			this.angularSanitize = this._.contains(props.modules, 'angularSanitize');
			this.socketio = this.renderChatExample || this._.contains(props.modules, 'socketio');

			done();
		}.bind(this));
	},

	copyApplicationFolder: function() {
		// Vertical Modules
		this.mkdir('modules');
        
        // Copy core module
        this.mkdir('modules/core');
        this.directory('modules/core/server');
        this.mkdir(    'modules/core/client');
        this.copy(     'modules/core/client/core.client.module.js');
        this.mkdir(    'modules/core/client/app');
        this.template( 'modules/core/client/app/_config.js', 'modules/core/client/app/config.js');
        this.copy(     'modules/core/client/app/init.js');
        this.directory('modules/core/client/config');
        this.directory('modules/core/client/controllers');
        this.directory('modules/core/client/css');
        this.directory('modules/core/client/img');
        this.directory('modules/core/client/services');
        this.directory('modules/core/client/views');
        this.directory('modules/core/tests');
        
        // Copy user module
        this.directory('modules/users');
        
        // Copy config folder
        this.mkdir('config');
        this.directory('config/lib');
        this.directory('config/assets');
        this.copy('config/config.js');
        
		// Copy project files
		this.copy('root-assets/karma.conf.js', 'karma.conf.js');
		this.copy('root-assets/gruntfile.js', 'gruntfile.js');
		this.copy('root-assets/gulpfile.js', 'gulpfile.js');
		this.copy('root-assets/server.js', 'server.js');
		this.copy('root-assets/Procfile', 'Procfile');
		this.copy('root-assets/fig.yml', 'fig.yml');
		this.copy('root-assets/Dockerfile', 'Dockerfile');
		this.copy('root-assets/generate-ssl-certs.sh', 'generate-ssl-certs.sh');
		this.copy('root-assets/README.md', 'README.md');
		this.copy('root-assets/LICENSE.md', 'LICENSE.md');
        this.copy('root-assets/protractor.conf.js', 'protractor.conf.js');
        
		// Copy project hidden files
		this.copy('root-assets/bowerrc', '.bowerrc');
		this.copy('root-assets/csslintrc', '.csslintrc');
		this.copy('root-assets/editorconfig', '.editorconfig');
		this.copy('root-assets/jshintrc', '.jshintrc');
		this.copy('root-assets/gitignore', '.gitignore');
		this.copy('root-assets/slugignore', '.slugignore');
		this.copy('root-assets/travis.yml', '.travis.yml');
        
        // Create the public dir
        this.mkdir('public');
        this.mkdir('public/dist');
        this.copy('public/humans.txt');
        this.copy('public/robots.txt');
	},

	renderArticleExample: function() {
		// Copy example files if desired
		if (this.addArticleExample) {
			this.directory('modules/articles');
		}
	},
    
    renderChatExample: function() {
        if (this.addChatExample) {
            this.directory('modules/chat');
        }
    },

	renderApplicationEnvironmentConfigFiles: function() {
		this.template('config/env/_default.js', 'config/env/default.js');
		this.template('config/env/_development.js', 'config/env/development.js');
		this.template('config/env/_production.js', 'config/env/production.js');
		this.template('config/env/_test.js', 'config/env/test.js');
		this.template('config/env/_secure.js', 'config/env/secure.js');
	},

    renderCoreModuleFiles: function() {
		this.template('modules/core/client/views/_header.client.view.html',   
                      'modules/core/client/views/header.client.view.html');
	},

	renderApplicationDependenciesFiles: function() {
		this.template('root-assets/_package.json', 'package.json');
		this.template('root-assets/_bower.json', 'bower.json');
	}
});

module.exports = MeanGenerator;
