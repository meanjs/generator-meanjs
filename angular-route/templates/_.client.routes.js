'use strict';

//Setting up route
angular.module('<%= slugifiedModuleName %>').config(['$stateProvider',
	function($stateProvider) {
		// <%= humanizedModuleName %> state routing
		$stateProvider.
		state('<%= slugifiedNgRouteName %>', {
			url: '/<%= slugifiedNgRoutePath %>',
			templateUrl: 'modules/<%= slugifiedModuleName %>/views/<%= slugifiedNgViewName %>.client.view.html'
		});
	}
]);