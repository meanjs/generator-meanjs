'use strict';

angular.module('<%= slugifiedModuleName %>').filter('<%= camelizedName %>', [
<<<<<<< HEAD
	function() {
		return function(input) {
			// <%= humanizedName %> directive logic
			// ...

			return '<%= camelizedName %> filter: ' + input;
		};
	}
=======

    function() {
        return function(input) {
            // <%= humanizedName %> directive logic 
            // ...

            return '<%= camelizedName %> filter: ' + input;
        };
    }
>>>>>>> pr/21
]);
