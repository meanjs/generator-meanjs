$stateProvider
      .state('<%= slugifiedName %>', {
        url: '/<%= slugifiedRoutePath %>',
        templateUrl: 'modules/<%= slugifiedModuleName %>/client/views/<%= slugifiedName %><%= suffixes.client.views %>',
        controller: '<%= classifiedControllerName %>Controller',
        controllerAs: 'vm'
      })
