'use strict';

//Setting up route
angular.module('bootstraptests').config(['$stateProvider',
	function($stateProvider) {
		// Bootstraptests state routing
		$stateProvider.
		state('listBootstraptests', {
			url: '/bootstrap/css',
			templateUrl: 'modules/bootstraptests/views/css-bootstraps.client.view.html'
		}).
		state('createBootstraptest', {
			url: '/bootstrap/components',
			templateUrl: 'modules/bootstraptests/views/components-bootstrap.client.view.html'
		});
	}
]);