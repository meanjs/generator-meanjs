'use strict';
var fs = require('fs'),
	path = require('path');

module.exports = {
	/* Trust but Verify the user is in the root of the project directory */
	constructListOfModuleChoices: function (entityName) {
		var modulesPath = './modules';
		
		try {
			var files = fs.readdirSync(modulesPath); 
		} catch (e) {
			console.error('\nThe "modules" directory was not found.\n');
			return null;
		}
		
		var directories = files.filter(function(file){
			return !fs.statSync(path.join(modulesPath, file)).isFile();
		});
		var choices = directories.map(function(file) {
			var choice = {
				value: file,
				name: file
			};
			return choice;
		});
		
		/* 
			Go through the modules and see if the name of the entity being created
			matches an existing module. If so, do not offer the option to create a new module.
		*/
		var modulesMatchingCreationEntity = directories.filter(function(dir) {
			return dir === entityName;
		});
		
		if (modulesMatchingCreationEntity.length === 0) {
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
		}
		
		return choices;
	}
};