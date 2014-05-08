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
		console.log(chalk.magenta('You\'re using the official MEAN.JS generator.'));
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
			message: 'How would you describe your application in comma seperated key words?',
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
			name: 'usePassport',
			message: 'Would you like to include user authentication with passport?',
			default: true
		}];

		this.prompt(prompts, function(props) {
			this.appName = props.appName;
			this.appDescription = props.appDescription;
			this.appKeywords = props.appKeywords;
			this.appAuthor = props.appAuthor;
			this.addArticleExample = props.addArticleExample;

			this.usePassport = props.usePassport;
			this.config.set({'usePassport': this.usePassport});

			this.slugifiedAppName = this._.slugify(this.appName);
			this.humanizedAppName = this._.humanize(this.appName);
			this.capitalizedAppAuthor = this._.capitalize(this.appAuthor);
			
			done();
		}.bind(this));
	},

	askForAngularApplicationModules: function() {
		var done = this.async();

		var prompts = [{
			type: 'checkbox',
			name: 'modules',
			message: 'Which AngularJS modules would you like to include?',
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
			}]
		}];

		this.prompt(prompts, function(props) {
			this.angularCookies = this._.contains(props.modules, 'angularCookies');
			this.angularAnimate = this._.contains(props.modules, 'angularAnimate');
			this.angularTouch = this._.contains(props.modules, 'angularTouch');
			this.angularSanitize = this._.contains(props.modules, 'angularSanitize');

			done();
		}.bind(this));
	},

	copyApplicationFolder: function() {
		// Copy application folder
		this.mkdir('app');
		this.mkdir('app/controllers');
		this.mkdir('app/models');
		this.mkdir('app/routes');
		this.mkdir('app/tests');
		this.mkdir('app/views');

		this.copy('app/views/404.server.view.html');
		this.copy('app/views/500.server.view.html');
		this.copy('app/views/index.server.view.html');
		this.template('app/views/_layout.server.view.html', 'app/views/layout.server.view.html');

		// Copy base files
		this.template('app/controllers/_core.server.controller.js', 'app/controllers/core.server.controller.js');
		this.copy('app/routes/core.server.routes.js');
		if (this.usePassport) {
			this.copy('app/controllers/users.server.controller.js');
			this.copy('app/models/user.server.model.js');
			this.copy('app/routes/users.server.routes.js');
			this.copy('app/tests/user.server.model.test.js');
		}

		// Create public folders
		this.mkdir('public');
		this.mkdir('public/modules');

		// Copy public folder content
		this.copy('public/application.js');

		// Copy public folder modules
		if (this.usePassport) {
			this.directory('public/modules/users');
		}

		// Copy core module files
		this.directory('public/modules/core/config');
		this.directory('public/modules/core/controllers');
		this.directory('public/modules/core/css');
		this.directory('public/modules/core/img');
		this.directory('public/modules/core/services');
		this.directory('public/modules/core/tests');
		this.copy('public/modules/core/views/home.client.view.html');
		this.copy('public/modules/core/core.client.module.js');

		// Copy config folder
		this.mkdir('config');
		this.mkdir('config/env');

		// Copy config folder content
		if (this.usePassport) {
			this.directory('config/strategies');
			this.copy('config/passport.js');
		}
		this.template('config/_express.js', 'config/express.js');
		this.copy('config/config.js');
		this.copy('config/init.js');

		// Copy project files
		this.copy('karma.conf.js');
		this.copy('gruntfile.js');
		this.template('_server.js', 'server.js');
		this.copy('Procfile');
		this.copy('README.md');
		this.copy('LICENSE.md');

		// Copy project hidden files
		this.copy('bowerrc', '.bowerrc');
		this.copy('csslintrc', '.csslintrc');
		this.copy('jshintrc', '.jshintrc');
		this.copy('gitignore', '.gitignore');
		this.copy('slugignore', '.slugignore');
		this.copy('travis.yml', '.travis.yml');
	},

	renderArticleExample: function() {
		// Copy example files if desired
		if (this.addArticleExample) {
			// Copy Express files
			this.template('app/controllers/_articles.server.controller.js', 'app/controllers/articles.server.controller.js');
			this.template('app/models/_article.server.model.js','app/models/article.server.model.js');
			this.template('app/routes/_articles.server.routes.js', 'app/routes/articles.server.routes.js');
			this.template('app/tests/_article.server.model.test.js', 'app/tests/article.server.model.test.js');

			// Copy AngularJS files
			this.directory('public/modules/articles/config');
			this.directory('public/modules/articles/services');
			this.directory('public/modules/articles/tests');

			this.mkdir('public/modules/articles/views');
			this.copy('public/modules/articles/views/create-article.client.view.html');
			this.copy('public/modules/articles/views/edit-article.client.view.html');
			this.copy('public/modules/articles/views/list-articles.client.view.html');
			this.template('public/modules/articles/views/_view-article.client.view.html', 'public/modules/articles/views/view-article.client.view.html');

			this.copy('public/modules/articles/articles.client.module.js');

			this.mkdir('public/modules/articles/controllers');
			this.template('public/modules/articles/controllers/_articles.client.controller.js', 'public/modules/articles/controllers/articles.client.controller.js');
		}
	},

	renderApplicationEnvironmentConfigFiles: function() {
		this.template('config/env/_all.js', 'config/env/all.js');
		this.template('config/env/_development.js', 'config/env/development.js');
		this.template('config/env/_production.js', 'config/env/production.js');
		this.template('config/env/_test.js', 'config/env/test.js');
	},

	renderAngularApplicationConfigFile: function() {
		this.template('public/_config.js', 'public/config.js');
	},

	renderCoreModuleFiles: function() {
		this.template('public/modules/core/views/_header.client.view.html', 'public/modules/core/views/header.client.view.html');
	},

	renderApplicationDependenciesFiles: function() {
		this.template('_package.json', 'package.json');
		this.template('_bower.json', 'bower.json');
	}
});

module.exports = MeanGenerator;