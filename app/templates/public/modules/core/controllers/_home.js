'use strict';
<% if (usePassport) { %>
angular.module('core').controller('HomeController', ['$scope', 'Authentication', function ($scope, Authentication) {
    $scope.authentication = Authentication;
}]);<% } else { %>
angular.module('core').controller('HomeController', ['$scope', function ($scope) {
}]);
<% } %>