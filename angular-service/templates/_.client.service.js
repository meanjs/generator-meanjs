'use strict';

angular.module('<%= slugifiedModuleName %>').factory('<%= classifiedName %>', [
	function() {
		// <%= humanizedName %> service logic
		// ...

		// Public API
		return {
			someMethod: function() {
				return true;
			}
		};
	}
]);
