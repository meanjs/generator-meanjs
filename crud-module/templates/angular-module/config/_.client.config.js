'use strict';

// Configuring the <%= humanizedSingularName %> module
angular.module('<%= camelizedPluralName %>').run(['Menus',
	function(Menus) {
		// Add the <%= camelizedPluralName %> dropdown item
		Menus.addMenuItem('topbar', {
			title: '<%= humanizedSingularName %>',
			state: '<%= camelizedPluralName %>',
			type: 'dropdown'
		});

		// Add the dropdown list item
		Menus.addSubMenuItem('topbar', '<%= camelizedPluralName %>', {
			title: 'List <%= humanizedSingularName %>',
			state: '<%= camelizedPluralName %>.list'
		});

		// Add the dropdown create item
		Menus.addSubMenuItem('topbar', '<%= camelizedPluralName %>', {
			title: 'Create <%= humanizedSingularName %>',
			state: '<%= camelizedPluralName %>.create'
		});
	}
]);
