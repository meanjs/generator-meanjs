'use strict';

angular.module('<%= slugifiedModuleName %>').filter('<%= camelizedNgFilterName %>', [
  function () {
    return function (input) {
      // <%= humanizedNgFilterName %> directive logic
      // ...

      return '<%= camelizedNgFilterName %> filter: ' + input;
    };
  }
]);