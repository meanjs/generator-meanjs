'use strict';

//<%= humanizedPluralName %> service used to communicate <%= humanizedPluralName %> REST endpoints
angular.module('<%= slugifiedPluralName %>').factory('<%= classifiedPluralName %>', ['$resource', function($resource) {
    return $resource('<%= slugifiedPluralName %>/:<%= camelizedSingularName %>Id', {
        <%= camelizedSingularName %>Id: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);