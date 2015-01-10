'use strict';

angular.module('<%= slugifiedModuleName %>').factory('<%= classifiedNgServiceName %>', [
	function() {
		// <%= humanizedNgServiceName %> service logic
		// ...

		// Public API
		return {
			someMethod: function() {
				return true;
			}
		};
	}
]);