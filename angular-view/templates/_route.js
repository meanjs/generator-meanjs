$stateProvider.
		state('<%= _.slugify(name) %>', {
			url: '/<%= _.slugify(routePath) %>',
			templateUrl: 'modules/<%= _.slugify(moduleName) %>/views/<%= _.slugify(name) %>.html'
		}).