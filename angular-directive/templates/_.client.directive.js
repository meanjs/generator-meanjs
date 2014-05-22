'use strict';

angular.module('<%= slugifiedModuleName %>').directive('<%= camelizedName %>', [
<<<<<<< HEAD
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
=======

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
>>>>>>> pr/21
]);
