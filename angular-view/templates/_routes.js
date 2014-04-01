'use strict';

//Setting up route
angular.module('<%= _.slugify(moduleName) %>').config(['$stateProvider',
	function($stateProvider) {
		// <%= _.classify(moduleName) %> state routing
		$stateProvider.
		state('<%= _.slugify(name) %>', {
			url: '/<%= _.slugify(routePath) %>',
			templateUrl: 'modules/<%= _.slugify(moduleName) %>/views/<%= _.slugify(name) %>.html'
		});
	}
]);