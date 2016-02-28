(function () {
  'use strict';

  angular
    .module('<%= slugifiedModuleName %>')
    .filter('<%= camelizedName %>', <%= camelizedName %>);

  <%= camelizedName %>.$inject = [/*Example: '$state', '$window' */];

  function <%= camelizedName %>(/*Example: $state, $window */) {
    return function (input) {
      // <%= humanizedName %> directive logic
      // ...

      return '<%= camelizedName %> filter: ' + input;
    };
  }
})();
