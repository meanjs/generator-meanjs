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
			this.slugifiedModuleName = this._.slugify(this.moduleName);

			this.slugifiedControllerName = this._.slugify(this.name);
			this.classifiedControllerName = this._.classify(this.slugifiedControllerName);
			this.humanizedControllerName = this._.humanize(this.slugifiedControllerName);

			done();
		}.bind(this));
	},

	renderTestFile: function() {
		var controllerFilePath = process.cwd() + '/public/modules/' + this.slugifiedModuleName + '/controllers/' + this.slugifiedControllerName + '.js';
		
		// If controller file exists we create a test for it otherwise we raise error
		if (fs.existsSync(controllerFilePath)) {
			this.template('_tests.spec.js', 'public/modules/' + this.slugifiedModuleName + '/tests/' + this.slugifiedControllerName + '.spec.js')
		} else {
			throw new Error(this.humanizedControllerName + ' controller does not exists in the ' + this.slugifiedModuleName + ' module folder');
		}
	}
});

module.exports = TestGenerator;