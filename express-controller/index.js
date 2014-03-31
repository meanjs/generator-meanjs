'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');


var ControllerGenerator = yeoman.generators.NamedBase.extend({
	createControllerFile: function() {
		this._.mixin(require('underscore.inflections'));
		this.template('_controller.js', 'app/controllers/' + this._.slugify(this.name) + '.js')
	}
});

module.exports = ControllerGenerator;