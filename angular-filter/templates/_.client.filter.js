'use strict';

angular.module('<%= slugifiedModuleName %>').filter('<%= camelizedName %>', [
	function() {
		return function(input) {
			// <%= humanizedName %> directive logic
			// ...

			return '<%= camelizedName %> filter: ' + input;
		};
	}
]);
