'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');


var ModelGenerator = yeoman.generators.NamedBase.extend({
	createModelFile: function() {
		this.template('_model.js', 'app/models/' + this._.slugify(this.name) + '.js')
	}
});

module.exports = ModelGenerator;