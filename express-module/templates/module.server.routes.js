'use strict';

/**
 * Module dependencies.
 */
var <%= moduleName %>sPolicy = require('../policies/<%= moduleName %>s.server.policy'),
    <%= moduleName %>s = require('../controllers/<%= moduleName %>s.server.controller');

module.exports = function (app) {
    // <%= capitalizedModuleName %>s collection routes
    app.route('/api/<%= moduleName %>s').all(<%= moduleName %>sPolicy.isAllowed)
        .get(<%= moduleName %>s.list)
        .post(<%= moduleName %>s.create);

    // Single <%= moduleName %> routes
    app.route('/api/<%= moduleName %>s/:<%= moduleName %>Id').all(<%= moduleName %>sPolicy.isAllowed)
        .get(<%= moduleName %>s.read)
        .put(<%= moduleName %>s.update)
        .delete(<%= moduleName %>s.delete);

    // Finish by binding the <%= moduleName %> middleware
    app.param('<%= moduleName %>Id', <%= moduleName %>s.<%= moduleName %>ByID);
};