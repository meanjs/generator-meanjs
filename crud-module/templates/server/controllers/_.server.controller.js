'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  <%= classifiedSingularName %> = mongoose.model('<%= classifiedSingularName %>'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a <%= humanizedSingularName %>
 */
exports.create = function(req, res) {
  var <%= camelizedSingularName %> = new <%= classifiedSingularName %>(req.body);
  <%= camelizedSingularName %>.user = req.user;

  <%= camelizedSingularName %>.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(<%= camelizedSingularName %>);
    }
  });
};

/**
 * Show the current <%= humanizedSingularName %>
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var <%= camelizedSingularName %> = req.<%= camelizedSingularName %> ? req.<%= camelizedSingularName %>.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  <%= camelizedSingularName %>.isCurrentUserOwner = req.user && <%= camelizedSingularName %>.user && <%= camelizedSingularName %>.user._id.toString() === req.user._id.toString();

  res.jsonp(<%= camelizedSingularName %>);
};

/**
 * Update a <%= humanizedSingularName %>
 */
exports.update = function(req, res) {
  var <%= camelizedSingularName %> = req.<%= camelizedSingularName %>;

  <%= camelizedSingularName %> = _.extend(<%= camelizedSingularName %>, req.body);

  <%= camelizedSingularName %>.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(<%= camelizedSingularName %>);
    }
  });
};

/**
 * Delete an <%= humanizedSingularName %>
 */
exports.delete = function(req, res) {
  var <%= camelizedSingularName %> = req.<%= camelizedSingularName %>;

  <%= camelizedSingularName %>.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(<%= camelizedSingularName %>);
    }
  });
};

/**
 * List of <%= humanizedPluralName %>
 */
exports.list = function(req, res) {
  <%= classifiedSingularName %>.find().sort('-created').populate('user', 'displayName').exec(function(err, <%= camelizedPluralName %>) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(<%= camelizedPluralName %>);
    }
  });
};

/**
 * <%= humanizedSingularName %> middleware
 */
exports.<%= camelizedSingularName %>ByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: '<%= humanizedSingularName %> is invalid'
    });
  }

  <%= classifiedSingularName %>.findById(id).populate('user', 'displayName').exec(function (err, <%= camelizedSingularName %>) {
    if (err) {
      return next(err);
    } else if (!<%= camelizedSingularName %>) {
      return res.status(404).send({
        message: 'No <%= humanizedSingularName %> with that identifier has been found'
      });
    }
    req.<%= camelizedSingularName %> = <%= camelizedSingularName %>;
    next();
  });
};
