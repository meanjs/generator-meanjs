'use strict';

/**
 * Module dependencies.
 */
exports.index = function(req, res) {
	res.render('index', {
<% if (usePassport) { %>		user: req.user || null<%}%>
	});
};