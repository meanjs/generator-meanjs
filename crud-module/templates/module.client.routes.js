'use strict';

// Setting up route
angular.module('<%= pluralModuleName %>').config(['$stateProvider',
    function ($stateProvider) {
    // <%= pluralModuleName %> state routing
    $stateProvider
      .state('<%= pluralModuleName %>', {
        abstract: true,
        url: '/<%= pluralModuleName %>',
        template: '<ui-view/>'
      })
      .state('<%= pluralModuleName %>.list', {
        url: '',
        templateUrl: 'modules/<%= pluralModuleName %>/client/views/list-<%= pluralModuleName %>.client.view.html'
      })
      .state('<%= pluralModuleName %>.create', {
        url: '/create',
        templateUrl: 'modules/<%= pluralModuleName %>/client/views/create-<%= moduleName %>.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      })
      .state('<%= pluralModuleName %>.view', {
        url: '/:<%= moduleName %>Id',
        templateUrl: 'modules/<%= pluralModuleName %>/client/views/view-<%= moduleName %>.client.view.html'
      })
      .state('<%= pluralModuleName %>.edit', {
        url: '/:<%= moduleName %>Id/edit',
        templateUrl: 'modules/<%= pluralModuleName %>/client/views/edit-<%= moduleName %>.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      });

    }
]);
