'use strict';
var util = require('util'),
	inflections = require('underscore.inflections'),
	yeoman = require('yeoman-generator');


var ControllerGenerator = yeoman.generators.NamedBase.extend({
	createControllerFile: function() {
		this.slugifiedName = this._.slugify(this.name);
		this.slugifiedPluralName = inflections.pluralize(this.slugifiedName);

		this.humanizedName = this._.humanize(this.slugifiedName);
		this.humanizedPluralName = this._.humanize(this.slugifiedPluralName);

		this.template('_controller.js', 'app/controllers/' + this.slugifiedName + '.js')
	}
});

module.exports = ControllerGenerator;