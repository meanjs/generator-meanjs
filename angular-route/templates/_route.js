$stateProvider.
		state('<%= dasherizedName %>', {
			url: '/<%= dasherizedRoutePath %>',
			templateUrl: 'modules/<%= dasherizedModuleName %>/views/<%= dasherizedViewName %>.html'
		}).