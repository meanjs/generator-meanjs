'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
  path = require('path'),
  mongoose = require('mongoose'),
  <%= classifiedSingularName %> = mongoose.model('<%= classifiedSingularName %>'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a <%= humanizedSingularName %>
 */
exports.create = function(req, res) {
  var <%= camelizedSingularName %> = new <%= classifiedSingularName %>(req.body);
  <%= camelizedSingularName %>.user = req.user;

  <%= camelizedSingularName %>.save(function(err) {
    if (err) { return res.status(400).send({ message: errorHandler.getErrorMessage(err) }); }
    else {
      res.jsonp(<%= camelizedSingularName %>);
    }
  });
};

/**
 * Show the current <%= humanizedSingularName %>
 */
exports.read = function(req, res) {
  res.jsonp(req.<%= camelizedSingularName %>);
};

/**
 * Update a <%= humanizedSingularName %>
 */
exports.update = function(req, res) {
  var <%= camelizedSingularName %> = req.<%= camelizedSingularName %> ;

  <%= camelizedSingularName %> = _.extend(<%= camelizedSingularName %> , req.body);

  <%= camelizedSingularName %>.save(function(err) {
    if (err) { return res.status(400).send({ message: errorHandler.getErrorMessage(err) }); }
    else {
      res.jsonp(<%= camelizedSingularName %>);
    }
  });
};

/**
 * Delete an <%= humanizedSingularName %>
 */
exports.delete = function(req, res) {
  var <%= camelizedSingularName %> = req.<%= camelizedSingularName %> ;

  <%= camelizedSingularName %>.remove(function(err) {
    if (err) { return res.status(400).send({ message: errorHandler.getErrorMessage(err) }); }
    else {
      res.jsonp(<%= camelizedSingularName %>);
    }
  });
};

/**
 * List of <%= humanizedPluralName %>
 */
exports.list = function(req, res) { <%= classifiedSingularName %>.find().sort('-created').populate('user', 'displayName').exec(function(err, <%= camelizedPluralName %>) {
  if (err) { return res.status(400).send({ message: errorHandler.getErrorMessage(err) }); }
  else {
    res.jsonp(<%= camelizedPluralName %>);
  }
});
};

/**
 * <%= humanizedSingularName %> middleware
 */
exports.<%= camelizedSingularName %>ByID = function(req, res, next, id) { <%= classifiedSingularName %>.findById(id).populate('user', 'displayName').exec(function(err, <%= camelizedSingularName %>) {
  if (err) return next(err);
  if (! <%= camelizedSingularName %>) return next(new Error('Failed to load <%= humanizedSingularName %> ' + id));
  req.<%= camelizedSingularName %> = <%= camelizedSingularName %> ;
  next();
});
};
