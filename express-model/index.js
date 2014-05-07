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
        this.template('_.server.model.js', 'app/models/' + this.slugifiedModelName + '.server.model.js');
        // We create the test file for the models
        this.template('_.server.model.test.js', 'app/tests/' + this.slugifiedModelName + '.server.model.test.js');
      }
});

module.exports = ModelGenerator;