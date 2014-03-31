'use strict';

angular.module('<%= _.slugify(moduleName) %>').directive('<%= _.camelize(_.slugify(name)) %>', [
	function() {
		return {
			template: '<div></div>',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
				element.text('this is the <%= _.camelize(_.slugify(name)) %> directive');
			}
		};
	}
]);