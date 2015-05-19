'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	<%= classifiedSingularName %> = mongoose.model('<%= classifiedSingularName %>'),
	_ = require('lodash');

/**
 * Create a <%= humanizedSingularName %>
 */
exports.create = function(req, res) {

	// Filters out control fields
	delete req.body.updatedAt;
	delete req.body.updatedBy;
	delete req.body.createdAt;
	delete req.body.createdBy;

	var <%= camelizedSingularName %> = new <%= classifiedSingularName %>(req.body);

	<%= camelizedSingularName %>.createdBy = req.user;
	<%= camelizedSingularName %>.updatedBy = req.user;

	<%= camelizedSingularName %>.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(<%= camelizedSingularName %>);
		}
	});
};

/**
 * Show the current <%= humanizedSingularName %>
 */
exports.read = function(req, res) {
	res.json(req.<%= camelizedSingularName %>);
};

/**
 * Update a <%= humanizedSingularName %>
 */
exports.update = function(req, res) {

	// Filters out control fields
	delete req.body.updatedAt;
	delete req.body.updatedBy;
	delete req.body.createdAt;
	delete req.body.createdBy;

	var <%= camelizedSingularName %> = req.<%= camelizedSingularName %>;

	<%= camelizedSingularName %> = _.extend(<%= camelizedSingularName %>, req.body);

	<%= camelizedSingularName %>.updatedAt = Date.now();
	<%= camelizedSingularName %>.updatedBy = req.user;

	<%= camelizedSingularName %>.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(<%= camelizedSingularName %>);
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
			res.json(<%= camelizedSingularName %>);
		}
	});
};

/**
 * List of <%= humanizedPluralName %>
 */
exports.list = function(req, res) {
	<%= classifiedSingularName %>.find().sort('-createdAt').populate('createdBy', 'displayName').populate('updatedBy', 'displayName').exec(function(err, <%= camelizedPluralName %>) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(<%= camelizedPluralName %>);
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

	<%= classifiedSingularName %>.findById(id).populate('createdBy', 'displayName').populate('updatedBy', 'displayName').exec(function(err, <%= camelizedSingularName %>) {
		if (err) return next(err);
		if (!<%= camelizedSingularName %>) {
			return res.status(404).send({
				message: '<%= humanizedSingularName %> not found'
			});
		}
		req.<%= camelizedSingularName %> = <%= camelizedSingularName %>;
		next();
	});
};

/**
 * <%= humanizedSingularName %> authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.<%= camelizedSingularName %>.createdBy.id !== req.user.id) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}
	next();
};
