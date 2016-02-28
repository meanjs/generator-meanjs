'use strict';

/**
 * Module dependencies
 */
var <%= camelizedPluralName %>Policy = require('../policies/<%= slugifiedPluralName %>.server.policy'),
  <%= camelizedPluralName %> = require('../controllers/<%= slugifiedPluralName %>.server.controller');

module.exports = function(app) {
  // <%= humanizedPluralName %> Routes
  app.route('/api/<%= slugifiedPluralName %>').all(<%= camelizedPluralName %>Policy.isAllowed)
    .get(<%= camelizedPluralName %>.list)
    .post(<%= camelizedPluralName %>.create);

  app.route('/api/<%= slugifiedPluralName %>/:<%= camelizedSingularName %>Id').all(<%= camelizedPluralName %>Policy.isAllowed)
    .get(<%= camelizedPluralName %>.read)
    .put(<%= camelizedPluralName %>.update)
    .delete(<%= camelizedPluralName %>.delete);

  // Finish by binding the <%= humanizedSingularName %> middleware
  app.param('<%= camelizedSingularName %>Id', <%= camelizedPluralName %>.<%= camelizedSingularName %>ByID);
};
