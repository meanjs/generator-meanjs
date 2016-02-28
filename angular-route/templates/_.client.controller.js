(function() {
  'use strict';

  angular
    .module('<%= slugifiedModuleName %>')
    .controller('<%= classifiedControllerName %>Controller', <%= classifiedControllerName %>Controller);

  <%= classifiedControllerName %>Controller.$inject = ['$scope'];

  function <%= classifiedControllerName %>Controller($scope) {
    var vm = this;

    // <%= humanizedControllerName %> controller logic
    // ...

    init();

    function init() {
    }
  }
})();
