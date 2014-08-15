'use strict';

// Configuring the Articles module
angular.module('bootstraptests').run(['$location', 'Menus',
	function($location, Menus) {

		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Bootstraptests', 'bootstraptests', 'dropdown', '/bootstraptests(/create)?');
		Menus.addSubMenuItem('topbar', 'bootstraptests', 'BootStrap UI', 'bootstrap/css');
	}
]);