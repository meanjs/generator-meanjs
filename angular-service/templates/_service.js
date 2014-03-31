'use strict';

angular.module('<%= _.slugify(moduleName) %>').factory('<%= _.classify(_.slugify(name)) %>', [
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