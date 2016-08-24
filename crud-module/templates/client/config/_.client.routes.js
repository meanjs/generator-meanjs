(function () {
  'use strict';

  angular
    .module('<%= slugifiedPluralName %>')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('<%= slugifiedPluralName %>', {
        abstract: true,
        url: '/<%= slugifiedPluralName %>',
        template: '<ui-view/>'
      })
      .state('<%= slugifiedPluralName %>.list', {
        url: '',
        templateUrl: 'modules/<%= slugifiedPluralName %>/client/views/list-<%= slugifiedPluralName %>.client.view.html',
        controller: '<%= classifiedPluralName %>ListController',
        controllerAs: 'vm',
        data: {
          pageTitle: '<%= humanizedPluralName %> List'
        }
      })
      .state('<%= slugifiedPluralName %>.create', {
        url: '/create',
        templateUrl: 'modules/<%= slugifiedPluralName %>/client/views/form-<%= slugifiedSingularName %>.client.view.html',
        controller: '<%= classifiedPluralName %>Controller',
        controllerAs: 'vm',
        resolve: {
          <%= slugifiedSingularName %>Resolve: new<%= classifiedSingularName %>
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: '<%= humanizedPluralName %> Create'
        }
      })
      .state('<%= slugifiedPluralName %>.edit', {
        url: '/:<%= camelizedSingularName %>Id/edit',
        templateUrl: 'modules/<%= slugifiedPluralName %>/client/views/form-<%= slugifiedSingularName %>.client.view.html',
        controller: '<%= classifiedPluralName %>Controller',
        controllerAs: 'vm',
        resolve: {
          <%= slugifiedSingularName %>Resolve: get<%= classifiedSingularName %>
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit <%= humanizedSingularName %> {{ <%= slugifiedSingularName %>Resolve.name }}'
        }
      })
      .state('<%= slugifiedPluralName %>.view', {
        url: '/:<%= camelizedSingularName %>Id',
        templateUrl: 'modules/<%= slugifiedPluralName %>/client/views/view-<%= slugifiedSingularName %>.client.view.html',
        controller: '<%= classifiedPluralName %>Controller',
        controllerAs: 'vm',
        resolve: {
          <%= slugifiedSingularName %>Resolve: get<%= classifiedSingularName %>
        },
        data: {
          pageTitle: '<%= humanizedSingularName %> {{ <%= slugifiedSingularName %>Resolve.name }}'
        }
      });
  }

  get<%= classifiedSingularName %>.$inject = ['$stateParams', '<%= classifiedPluralName %>Service'];

  function get<%= classifiedSingularName %>($stateParams, <%= classifiedPluralName %>Service) {
    return <%= classifiedPluralName %>Service.get({
      <%= camelizedSingularName %>Id: $stateParams.<%= camelizedSingularName %>Id
    }).$promise;
  }

  new<%= classifiedSingularName %>.$inject = ['<%= classifiedPluralName %>Service'];

  function new<%= classifiedSingularName %>(<%= classifiedPluralName %>Service) {
    return new <%= classifiedPluralName %>Service();
  }
}());
