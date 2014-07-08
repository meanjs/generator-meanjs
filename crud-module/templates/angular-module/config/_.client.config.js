'use strict';

// Configuring the Articles module
angular.module('<%= slugifiedPluralName %>').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('<%= menuId %>', '<%= humanizedPluralName %>', '<%= slugifiedPluralName %>', 'dropdown', '/<%= slugifiedPluralName %>(/create)?');
		Menus.addSubMenuItem('<%= menuId %>', '<%= slugifiedPluralName %>', 'List <%= humanizedPluralName %>', '<%= slugifiedPluralName %>');
		Menus.addSubMenuItem('<%= menuId %>', '<%= slugifiedPluralName %>', 'New <%= humanizedSingularName %>', '<%= slugifiedPluralName %>/create');
	}
]);