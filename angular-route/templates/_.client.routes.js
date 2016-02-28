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
        templateUrl: 'modules/<%= slugifiedModuleName %>/client/views/<%= slugifiedViewName %>.client.view.html',
        controller: '<%= classifiedControllerName %>Controller',
        controllerAs: 'vm'
      });
  }
})();
