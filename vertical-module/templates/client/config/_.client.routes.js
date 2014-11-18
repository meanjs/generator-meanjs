'use strict';

//Setting up route
angular.module('<%= slugifiedPluralName %>').config(['$stateProvider',
	function($stateProvider) {
		// <%= humanizedPluralName %> state routing
		$stateProvider.
		state('<%= slugifiedPluralName %>', {
			abstract: true,
			url: '/<%= slugifiedPluralName %>',
			template: '<ui-view/>'
		}).
		state('<%= slugifiedPluralName %>.list', {
			url: '',
			templateUrl: 'modules/<%= slugifiedPluralName %>/views/list-<%= slugifiedPluralName %>.client.view.html'
		}).
		state('<%= slugifiedPluralName %>.create', {
			url: '/create',
			templateUrl: 'modules/<%= slugifiedPluralName %>/views/create-<%= slugifiedSingularName %>.client.view.html'
		}).
		state('<%= slugifiedPluralName %>.view', {
			url: '/:<%= camelizedSingularName %>Id',
			templateUrl: 'modules/<%= slugifiedPluralName %>/views/view-<%= slugifiedSingularName %>.client.view.html'
		}).
		state('<%= slugifiedPluralName %>.edit', {
			url: '/:<%= camelizedSingularName %>Id/edit',
			templateUrl: 'modules/<%= slugifiedPluralName %>/views/edit-<%= slugifiedSingularName %>.client.view.html'
		});
	}
]);