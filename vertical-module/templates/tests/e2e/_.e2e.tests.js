'use strict';

describe('<%= humanizedPluralName %> E2E Tests:', function() {
	describe('Test <%= humanizedPluralName %> page', function() {
		it('Should not include new <%= humanizedPluralName %>', function() {
			browser.get('http://localhost:3000/#!/<%= slugifiedPluralName %>');
			expect(element.all(by.repeater('<%= camelizedSingularName %> in <%= camelizedPluralName %>')).count()).toEqual(0);
		});
	});
});
