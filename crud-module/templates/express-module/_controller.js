'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	<%= classifiedSingularName %> = mongoose.model('<%= classifiedSingularName %>'),
	_ = require('lodash');

/**
 * Create a <%= humanizedSingularName %>
 */
exports.create = function(req, res) {
	var <%= camelizedSingularName %> = new <%= classifiedSingularName %>(req.body);<% if (usePassport) { %>
	<%= camelizedSingularName %>.user = req.user;<% } %>

	<%= camelizedSingularName %>.save(function(err) {
		if (err) {<% if (usePassport) { %>
			return res.send('users/signup', {
				errors: err.errors,
				<%= camelizedSingularName %>: <%= camelizedSingularName %><% } else { %>
			res.render('error', {
				status: 500<% } %>
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
	res.jsonp(req.<%= camelizedSingularName %>);
};

/**
 * Update a <%= humanizedSingularName %>
 */
exports.update = function(req, res) {
	var <%= camelizedSingularName %> = req.<%= camelizedSingularName %>;

	<%= camelizedSingularName %> = _.extend(<%= camelizedSingularName %>, req.body);

	<%= camelizedSingularName %>.save(function(err) {
		if (err) {
			res.render('error', {
				status: 500
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
			res.render('error', {
				status: 500
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
	<%= classifiedSingularName %>.find().sort('-created').populate(<% if (usePassport) { %>'user', <% } %>'displayName').exec(function(err, <%= camelizedPluralName %>) {
		if (err) {
			res.render('error', {
				status: 500
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
	<%= classifiedSingularName %>.findById(id).populate(<% if (usePassport) { %>'user', <% } %>'displayName').exec(function(err, <%= camelizedSingularName %>) {
		if (err) return next(err);
		if (!<%= camelizedSingularName %>) return next(new Error('Failed to load <%= humanizedSingularName %> ' + id));
		req.<%= camelizedSingularName %> = <%= camelizedSingularName %>;
		next();
	});
};
<% if (usePassport) { %>
/**
 * <%= humanizedSingularName %> authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.<%= camelizedSingularName %>.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};<% } %>