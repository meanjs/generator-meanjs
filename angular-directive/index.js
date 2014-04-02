'use strict';

var util = require('util'),
	yeoman = require('yeoman-generator');


var DirectiveGenerator = yeoman.generators.NamedBase.extend({
	askForModuleName: function() {
		var done = this.async();

		var prompts = [{
			name: 'moduleName',
			message: 'Which module does this directive belongs to?',
			default: 'core'
		}];

		this.prompt(prompts, function(props) {
			this.moduleName = props.moduleName;

			done();
		}.bind(this));
	},

	renderDirectiveFile: function() {
		this.template('_directive.js', 'public/modules/' + this._.slugify(this.moduleName) + '/directives/' + this._.slugify(this.name) + '.js')
	}
});

module.exports = DirectiveGenerator;