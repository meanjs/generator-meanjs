'use strict';
var fs = require('fs'),
	path = require('path');

module.exports = {
	/* Trust but Verify the user is in the root of the project directory */
	constructListOfModuleChoices: function (modulesPath) {
		try {
			var files = fs.readdirSync(modulesPath); 
		} catch (e) {
			console.error('\nThe "modules" directory was not found.\n');
			return null;
		}
		
		var choices = files.filter(function(file){
			return !fs.statSync(path.join(modulesPath, file)).isFile();
		}).map(function(file) {
			var choice = {
				value: file,
				name: file
			};
			return choice;
		});
		choices.unshift({
			type: 'separator',
			toString: function() {
				return '------';
			}
		});
		choices.unshift({
			name: 'create new module',
			value: null
		});
		
		return choices;
	}
};