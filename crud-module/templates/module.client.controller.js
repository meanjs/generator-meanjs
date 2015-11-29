'use strict';

// <%= capitalizedModuleName %> controller
angular.module('<%= pluralModuleName %>').controller('<%= capitalizedModuleName %>Controller', ['$scope', '$stateParams', '$location', 'Authentication', '<%= capitalizedModuleName %>',
    function ($scope, $stateParams, $location, Authentication, <%= capitalizedModuleName %>) {
        $scope.authentication = Authentication;

    // Create new <%= moduleName %>
    $scope.create = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', '<%= moduleName %>Form');

        return false;
      }

      // Create new <%= moduleName %> object
      var <%= moduleName %> = new <%= capitalizedModuleName %>({
        title: this.title,
        content: this.content
      });

      // Redirect after save
      <%= moduleName %>.$save(function (response) {
        $location.path('<%= pluralModuleName %>/' + response._id);

        // Clear form fields
        $scope.title = '';
        $scope.content = '';
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Remove existing <%= moduleName %>
    $scope.remove = function (<%= moduleName %>) {
      if (<%= moduleName %>) {
        <%= moduleName %>.$remove();

        for (var i in $scope.<%= moduleName %>) {
          if ($scope.<%= moduleName %>[i] === <%= moduleName %>) {
            $scope.<%= moduleName %>.splice(i, 1);
          }
        }
      } else {
        $scope.<%= moduleName %>.$remove(function () {
          $location.path('<%= pluralModuleName %>');
        });
      }
    };

    // Update existing <%= moduleName %>
    $scope.update = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', '<%= moduleName %>Form');

        return false;
      }

      var <%= moduleName %> = $scope.<%= moduleName %>;

      <%= moduleName %>.$update(function () {
        $location.path('<%= pluralModuleName %>/' + <%= moduleName %>._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Find a list of <%= moduleName %>s
    $scope.find = function () {
      $scope.<%= pluralModuleName %> = <%= capitalizedModuleName %>.query();
    };

    // Find existing <%= moduleName %>
    $scope.findOne = function () {
      $scope.<%= moduleName %> = <%= capitalizedModuleName %>.get({
        <%= moduleName %>Id: $stateParams.<%= moduleName %>Id
      });
    };
  }
]);
