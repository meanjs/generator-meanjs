'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
    mongoose = require('mongoose'),
    <%= capitalizedModuleName %> = mongoose.model('<%= capitalizedModuleName %>'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a <%= moduleName %>
 */
exports.create = function (req, res) {
    var <%= moduleName %> = new <%= capitalizedModuleName %>(req.body);
    <%= moduleName %>.user = req.user;

    <%= moduleName %>.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(<%= moduleName %>);
        }
    });
};

/**
 * Show the current <%= moduleName %>
 */
exports.read = function (req, res) {
    res.json(req.<%= moduleName %>);
};

/**
 * Update a <%= moduleName %>
 */
exports.update = function (req, res) {
    var <%= moduleName %> = req.<%= moduleName %>;

    <%= moduleName %>.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(<%= moduleName %>);
        }
    });
};

/**
 * Delete an <%= moduleName %>
 */
exports.delete = function (req, res) {
    var <%= moduleName %> = req.<%= moduleName %>;

    <%= moduleName %>.remove(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(<%= moduleName %>);
        }
    });
};

/**
 * List of <%= capitalizedModuleName %>
 */
exports.list = function (req, res) {
    <%= capitalizedModuleName %>.find().sort('-created').populate('user', 'displayName').exec(function (err, <%= moduleName %>) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(<%= moduleName %>);
        }
    });
};

/**
 * <%= capitalizedModuleName %> middleware
 */
exports.<%= moduleName %>ByID = function (req, res, next, id) {

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: '<%= capitalizedModuleName %> is invalid'
        });
    }

    <%= capitalizedModuleName %>.findById(id).populate('user', 'displayName').exec(function (err, <%= moduleName %>) {
        if (err) {
            return next(err);
        } else if (!<%= moduleName %>) {
            return res.status(404).send({
                message: 'No <%= moduleName %> with that identifier has been found'
            });
        }
        req.<%= moduleName %> = <%= moduleName %>;
        next();
    });
};
