'use strict';

//Setting up route
angular.module('<%= dasherizedPluralName %>').config(['$stateProvider',
	function($stateProvider) {
		// <%= humanizedPluralName %> state routing
		$stateProvider.
		state('list<%= classifiedPluralName %>', {
			url: '/<%= dasherizedPluralName %>',
			templateUrl: 'modules/<%= dasherizedPluralName %>/views/list.html'
		}).
		state('create<%= classifiedSingularName %>', {
			url: '/<%= dasherizedPluralName %>/create',
			templateUrl: 'modules/<%= dasherizedPluralName %>/views/create.html'
		}).
		state('view<%= classifiedSingularName %>', {
			url: '/<%= dasherizedPluralName %>/:<%= camelizedSingularName %>Id',
			templateUrl: 'modules/<%= dasherizedPluralName %>/views/view.html'
		}).
		state('edit<%= classifiedSingularName %>', {
			url: '/<%= dasherizedPluralName %>/:<%= camelizedSingularName %>Id/edit',
			templateUrl: 'modules/<%= dasherizedPluralName %>/views/edit.html'
		});
	}
]);