'use strict';

//Setting up route
angular.module('<%= slugifiedModuleName %>').config(['$stateProvider',
	function($stateProvider) {
		// <%= humanizedModuleName %> state routing
		$stateProvider.
		state('<%= slugifiedName %>', {
			url: '/<%= slugifiedRoutePath %>',
			templateUrl: 'modules/<%= slugifiedModuleName %>/views/<%= slugifiedName %>.html'
		});
	}
]);