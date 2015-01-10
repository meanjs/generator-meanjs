'use strict';

angular.module('<%= slugifiedModuleName %>').directive('<%= camelizedNgDirectiveName %>', [
	function() {
		return {
			template: '<div></div>',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
				// <%= humanizedNgDirectiveName %> directive logic
				// ...

				element.text('this is the <%= camelizedNgDirectiveName %> directive');
			}
		};
	}
]);