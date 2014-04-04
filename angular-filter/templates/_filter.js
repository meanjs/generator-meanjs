'use strict';

angular.module('<%= dasherizedModuleName %>').filter('<%= camelizedName %>', [
	function() {
		return function(input) {
			// <%= humanizedName %> directive logic 
			// ...

			return '<%= camelizedName %> filter: ' + input;
		};
	}
]);