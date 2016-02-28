(function() {
  'use strict';

  // <%= humanizedModuleName %> module config
  angular
    .module('<%= slugifiedModuleName %>')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Config logic
    // ...
  }
})();
