$stateProvider.
		state('<%= stateName %>', {
			url: '/<%= slugifiedRoutePath %>',
			templateUrl: 'modules/<%= slugifiedModuleName %>/views/<%= slugifiedViewName %>.client.view.html'
		}).
