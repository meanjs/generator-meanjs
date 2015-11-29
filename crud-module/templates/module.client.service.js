'use strict';

//<%= capitalizedModuleName %> service used for communicating with the articles REST endpoints
angular.module('<%= pluralModuleName %>').factory('<%= capitalizedModuleName %>', ['$resource',
  function ($resource) {
    return $resource('api/<%= pluralModuleName %>/:<%= moduleName %>Id', {
      <%= moduleName %>Id: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
