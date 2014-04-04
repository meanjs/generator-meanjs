'use strict';

var util = require('util'),
	fs = require('fs'),
	yeoman = require('yeoman-generator');


var TestGenerator = yeoman.generators.NamedBase.extend({
	askForModuleName: function() {
		var done = this.async();

		var prompts = [{
			name: 'moduleName',
			message: 'Which module does this test belongs to?',
			default: 'core'
		}];

		this.prompt(prompts, function(props) {
			this.moduleName = props.moduleName;
			this.dasherizedModuleName = this._.dasherize(this.moduleName);

			this.dasherizedControllerName = this._.dasherize(this.name);
			this.classifiedControllerName = this._.classify(this.dasherizedControllerName);
			this.humanizedControllerName = this._.humanize(this.dasherizedControllerName);

			done();
		}.bind(this));
	},

	renderTestFile: function() {
		var controllerFilePath = process.cwd() + '/public/modules/' + this.dasherizedModuleName + '/controllers/' + this.dasherizedControllerName + '.js';
		
		// If controller file exists we create a test for it otherwise we will first create a controller
		if (!fs.existsSync(controllerFilePath)) {
			this.template('_controller.js', 'public/modules/' + this.dasherizedModuleName + '/controllers/' + this.dasherizedControllerName + '.js')
		}

		this.template('_tests.spec.js', 'public/modules/' + this.dasherizedModuleName + '/tests/' + this.dasherizedControllerName + '.spec.js')
	}
});

module.exports = TestGenerator;