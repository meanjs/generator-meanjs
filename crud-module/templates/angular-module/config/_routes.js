'use strict';

//Setting up route
angular.module('<%= slugifiedPluralName %>').config(['$stateProvider',
	function($stateProvider) {
		// <%= humanizedPluralName %> state routing
		$stateProvider.
		state('list<%= classifiedPluralName %>', {
			url: '/<%= slugifiedPluralName %>',
			templateUrl: 'modules/<%= slugifiedPluralName %>/views/list.html'
		}).
		state('create<%= classifiedSingularName %>', {
			url: '/<%= slugifiedPluralName %>/create',
			templateUrl: 'modules/<%= slugifiedPluralName %>/views/create.html'
		}).
		state('view<%= classifiedSingularName %>', {
			url: '/<%= slugifiedPluralName %>/:<%= camelizedSingularName %>Id',
			templateUrl: 'modules/<%= slugifiedPluralName %>/views/view.html'
		}).
		state('edit<%= classifiedSingularName %>', {
			url: '/<%= slugifiedPluralName %>/:<%= camelizedSingularName %>Id/edit',
			templateUrl: 'modules/<%= slugifiedPluralName %>/views/edit.html'
		});
	}
]);