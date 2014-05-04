'use strict';

// Configuring the Articles module
angular.module('<%= slugifiedPluralName %>').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('<%= menuId %>', '<%= humanizedPluralName %>', '<%= slugifiedPluralName %>');
		Menus.addMenuItem('<%= menuId %>', 'New <%= humanizedSingularName %>', '<%= slugifiedPluralName %>/create');
	}
]);