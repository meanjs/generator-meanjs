$stateProvider.
  state('<%= slugifiedNgRouteName %>', {
    url: '/<%= slugifiedNgRoutePath %>',
    templateUrl: 'modules/<%= slugifiedModuleName %>/views/<%= slugifiedNgViewName %>.client.view.html'
  }).