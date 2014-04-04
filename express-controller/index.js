'use strict';
var util = require('util'),
	inflections = require('underscore.inflections'),
	yeoman = require('yeoman-generator');


var ControllerGenerator = yeoman.generators.NamedBase.extend({
	createControllerFile: function() {
		this.dasherizedName = this._.slugify(this.name);
		this.dasherizedPluralName = inflections.pluralize(this.dasherizedName);

		this.humanizedName = this._.humanize(this.dasherizedName);
		this.humanizedPluralName = this._.humanize(this.dasherizedPluralName);

		this.template('_controller.js', 'app/controllers/' + this.dasherizedName + '.js')
	}
});

module.exports = ControllerGenerator;