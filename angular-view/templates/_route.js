$stateProvider.
		state('<%= slugifiedName %>', {
			url: '/<%= slugifiedRoutePath %>',
			templateUrl: 'modules/<%= slugifiedModuleName %>/views/<%= slugifiedName %>.html'
		}).