$stateProvider
      .state('<%= slugifiedName %>', {
        url: '/<%= slugifiedRoutePath %>',
        templateUrl: 'modules/<%= slugifiedModuleName %>/client/views/<%= slugifiedViewName %>.client.view.html',
        controller: '<%= classifiedControllerName %>Controller',
        controllerAs: 'vm'
      })
