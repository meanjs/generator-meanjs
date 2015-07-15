'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport'),
	url = require('url'),
	FacebookStrategy = require('passport-facebook').Strategy,
	config = require('../config'),
	users = require('../../app/controllers/users.server.controller');

module.exports = function() {
	// Use facebook strategy
	passport.use(new FacebookStrategy({
			clientID: config.facebook.clientID,
			clientSecret: config.facebook.clientSecret,
			callbackURL: config.facebook.callbackURL,
			passReqToCallback: true,
			profileFields: [
				'id',
				'username',
				'displayName',
				'name',
				'gender',
				'birthday',
				'profileurl',
				'emails',
				'photos'
			]
			/*
			 * Available profile fields are described at:
			 * https://developers.facebook.com/docs/graph-api/reference/user
			 *
			 * You can also request the following fields which will be mapped accordingly.
			 *
			 * {
			 *   'id':          'id',
			 *   'username':    'username',
			 *   'displayName': 'name',
			 *   'name':       ['last_name', 'first_name', 'middle_name'],
			 *   'gender':      'gender',
			 *   'birthday':    'birthday',
			 *   'profileUrl':  'link',
			 *   'emails':      'email',
			 *   'photos':      'picture'
			 * }
			 * Default is to request for id and displayName only.
			 */
		},
		function(req, accessToken, refreshToken, profile, done) {
			// Set the provider data and include tokens
			var providerData = profile._json;
			providerData.accessToken = accessToken;
			providerData.refreshToken = refreshToken;

			// Create the user OAuth profile
			var providerUserProfile = {
				firstName: profile.name.givenName,
				lastName: profile.name.familyName,
				displayName: profile.displayName,
				email: profile.emails[0].value,
				username: profile.username,
				provider: 'facebook',
				providerIdentifierField: 'id',
				providerData: providerData
			};

			// Save the user OAuth profile
			users.saveOAuthUserProfile(req, providerUserProfile, done);
		}
	));
};
