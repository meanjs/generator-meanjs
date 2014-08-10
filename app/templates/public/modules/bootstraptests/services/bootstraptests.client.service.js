'use strict';

//Bootstraptests service used to communicate Bootstraptests REST endpoints
angular.module('bootstraptests').factory('Bootstraptests', ['$resource',
	function($resource) {
		return $resource('bootstraptests/:bootstraptestId', { bootstraptestId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);