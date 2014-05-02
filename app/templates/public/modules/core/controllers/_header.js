'use strict';

<% if (usePassport) { %>
angular.module('core').controller('HeaderController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		$scope.authentication = Authentication;<% } else { %>
angular.module('core').controller('HeaderController', ['$scope',
	function($scope) {
		<% } %>
		$scope.isCollapsed = false;

		$scope.menu = [<% if(addArticleExample) { %>{
			title: 'Articles',
			link: 'articles',
			uiRoute: '/articles'
		}, {
			title: 'New Article',
			link: 'articles/create',
			uiRoute: '/articles/create'
		}<% } %>];

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};
	}
]);