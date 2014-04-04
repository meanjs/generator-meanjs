'use strict';

//<%= humanizedPluralName %> service used to communicate <%= humanizedPluralName %> REST endpoints
angular.module('<%= dasherizedPluralName %>').factory('<%= classifiedPluralName %>', ['$resource', function($resource) {
    return $resource('<%= dasherizedPluralName %>/:<%= camelizedSingularName %>Id', {
        <%= camelizedSingularName %>Id: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);