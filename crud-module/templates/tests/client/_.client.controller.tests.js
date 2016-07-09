(function () {
  'use strict';

  describe('<%= humanizedPluralName %> Controller Tests', function () {
    // Initialize global variables
    var <%= classifiedPluralName %>Controller,
      $scope,
      $httpBackend,
      $state,
      Authentication,
      <%= classifiedPluralName %>Service,
      mock<%= classifiedSingularName %>;

    // The $resource service augments the response object with methods for updating and deleting the resource.
    // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
    // the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
    // When the toEqualData matcher compares two objects, it takes only object properties into
    // account and ignores methods.
    beforeEach(function () {
      jasmine.addMatchers({
        toEqualData: function (util, customEqualityTesters) {
          return {
            compare: function (actual, expected) {
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
    beforeEach(inject(function ($controller, $rootScope, _$state_, _$httpBackend_, _Authentication_, _<%= classifiedPluralName %>Service_) {
      // Set a new global scope
      $scope = $rootScope.$new();

      // Point global variables to injected services
      $httpBackend = _$httpBackend_;
      $state = _$state_;
      Authentication = _Authentication_;
      <%= classifiedPluralName %>Service = _<%= classifiedPluralName %>Service_;

      // create mock <%= humanizedSingularName %>
      mock<%= classifiedSingularName %> = new <%= classifiedPluralName %>Service({
        _id: '525a8422f6d0f87f0e407a33',
        name: '<%= humanizedSingularName %> Name'
      });

      // Mock logged in user
      Authentication.user = {
        roles: ['user']
      };

      // Initialize the <%= humanizedPluralName %> controller.
      <%= classifiedPluralName %>Controller = $controller('<%= humanizedPluralName %>Controller as vm', {
        $scope: $scope,
        <%= camelizedSingularName %>Resolve: {}
      });

      // Spy on state go
      spyOn($state, 'go');
    }));

    describe('vm.save() as create', function () {
      var sample<%= classifiedSingularName %>PostData;

      beforeEach(function () {
        // Create a sample <%= humanizedSingularName %> object
        sample<%= classifiedSingularName %>PostData = new <%= classifiedPluralName %>Service({
          name: '<%= humanizedSingularName %> Name'
        });

        $scope.vm.<%= camelizedSingularName %> = sample<%= classifiedSingularName %>PostData;
      });

      it('should send a POST request with the form input values and then locate to new object URL', inject(function (<%= classifiedPluralName %>Service) {
        // Set POST response
        $httpBackend.expectPOST('api/<%= slugifiedPluralName %>', sample<%= classifiedSingularName %>PostData).respond(mock<%= classifiedSingularName %>);

        // Run controller functionality
        $scope.vm.save(true);
        $httpBackend.flush();

        // Test URL redirection after the <%= humanizedSingularName %> was created
        expect($state.go).toHaveBeenCalledWith('<%= slugifiedPluralName %>.view', {
          <%= camelizedSingularName %>Id: mock<%= classifiedSingularName %>._id
        });
      }));

      it('should set $scope.vm.error if error', function () {
        var errorMessage = 'this is an error message';
        $httpBackend.expectPOST('api/<%= slugifiedPluralName %>', sample<%= classifiedSingularName %>PostData).respond(400, {
          message: errorMessage
        });

        $scope.vm.save(true);
        $httpBackend.flush();

        expect($scope.vm.error).toBe(errorMessage);
      });
    });

    describe('vm.save() as update', function () {
      beforeEach(function () {
        // Mock <%= humanizedSingularName %> in $scope
        $scope.vm.<%= camelizedSingularName %> = mock<%= classifiedSingularName %>;
      });

      it('should update a valid <%= humanizedSingularName %>', inject(function (<%= classifiedPluralName %>Service) {
        // Set PUT response
        $httpBackend.expectPUT(/api\/<%= slugifiedPluralName %>\/([0-9a-fA-F]{24})$/).respond();

        // Run controller functionality
        $scope.vm.save(true);
        $httpBackend.flush();

        // Test URL location to new object
        expect($state.go).toHaveBeenCalledWith('<%= slugifiedPluralName %>.view', {
          <%= camelizedSingularName %>Id: mock<%= classifiedSingularName %>._id
        });
      }));

      it('should set $scope.vm.error if error', inject(function (<%= classifiedPluralName %>Service) {
        var errorMessage = 'error';
        $httpBackend.expectPUT(/api\/<%= slugifiedPluralName %>\/([0-9a-fA-F]{24})$/).respond(400, {
          message: errorMessage
        });

        $scope.vm.save(true);
        $httpBackend.flush();

        expect($scope.vm.error).toBe(errorMessage);
      }));
    });

    describe('vm.remove()', function () {
      beforeEach(function () {
        // Setup <%= humanizedPluralName %>
        $scope.vm.<%= camelizedSingularName %> = mock<%= classifiedSingularName %>;
      });

      it('should delete the <%= humanizedSingularName %> and redirect to <%= humanizedPluralName %>', function () {
        // Return true on confirm message
        spyOn(window, 'confirm').and.returnValue(true);

        $httpBackend.expectDELETE(/api\/<%= slugifiedPluralName %>\/([0-9a-fA-F]{24})$/).respond(204);

        $scope.vm.remove();
        $httpBackend.flush();

        expect($state.go).toHaveBeenCalledWith('<%= slugifiedPluralName %>.list');
      });

      it('should should not delete the <%= humanizedSingularName %> and not redirect', function () {
        // Return false on confirm message
        spyOn(window, 'confirm').and.returnValue(false);

        $scope.vm.remove();

        expect($state.go).not.toHaveBeenCalled();
      });
    });
  });
}());
