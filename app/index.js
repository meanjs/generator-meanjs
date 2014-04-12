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
		}];

		this.prompt(prompts, function(props) {
			this.appName = props.appName;
			this.appDescription = props.appDescription;
			this.appKeywords = props.appKeywords;
			this.appAuthor = props.appAuthor;
			this.addArticleExample = props.addArticleExample;

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

		// Copy base files
		this.copy('app/controllers/core.js');
		this.copy('app/controllers/users.js');
		this.copy('app/models/user.js');
		this.copy('app/routes/core.js');
		this.copy('app/routes/users.js');
		this.copy('app/tests/users.js');

		// Create public folders
		this.mkdir('public');
		this.mkdir('public/js');
		this.mkdir('public/modules');

		// Copy public folder content
		this.directory('public/css');
		this.directory('public/img');
		this.copy('public/js/application.js');

		// Copy public folder modules
		this.directory('public/modules/users');

		// Copy core module files
		this.directory('public/modules/core/config');
		this.directory('public/modules/core/tests');
		this.copy('public/modules/core/controllers/home.js');
		this.copy('public/modules/core/views/home.html');
		this.copy('public/modules/core/core.js');

		// Copy config folder
		this.mkdir('config');
		this.mkdir('config/env');

		// Copy config folder content
		this.directory('config/strategies')
		this.copy('config/config.js');
		this.copy('config/express.js');
		this.copy('config/passport.js');
		this.copy('config/utilities.js');

		// Copy project files
		this.copy('gruntfile.js');
		this.copy('server.js');
		this.copy('Procfile');
		this.copy('README.md');

		// Copy project hidden files
		this.copy('bowerrc', '.bowerrc');
		this.copy('jshintrc', '.jshintrc');
		this.copy('gitignore', '.gitignore');
		this.copy('slugignore', '.slugignore');
		this.copy('travis.yml', '.travis.yml');
	},

	renderArticleExample: function() {
		// Copy example files if desired
		if (this.addArticleExample) {
			// Copy Express files
			this.copy('app/controllers/articles.js');
			this.copy('app/models/article.js');
			this.copy('app/routes/articles.js');
			this.copy('app/tests/articles.js');

			// Copy AngularJS files
		 	this.directory('public/modules/articles'); 
		}
	},

	renderApplicationViewsFiles: function() {
		this.copy('app/views/404.html');
		this.copy('app/views/500.html');
		this.copy('app/views/index.html');

		this.template('app/views/_layout.html', 'app/views/layout.html');
	},

	renderApplicationEnvironmentConfigFiles: function() {
		this.template('config/env/_all.js', 'config/env/all.js');
		this.template('config/env/_development.js', 'config/env/development.js');
		this.template('config/env/_production.js', 'config/env/production.js');
		this.template('config/env/_test.js', 'config/env/test.js');
		this.template('config/env/_travis.js', 'config/env/travis.js');
	},

	renderAngularApplicationConfigFile: function() {
		this.template('public/js/_config.js', 'public/js/config.js');
	},

	renderCoreModuleFiles: function() {
		this.template('public/modules/core/views/_header.html', 'public/modules/core/views/header.html');
		this.template('public/modules/core/controllers/_header.js', 'public/modules/core/controllers/header.js');
	},

	renderApplicationDependenciesFiles: function() {
		this.template('_package.json', 'package.json');
		this.template('_bower.json', 'bower.json');
	},

	renderApplicationKarmaFile: function() {
		this.template('_karma.conf.js', 'karma.conf.js');
	}
});

module.exports = MeanGenerator;