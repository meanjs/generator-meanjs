'use strict';

/**
 * Module dependencies.
 */
exports.index = function(req, res) {
	res.render('index.html', {
<% if (usePassport) { %>user: req.user || null<% } %>
	});
};