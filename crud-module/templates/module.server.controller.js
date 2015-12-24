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

    //

};

/**
 * Show the current <%= moduleName %>
 */
exports.read = function (req, res) {

    //

};

/**
 * Update a <%= moduleName %>
 */
exports.update = function (req, res) {

    //

};

/**
 * Delete an <%= moduleName %>
 */
exports.delete = function (req, res) {

    //

};
