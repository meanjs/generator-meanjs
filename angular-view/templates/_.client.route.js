$stateProvider.
		state('<%= slugifiedViewName %>', {
			url: '/<%= slugifiedRoutePath %>',
			templateUrl: 'modules/<%= slugifiedModuleName %>/views/<%= slugifiedViewName %>.client.view.html'
		}).