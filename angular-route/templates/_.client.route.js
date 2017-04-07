$stateProvider
      .state('<%= slugifiedName %>', {
        url: '/<%= slugifiedRoutePath %>',
        templateUrl: 'modules/<%= slugifiedModuleName %>/client/views/<%= slugifiedViewName %><%= suffixes.client.views %>',
        controller: '<%= classifiedControllerName %>Controller',
        controllerAs: 'vm'
      })
