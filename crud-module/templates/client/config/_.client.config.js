'use strict';

// Configuring the <%= humanizedPluralName %> module
angular.module('<%= slugifiedPluralName %>').run(['Menus',
  function(Menus) {
    // Add the <%= humanizedPluralName %> dropdown item
    Menus.addMenuItem('<%= menuId %>', {
      title: '<%= humanizedPluralName %>',
      state: '<%= slugifiedPluralName %>',
      type: 'dropdown'
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('<%= menuId %>', '<%= slugifiedPluralName %>', {
      title: 'List <%= humanizedPluralName %>',
      state: '<%= slugifiedPluralName %>.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('<%= menuId %>', '<%= slugifiedPluralName %>', {
      title: 'Create <%= humanizedSingularName %>',
      state: '<%= slugifiedPluralName %>.create'
    });
  }
]);
