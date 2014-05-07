'use strict';

module.exports = {
	app: {
		title: '<%= appName %>',
		description: '<%= appDescription %>',
		keywords: '<%= appKeywords %>'
	},
	port: process.env.PORT || 3000,
	templateEngine: 'swig',
	sessionSecret: 'MEAN',
	sessionCollection: 'sessions',
	assets: {
		lib: {
			css: [
				'public/lib/bootstrap/dist/css/bootstrap.css',
				'public/lib/bootstrap/dist/css/bootstrap-theme.css',
			],
			js: [
				'public/lib/angular/angular.js',
				'public/lib/angular-resource/angular-resource.js', <% if (angularCookies) { %>
				'public/lib/angular-cookies/angular-cookies.js',  <% } if (angularAnimate) { %>
				'public/lib/angular-animate/angular-animate.js', <% } if (angularTouch) { %>
				'public/lib/angular-touch/angular-touch.js', <% } if (angularSanitize) { %>
				'public/lib/angular-sanitize/angular-sanitize.js', <% } %>
				'public/lib/angular-ui-router/release/angular-ui-router.js',
				'public/lib/angular-ui-utils/ui-utils.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.js'
			]
		},
		css: [
			'public/modules/**/css/*.css'
		],
		js: [
			'public/config.js',
			'public/application.js',
			'public/modules/*/*.js',
			'public/modules/*/*[!tests]*/*.js'
		],
		tests: [
			'public/lib/angular-mocks/angular-mocks.js',
			'public/modules/*/tests/*.js'
		]
	}
};