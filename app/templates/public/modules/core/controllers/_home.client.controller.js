'use strict';

angular.module('core').controller('HomeController', ['$scope', <% if (usePassport) { %>'Authentication', <% } %>
	function ($scope<% if (usePassport) { %>, Authentication<% } %>) {
<% if (usePassport) { %>    $scope.authentication = Authentication;
<% } %>}]);