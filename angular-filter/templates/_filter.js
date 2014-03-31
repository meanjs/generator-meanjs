'use strict';

angular.module('<%= _.slugify(moduleName) %>').filter('<%= _.camelize(_.slugify(name))', [function() {
	return function(input) {
		return '<%= _.camelize(_.slugify(name)) filter: ' + input;
	};
}]);