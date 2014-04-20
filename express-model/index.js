'use strict';
var util = require('util'),
	inflections = require('underscore.inflections'),
	yeoman = require('yeoman-generator');


var ModelGenerator = yeoman.generators.NamedBase.extend({
	createModelFile: function () {
        // Set model names
        this.slugifiedModelName = this._.slugify(this._.humanize(this.name));
        this.classifiedModelName = this._.classify(this.slugifiedModelName);
        this.humanizedModelName = this._.humanize(this.slugifiedModelName);
        this.camelizedModelName = this._.camelize(this.slugifiedModelName);

        this.slugifiedPluralModelName = inflections.pluralize(this.slugifiedModelName);

        this.usePassport = this.config.get('usePassport');

        // We create the model file
        this.template('_model.js', 'app/models/' + this.slugifiedModelName + '.js');
        // We create the test file for the models
        this.template('_tests.js', 'app/tests/' + this.slugifiedPluralModelName + '.js');
      }
});

module.exports = ModelGenerator;