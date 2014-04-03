'use strict';
var util = require('util'),
	inflections = require('underscore.inflections'),
	yeoman = require('yeoman-generator');


var ModelGenerator = yeoman.generators.NamedBase.extend({
	createModelFile: function() {
		this.slugifiedName = this._.slugify(this.name);
		this.classifiedName = this._.classify(this.slugifiedName);

		this.template('_model.js', 'app/models/' + this._.slugify(this.name) + '.js')
	}
});

module.exports = ModelGenerator;