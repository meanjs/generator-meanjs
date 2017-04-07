(function () {
  'use strict';

  //Setting up route
  angular
    .module('<%= slugifiedModuleName %>')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    // <%= humanizedModuleName %> state routing
    $stateProvider
      .state('<%= slugifiedName %>', {
        url: '/<%= slugifiedRoutePath %>',
        templateUrl: 'modules/<%= slugifiedModuleName %>/client/views/<%= slugifiedViewName %><%= suffixes.client.views %>',
        controller: '<%= classifiedControllerName %>Controller',
        controllerAs: 'vm'
      });
  }
})();
