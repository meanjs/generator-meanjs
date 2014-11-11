'use strict';

// Setting up route
angular.module('<%= camelizedPluralName %>').config(['$stateProvider',
	function($stateProvider) {
		// Articles state routing
		$stateProvider.
		state('<%= camelizedPluralName %>', {
			abstract: true,
			url: '/<%= camelizedPluralName %>',
			template: '<ui-view/>'
		}).
		state('<%= camelizedPluralName %>.list', {
			url: '',
			templateUrl: 'modules/<%= camelizedPluralName %>/views/list-<%= camelizedPluralName %>.client.view.html'
		}).
		state('<%= camelizedPluralName %>.create', {
			url: '/create',
			templateUrl: 'modules/<%= camelizedPluralName %>/views/create-article.client.view.html'
		}).
		state('<%= camelizedPluralName %>.view', {
			url: '/:articleId',
			templateUrl: 'modules/<%= camelizedPluralName %>/views/view-article.client.view.html'
		}).
		state('<%= camelizedPluralName %>.edit', {
			url: '/:articleId/edit',
			templateUrl: 'modules/<%= camelizedPluralName %>/views/edit-article.client.view.html'
		});
	}
]);
