'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');


var RouteGenerator = yeoman.generators.NamedBase.extend({
	createRouteFile: function() {
		this._.mixin(require('underscore.inflections'));
		this.template('_route.js', 'app/routes/' + this._.slugify(this.name) + '.js')
	}
});

module.exports = RouteGenerator;