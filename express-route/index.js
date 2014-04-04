'use strict';
var util = require('util'),
	yeoman = require('yeoman-generator');


var RouteGenerator = yeoman.generators.NamedBase.extend({
	createRouteFile: function() {
		this.dasherizedName = this._.slugify(this.name);

		this.template('_route.js', 'app/routes/' + dasherizedName + '.js')
	}
});

module.exports = RouteGenerator;