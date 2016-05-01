// <%= humanizedPluralName %> service used to communicate <%= humanizedPluralName %> REST endpoints
(function () {
  'use strict';

  angular
    .module('<%= slugifiedPluralName %>')
    .factory('<%= classifiedPluralName %>Service', <%= classifiedPluralName %>Service);

  <%= classifiedPluralName %>Service.$inject = ['$resource'];

  function <%= classifiedPluralName %>Service($resource) {
    return $resource('api/<%= slugifiedPluralName %>/:<%= camelizedSingularName %>Id', {
      <%= camelizedSingularName %>Id: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
