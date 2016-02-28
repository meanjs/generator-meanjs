(function () {
  'use strict';

  angular
    .module('<%= slugifiedModuleName %>')
    .factory('<%= slugifiedModuleName %>Service', <%= slugifiedModuleName %>Service);

  <%= slugifiedModuleName %>Service.$inject = [/*Example: '$state', '$window' */];

  function <%= slugifiedModuleName %>Service(/*Example: $state, $window */) {
    // <%= humanizedName %> service logic
    // ...

    // Public API
    return {
      someMethod: function () {
        return true;
      }
    };
  }
})();
