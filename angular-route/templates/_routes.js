'use strict';

//Setting up route
angular.module('<%= dasherizedModuleName %>').config(['$stateProvider',
	function($stateProvider) {
		// <%= humanizedModuleName %> state routing
		$stateProvider.
		state('<%= dasherizedName %>', {
			url: '/<%= dasherizedRoutePath %>',
			templateUrl: 'modules/<%= dasherizedModuleName %>/views/<%= dasherizedViewName %>.html'
		});
	}
]);