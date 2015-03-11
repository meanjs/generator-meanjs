'use strict';

// <%= humanizedPluralName %> controller
angular.module('<%= slugifiedPluralName %>').controller('<%= classifiedPluralName %>Controller', ['$scope', '$stateParams', '$location', '$modal', 'Authentication', '<%= classifiedPluralName %>',
	function($scope, $stateParams, $location, $modal, Authentication, <%= classifiedPluralName %> ) {
		$scope.authentication = Authentication;

		// Create new <%= humanizedSingularName %>
		$scope.create = function() {
			// Create new <%= humanizedSingularName %> object
			var <%= camelizedSingularName %> = new <%= classifiedPluralName %> ({
				name: this.name
			});

			// Redirect after save
			<%= camelizedSingularName %>.$save(function(response) {
				$location.path('<%= slugifiedPluralName %>/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing <%= humanizedSingularName %>
		$scope.remove = function( <%= camelizedSingularName %> ) {
			$modal.open({
				templateUrl: 'modules/<%= slugifiedPluralName %>/views/remove-<%= slugifiedSingularName %>.client.view.html',
				controller: function($scope, $modalInstance) {
					$scope.ok = function() {
						$modalInstance.close();
					};

					$scope.cancel = function() {
						$modalInstance.dismiss('cancel');
					};
				}
			})
			.result.then(function() {
				if ( <%= camelizedSingularName %> ) {
					<%= camelizedSingularName %>.$remove();

					for (var i in $scope.<%= camelizedPluralName %> ) {
						if ($scope.<%= camelizedPluralName %> [i] === <%= camelizedSingularName %> ) {
							$scope.<%= camelizedPluralName %>.splice(i, 1);
						}
					}
				} else {
					$scope.<%= camelizedSingularName %>.$remove(function() {
						$location.path('<%= slugifiedPluralName %>');
					});
				}
			});
		};

		// Update existing <%= humanizedSingularName %>
		$scope.update = function() {
			var <%= camelizedSingularName %> = $scope.<%= camelizedSingularName %> ;

			<%= camelizedSingularName %>.$update(function() {
				$location.path('<%= slugifiedPluralName %>/' + <%= camelizedSingularName %>._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of <%= humanizedPluralName %>
		$scope.find = function() {
			$scope.<%= camelizedPluralName %> = <%= classifiedPluralName %>.query();
		};

		// Find existing <%= humanizedSingularName %>
		$scope.findOne = function() {
			$scope.<%= camelizedSingularName %> = <%= classifiedPluralName %>.get({ 
				<%= camelizedSingularName %>Id: $stateParams.<%= camelizedSingularName %>Id
			});
		};
	}
]);
