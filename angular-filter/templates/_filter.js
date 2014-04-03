'use strict';

angular.module('<%= slugifiedModuleName %>').filter('<%= camelizedName %>', [function() {
	return function(input) {
		return '<%= camelizedName %> filter: ' + input;
	};
}]);