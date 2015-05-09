$stateProvider.
    state('<%= slugifiedName %>', {
      url: '/<%= slugifiedRoutePath %>',
      templateUrl: 'modules/<%= slugifiedModuleName %>/views/<%= slugifiedViewName %>.client.view.html'
    }).