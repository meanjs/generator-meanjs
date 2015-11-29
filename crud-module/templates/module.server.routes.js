'use strict';

/**
 * Module dependencies.
 */
var <%= moduleName %>Policy = require('../policies/<%= pluralModuleName %>.server.policy'),
    <%= moduleName %> = require('../controllers/<%= pluralModuleName %>.server.controller');


module.exports = function (app) {
  // Articles collection routes
  app.route('/api/<%= pluralModuleName %>').all(<%= moduleName %>Policy.isAllowed)
    .get(<%= moduleName %>.list)
    .post(<%= moduleName %>.create);

  // Single article routes
  app.route('/api/<%= pluralModuleName %>/:<%= moduleName %>Id').all(<%= moduleName %>Policy.isAllowed)
    .get(<%= moduleName %>.read)
    .put(<%= moduleName %>.update)
    .delete(<%= moduleName %>.delete);

  // Finish by binding the <%= moduleName %> middleware
  app.param('<%= moduleName %>Id', <%= moduleName %>.<%= moduleName %>ByID);
};
