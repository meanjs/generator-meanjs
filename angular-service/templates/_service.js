'use strict';

angular.module('<%= slugifiedModuleName %>').factory('<%= classifiedName %>', [
	function() {
		// Service Logic 
		// ...

		// Public API
		return {
			someMethod: function() {
				return true;
			}
		};
	}
]);