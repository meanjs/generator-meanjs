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
			this.slugifiedModuleName = this._.slugify(this.moduleName);
			
			this.slugifiedName = this._.slugify(this._.humanize(this.name));
			this.camelizedName = this._.camelize(this.slugifiedName);
			this.humanizedName = this._.humanize(this.slugifiedName);
			
			done();
		}.bind(this));
	},

	renderDirectiveFile: function() {
		this.template('_directive.js', 'public/modules/' + this.slugifiedModuleName + '/directives/' + this.slugifiedName + '.js')
	}
});

module.exports = DirectiveGenerator;