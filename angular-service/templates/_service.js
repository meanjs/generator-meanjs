'use strict';

angular.module('<%= dasherizedModuleName %>').factory('<%= classifiedName %>', [
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