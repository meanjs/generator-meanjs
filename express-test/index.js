'use strict';

var util = require('util'),
	inflections = require('underscore.inflections'),
	fs = require('fs'),
	yeoman = require('yeoman-generator');


var TestGenerator = yeoman.generators.NamedBase.extend({
	renderTestFile: function() {
		// Set model names
		this.dasherizedModelName = this._.dasherize(this.name);
		this.classifiedModelName = this._.classify(this.dasherizedModelName);
		this.humanizedModelName = this._.humanize(this.dasherizedModelName);
		this.camelizedModelName = this._.camelize(this.dasherizedModelName);

		this.dasherizedPluralModelName = inflections.pluralize(this.dasherizedModelName);

		var modelFilePath = process.cwd() + '/app/models/' + this.dasherizedModelName + '.js';

		// If model file exists we create a test for it otherwise we will first create a model
		if (!fs.existsSync(modelFilePath)) {
			this.template('_model.js', 'app/models/' + this.dasherizedModelName + '.js')
		}

		this.template('_tests.js', 'app/tests/' + this.dasherizedPluralModelName + '.js')
	}
});

module.exports = TestGenerator;