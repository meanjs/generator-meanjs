$stateProvider
      .state('<%= slugifiedName %>', {
        url: '/<%= slugifiedRoutePath %>',
        templateUrl: 'modules/<%= slugifiedModuleName %>/client/views/<%= slugifiedName %>.client.view.html',
        controller: '<%= classifiedControllerName %>Controller',
        controllerAs: 'vm'
      })
