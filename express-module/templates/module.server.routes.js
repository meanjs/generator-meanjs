'use strict';

/**
 * Module dependencies.
 */
var <%= moduleName %>Policy = require('../policies/<%= moduleName %>.server.policy'),
    <%= moduleName %> = require('../controllers/<%= moduleName %>.server.controller');

module.exports = function (app) {
    // <%= capitalizedModuleName %> collection routes
    app.route('/api/<%= moduleName %>').all(<%= moduleName %>Policy.isAllowed)
        .get(<%= moduleName %>.list)
        .post(<%= moduleName %>.create);

    // Single <%= moduleName %> routes
    app.route('/api/<%= moduleName %>/:<%= moduleName %>Id').all(<%= moduleName %>Policy.isAllowed)
        .get(<%= moduleName %>.read)
        .put(<%= moduleName %>.update)
        .delete(<%= moduleName %>.delete);

    // Finish by binding the <%= moduleName %> middleware
    app.param('<%= moduleName %>Id', <%= moduleName %>.<%= moduleName %>ByID);
};
