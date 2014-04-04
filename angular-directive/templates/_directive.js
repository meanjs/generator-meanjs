'use strict';

angular.module('<%= dasherizedModuleName %>').directive('<%= camelizedName %>', [
	function() {
		return {
			template: '<div></div>',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
				// <%= humanizedName %> directive logic 
				// ...
				
				element.text('this is the <%= camelizedName %> directive');
			}
		};
	}
]);