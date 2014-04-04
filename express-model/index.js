'use strict';
var util = require('util'),
	inflections = require('underscore.inflections'),
	yeoman = require('yeoman-generator');


var ModelGenerator = yeoman.generators.NamedBase.extend({
	createModelFile: function() {
		this.dasherizedName = this._.slugify(this.name);
		this.classifiedName = this._.classify(this.dasherizedName);

		this.template('_model.js', 'app/models/' + this.dasherizedName + '.js')
	}
});

module.exports = ModelGenerator;