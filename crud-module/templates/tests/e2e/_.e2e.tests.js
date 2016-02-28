'use strict';

describe('<%= humanizedPluralName %> E2E Tests:', function () {
  describe('Test <%= humanizedPluralName %> page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/<%= slugifiedPluralName %>');
      expect(element.all(by.repeater('<%= slugifiedSingularName %> in <%= slugifiedPluralName %>')).count()).toEqual(0);
    });
  });
});
