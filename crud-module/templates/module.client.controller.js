'use strict';

// <%= capitalizedModuleName %> controller
angular.module('<%= moduleName %>').controller('<%= capitalizedModuleName %>Controller', ['$scope', '$stateParams', '$location', 'Authentication', '<%= capitalizedModuleName %>',
    function ($scope, $stateParams, $location, Authentication, <%= capitalizedModuleName %>) {
        $scope.authentication = Authentication;

        // Create new Article
        $scope.create = function (isValid) {
            
            //
            
        };

        // Remove existing Article
        $scope.remove = function (article) {
            
            //
            
        };

        // Update existing Article
        $scope.update = function (isValid) {
            
            //
            
        };

        // Find a list of <%= capitalizedModuleName %>
        $scope.find = function () {
            
            //
            
        };

        // Find existing Article
        $scope.findOne = function () {
            
            //
            
        };
    }
]);
