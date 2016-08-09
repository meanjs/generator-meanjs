(function () {
  'use strict';

  angular
    .module('<%= slugifiedPluralName %>')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: '<%= humanizedPluralName %>',
      state: '<%= slugifiedPluralName %>',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', '<%= slugifiedPluralName %>', {
      title: 'List <%= humanizedPluralName %>',
      state: '<%= slugifiedPluralName %>.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', '<%= slugifiedPluralName %>', {
      title: 'Create <%= humanizedSingularName %>',
      state: '<%= slugifiedPluralName %>.create',
      roles: ['user']
    });
  }
}());
