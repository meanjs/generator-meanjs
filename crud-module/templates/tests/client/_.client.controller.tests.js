'use strict';

(function() {
  // <%= humanizedPluralName %> Controller Spec
  describe('<%= humanizedPluralName %> Controller Tests', function() {
    // Initialize global variables
    var <%= classifiedPluralName %>Controller,
      scope,
      $httpBackend,
      $stateParams,
      $location;

    // The $resource service augments the response object with methods for updating and deleting the resource.
    // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
    // the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
    // When the toEqualData matcher compares two objects, it takes only object properties into
    // account and ignores methods.
    beforeEach(function() {
      jasmine.addMatchers({
        toEqualData: function(util, customEqualityTesters) {
          return {
            compare: function(actual, expected) {
              return {
                pass: angular.equals(actual, expected)
              };
            }
          };
        }
      });
    });

    // Then we can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
      // Set a new global scope
      scope = $rootScope.$new();

      // Point global variables to injected services
      $stateParams = _$stateParams_;
      $httpBackend = _$httpBackend_;
      $location = _$location_;

      // Initialize the <%= humanizedPluralName %> controller.
      <%= classifiedPluralName %>Controller = $controller('<%= classifiedPluralName %>Controller', {
        $scope: scope
      });
    }));

    it('$scope.find() should create an array with at least one <%= humanizedSingularName %> object fetched from XHR', inject(function(<%= classifiedPluralName %>) {
      // Create sample <%= humanizedSingularName %> using the <%= humanizedPluralName %> service
      var sample<%= classifiedSingularName %> = new <%= classifiedPluralName %>({
        name: 'New <%= humanizedSingularName %>'
      });

      // Create a sample <%= humanizedPluralName %> array that includes the new <%= humanizedSingularName %>
      var sample<%= classifiedPluralName %> = [sample<%= classifiedSingularName %>];

      // Set GET response
      $httpBackend.expectGET('api/<%= slugifiedPluralName %>').respond(sample<%= classifiedPluralName %>);

      // Run controller functionality
      scope.find();
      $httpBackend.flush();

      // Test scope value
      expect(scope.<%= camelizedPluralName %>).toEqualData(sample<%= classifiedPluralName %>);
    }));

    it('$scope.findOne() should create an array with one <%= humanizedSingularName %> object fetched from XHR using a <%= camelizedSingularName %>Id URL parameter', inject(function(<%= classifiedPluralName %>) {
      // Define a sample <%= humanizedSingularName %> object
      var sample<%= classifiedSingularName %> = new <%= classifiedPluralName %>({
        name: 'New <%= humanizedSingularName %>'
      });

      // Set the URL parameter
      $stateParams.<%= camelizedSingularName %>Id = '525a8422f6d0f87f0e407a33';

      // Set GET response
      $httpBackend.expectGET(/api\/<%= slugifiedPluralName %>\/([0-9a-fA-F]{24})$/).respond(sample<%= classifiedSingularName %>);

      // Run controller functionality
      scope.findOne();
      $httpBackend.flush();

      // Test scope value
      expect(scope.<%= camelizedSingularName %>).toEqualData(sample<%= classifiedSingularName %>);
    }));

    it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(<%= classifiedPluralName %>) {
      // Create a sample <%= humanizedSingularName %> object
      var sample<%= classifiedSingularName %>PostData = new <%= classifiedPluralName %>({
        name: 'New <%= humanizedSingularName %>'
      });

      // Create a sample <%= humanizedSingularName %> response
      var sample<%= classifiedSingularName %>Response = new <%= classifiedPluralName %>({
        _id: '525cf20451979dea2c000001',
        name: 'New <%= humanizedSingularName %>'
      });

      // Fixture mock form input values
      scope.name = 'New <%= humanizedSingularName %>';

      // Set POST response
      $httpBackend.expectPOST('api/<%= slugifiedPluralName %>', sample<%= classifiedSingularName %>PostData).respond(sample<%= classifiedSingularName %>Response);

      // Run controller functionality
      scope.create();
      $httpBackend.flush();

      // Test form inputs are reset
      expect(scope.name).toEqual('');

      // Test URL redirection after the <%= humanizedSingularName %> was created
      expect($location.path()).toBe('/<%= slugifiedPluralName %>/' + sample<%= classifiedSingularName %>Response._id);
    }));

    it('$scope.update() should update a valid <%= humanizedSingularName %>', inject(function(<%= classifiedPluralName %>) {
      // Define a sample <%= humanizedSingularName %> put data
      var sample<%= classifiedSingularName %>PutData = new <%= classifiedPluralName %>({
        _id: '525cf20451979dea2c000001',
        name: 'New <%= humanizedSingularName %>'
      });

      // Mock <%= humanizedSingularName %> in scope
      scope.<%= camelizedSingularName %> = sample<%= classifiedSingularName %>PutData;

      // Set PUT response
      $httpBackend.expectPUT(/api\/<%= slugifiedPluralName %>\/([0-9a-fA-F]{24})$/).respond();

      // Run controller functionality
      scope.update();
      $httpBackend.flush();

      // Test URL location to new object
      expect($location.path()).toBe('/<%= slugifiedPluralName %>/' + sample<%= classifiedSingularName %>PutData._id);
    }));

    it('$scope.remove() should send a DELETE request with a valid <%= camelizedSingularName %>Id and remove the <%= humanizedSingularName %> from the scope', inject(function(<%= classifiedPluralName %>) {
      // Create new <%= humanizedSingularName %> object
      var sample<%= classifiedSingularName %> = new <%= classifiedPluralName %>({
        _id: '525a8422f6d0f87f0e407a33'
      });

      // Create new <%= humanizedPluralName %> array and include the <%= humanizedSingularName %>
      scope.<%= camelizedPluralName %> = [sample<%= classifiedSingularName %>];

      // Set expected DELETE response
      $httpBackend.expectDELETE(/api\/<%= slugifiedPluralName %>\/([0-9a-fA-F]{24})$/).respond(204);

      // Run controller functionality
      scope.remove(sample<%= classifiedSingularName %>);
      $httpBackend.flush();

      // Test array after successful delete
      expect(scope.<%= camelizedPluralName %>.length).toBe(0);
    }));
  });
}());