'use strict';
var util = require('util'),
	yeoman = require('yeoman-generator');


var RouteGenerator = yeoman.generators.NamedBase.extend({
	createRouteFile: function() {
		this.slugifiedName = this._.slugify(this._.humanize(this.name));

		this.template('_route.js', 'app/routes/' + this.slugifiedName + '.js')
	}
});

module.exports = RouteGenerator;