(function () {
  'use strict';

  angular
    .module('<%= slugifiedPluralName %>')
    .controller('<%= classifiedPluralName %>ListController', <%= classifiedPluralName %>ListController);

  <%= classifiedPluralName %>ListController.$inject = ['<%= classifiedPluralName %>Service'];

  function <%= classifiedPluralName %>ListController(<%= classifiedPluralName %>Service) {
    var vm = this;

    vm.<%= camelizedPluralName %> = <%= classifiedPluralName %>Service.query();
  }
}());
