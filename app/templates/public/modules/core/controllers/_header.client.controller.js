'use strict';

angular.module('core').controller('HeaderController', ['$scope', <%if (usePassport) { %>'Authentication', <% } %>'Menus',
	function($scope, <%if (usePassport) { %>'Authentication, <% } %>Menus) {
<%if (usePassport) { %>'		$scope.authentication = Authentication;
<% } %>		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};
	}
]);