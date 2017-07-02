(function() {
  'use strict';

  // <%= humanizedModuleName %> module config
  angular
    .module('<%= slugifiedModuleName %>')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menusService) {
    // Config logic
    // ...
  }
})();
