'use strict';

// <%= humanizedPluralName %> controller
angular.module('<%= dasherizedPluralName %>').controller('<%= classifiedPluralName %>Controller', ['$scope', '$stateParams', '$location', 'Authentication', '<%= classifiedPluralName %>',
    function($scope, $stateParams, $location, Authentication, <%= classifiedPluralName %>) {
        $scope.authentication = Authentication;

        // Create new <%= humanizedSingularName %>
        $scope.create = function() {
        	// Create new <%= humanizedSingularName %> object
            var <%= camelizedSingularName %> = new <%= classifiedPluralName %>({
                name: this.name
            });

            // Redirect after save
            <%= camelizedSingularName %>.$save(function(response) {
                $location.path('<%= dasherizedPluralName %>/' + response._id);
            });

            // Clear form fields
            this.name = '';
        };

        // Remove existing <%= humanizedSingularName %>
        $scope.remove = function(<%= camelizedSingularName %>) {
            if (<%= camelizedSingularName %>) {
                <%= camelizedSingularName %>.$remove();

                for (var i in $scope.<%= camelizedPluralName %>) {
                    if ($scope.<%= camelizedPluralName %>[i] === <%= camelizedSingularName %>) {
                        $scope.<%= camelizedPluralName %>.splice(i, 1);
                    }
                }
            } else {
                $scope.<%= camelizedSingularName %>.$remove(function() {
                    $location.path('<%= dasherizedPluralName %>');
                });
            }
        };

        // Update existing <%= humanizedSingularName %>
        $scope.update = function() {
            var <%= camelizedSingularName %> = $scope.<%= camelizedSingularName %>;

            <%= camelizedSingularName %>.$update(function() {
                $location.path('<%= dasherizedPluralName %>/' + <%= camelizedSingularName %>._id);
            });
        };

        // Find a list of <%= humanizedPluralName %>
        $scope.find = function() {
            <%= classifiedPluralName %>.query(function(<%= camelizedPluralName %>) {
                $scope.<%= camelizedPluralName %> = <%= camelizedPluralName %>;
            });
        };

        // Find existing <%= humanizedSingularName %>
        $scope.findOne = function() {
            <%= classifiedPluralName %>.get({
                <%= camelizedSingularName %>Id: $stateParams.<%= camelizedSingularName %>Id
            }, function(<%= camelizedSingularName %>) {
                $scope.<%= camelizedSingularName %> = <%= camelizedSingularName %>;
            });
        };
    }
]);