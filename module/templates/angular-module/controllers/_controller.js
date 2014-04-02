'use strict';

// <%= humanizedPluralName %> controller
angular.module('<%= slugifiedPluralName %>').controller('<%= classifiedPluralName %>Controller', ['$scope', '$stateParams', '$location', 'Authentication', '<%= classifiedPluralName %>',
    function($scope, $stateParams, $location, Authentication, <%= classifiedPluralName %>) {
        $scope.authentication = Authentication;

        // Create new <%= humanizedSingularName %>
        $scope.create = function() {
            var <%= camelizedSingularName %> = new <%= classifiedPluralName %>({
                name: this.name
            });

            <%= camelizedSingularName %>.$save(function(response) {
                $location.path('<%= slugifiedPluralName %>/' + response._id);
            });
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
                    $location.path('<%= slugifiedPluralName %>');
                });
            }
        };

        // Update existing <%= humanizedSingularName %>
        $scope.update = function() {
            var <%= camelizedSingularName %> = $scope.<%= camelizedSingularName %>;

            <%= camelizedSingularName %>.$update(function() {
                $location.path('<%= slugifiedPluralName %>/' + <%= camelizedSingularName %>._id);
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