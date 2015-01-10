'use strict';

var util = require('util'),
	fs = require('fs'),
	yeoman = require('yeoman-generator'),
	modulesHelper = require('../utilities/modules.helper');


var TestGenerator = yeoman.generators.NamedBase.extend({
	init: function() {
		this.slugifiedNgTestName = this._.slugify(this._.humanize(this.name));
		
		this.availableModuleChoices = modulesHelper.constructListOfModuleChoices(this.slugifiedNgTestName);
		if (this.availableModuleChoices == null)
			this.env.error('No modules found!');
	},
	askForModuleName: function() {
		var done = this.async();

		var prompts = [{
			type: 'list',
			name: 'moduleName',
			default: 'core',
			message: 'Which module does this test belongs to?',
			choices: this.availableModuleChoices
		}];

		this.prompt(prompts, function(props) {
			this.moduleName = props.moduleName;
			this.slugifiedModuleName = this._.slugify(this.moduleName);
			
			done();
		}.bind(this));
	},
	askForTestType: function() {
		var done = this.async();

		var prompts = [{
			type: 'list',
			name: 'testType',
			default: 'controller',
			message: 'Specify the desired test type',
			choices: ['controller', 'service', 'filter']
		}];

		this.prompt(prompts, function(props) {
			this.testType = props.testType;
			done();
		}.bind(this));
	},
	setViewTemplateVariables: function() {
		/* Variables set in this method should be only those variables exclusively used inside the correlated templates */
		switch(this.testType) {
			case 'controller': {
				this.slugifiedNgControllerName = this.slugifiedNgTestName;
				this.classifiedNgControllerName = this._.classify(this.slugifiedNgControllerName);
				this.humanizedNgControllerName = this._.humanize(this.slugifiedNgControllerName);
			}
			case 'service':
			case 'filter':
			default: {
			}
		}
	},
	
	renderTest: function() {
		switch(this.testType) {
			case 'controller': {
				var controllerFilePath = 'modules/' + this.slugifiedModuleName + '/client/controllers/' 
					+ this.slugifiedControllerName + '.client.controller.js';

				// If controller file exists we create a test for it otherwise we will first create a controller
				if (!fs.existsSync(controllerFilePath)) {
					this.template('_.client.controller.js', 'modules/'
						+ this.slugifiedModuleName + '/client/controllers/' 
						+ this.slugifiedNgControllerName + '.client.controller.js')
				}

				this.template('_.client.controller.test.js', 'modules/' 
					+ this.slugifiedModuleName + '/client/tests/' 
					+ this.slugifiedNgControllerName + '.client.controller.test.js')
				break;
			}
			case 'service':
			case 'filter':
			default: {
				console.log('Generating tests for test-type "' + this.testType + '" is not supported at this time...');
			}
		}
	}
});

module.exports = TestGenerator;