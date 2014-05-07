'use strict';

var util = require('util'),
	inflections = require('underscore.inflections'),
	fs = require('fs'),
	yeoman = require('yeoman-generator');


var TestGenerator = yeoman.generators.NamedBase.extend({
	renderTestFile: function() {
		// Set model names
		this.slugifiedModelName = this._.slugify(this._.humanize(this.name));
		this.classifiedModelName = this._.classify(this.slugifiedModelName);
		this.humanizedModelName = this._.humanize(this.slugifiedModelName);
		this.camelizedModelName = this._.camelize(this.slugifiedModelName);

		this.slugifiedPluralModelName = inflections.pluralize(this.slugifiedModelName);

        this.usePassport = this.config.get('usePassport');

		var modelFilePath = process.cwd() + '/app/models/' + this.slugifiedModelName + '.server.model.js';

		// If model file exists we create a test for it otherwise we will first create a model
		if (!fs.existsSync(modelFilePath)) {
			this.template('_.server.model.js', 'app/models/' + this.slugifiedModelName + '.server.model.js')
		}

		this.template('_.server.model.test.js', 'app/tests/' + this.slugifiedModelName + '.server.model.test.js')
	}
});

module.exports = TestGenerator;