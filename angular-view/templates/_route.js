$stateProvider.
		state('<%= dasherizedName %>', {
			url: '/<%= dasherizedRoutePath %>',
			templateUrl: 'modules/<%= dasherizedModuleName %>/views/<%= dasherizedName %>.html'
		}).