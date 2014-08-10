'use strict';

// Bootstraptests controller
angular.module('bootstraptests').controller('BootstraptestsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Bootstraptests',
	function($scope, $stateParams, $location, Authentication, Bootstraptests ) {
		$scope.authentication = Authentication;

		// Create new Bootstraptest
		$scope.create = function() {
			// Create new Bootstraptest object
			var bootstraptest = new Bootstraptests ({
				name: this.name
			});

			// Redirect after save
			bootstraptest.$save(function(response) {
				$location.path('bootstraptests/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Bootstraptest
		$scope.remove = function( bootstraptest ) {
			if ( bootstraptest ) { bootstraptest.$remove();

				for (var i in $scope.bootstraptests ) {
					if ($scope.bootstraptests [i] === bootstraptest ) {
						$scope.bootstraptests.splice(i, 1);
					}
				}
			} else {
				$scope.bootstraptest.$remove(function() {
					$location.path('bootstraptests');
				});
			}
		};

		// Update existing Bootstraptest
		$scope.update = function() {
			var bootstraptest = $scope.bootstraptest ;

			bootstraptest.$update(function() {
				$location.path('bootstraptests/' + bootstraptest._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Bootstraptests
		$scope.find = function() {
			$scope.bootstraptests = Bootstraptests.query();
		};

		// Find existing Bootstraptest
		$scope.findOne = function() {
			$scope.bootstraptest = Bootstraptests.get({ 
				bootstraptestId: $stateParams.bootstraptestId
			});
		};
	}
]).factory('plunkGenerator', function ($document) {

    return function (ngVersion, bsVersion, version, module, content) {

        var form = angular.element('<form style="display: none;" method="post" action="http://plnkr.co/edit/?p=preview" target="_blank"></form>');
        var addField = function (name, value) {
            var input = angular.element('<input type="hidden" name="' + name + '">');
            input.attr('value', value);
            form.append(input);
        };

        var indexContent = function (content, version) {
            return '<!doctype html>\n' +
                '<html ng-app="plunker">\n' +
                '  <head>\n' +
                '    <script src="//ajax.googleapis.com/ajax/libs/angularjs/'+ngVersion+'/angular.js"></script>\n' +
                '    <script src="//angular-ui.github.io/bootstrap/ui-bootstrap-tpls-'+version+'.js"></script>\n' +
                '    <script src="example.js"></script>\n' +
                '    <link href="//netdna.bootstrapcdn.com/bootstrap/'+bsVersion+'/css/bootstrap.min.css" rel="stylesheet">\n' +
                '  </head>\n' +
                '  <body>\n\n' +
                content + '\n' +
                '  </body>\n' +
                '</html>\n';
        };

        var scriptContent = function(content) {
            return "angular.module('plunker', ['ui.bootstrap']);" + '\n' + content;
        };

        addField('description', 'http://angular-ui.github.io/bootstrap/');
        addField('files[index.html]', indexContent(content.markup, version));
        addField('files[example.js]', scriptContent(content.javascript));

        $document.find('body').append(form);
        form[0].submit();
        form.remove();
    };
})

    .controller('PlunkerCtrl', function ($scope, plunkGenerator) {

        $scope.content = {};

        $scope.edit = function (ngVersion, bsVersion, version, module) {
            plunkGenerator(ngVersion, bsVersion, version, module, $scope.content);
        };
    })

    .directive('plunkerContent', function () {
        return {
            link:function (scope, element, attrs) {
                scope.content[attrs.plunkerContent] = element.text().trim();
            }
        };

    });;