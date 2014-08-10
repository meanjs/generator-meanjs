'use strict';

(function() {
	// Bootstraptests Controller Spec
	describe('Bootstraptests Controller Tests', function() {
		// Initialize global variables
		var BootstraptestsController,
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

			// Initialize the Bootstraptests controller.
			BootstraptestsController = $controller('BootstraptestsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Bootstraptest object fetched from XHR', inject(function(Bootstraptests) {
			// Create sample Bootstraptest using the Bootstraptests service
			var sampleBootstraptest = new Bootstraptests({
				name: 'New Bootstraptest'
			});

			// Create a sample Bootstraptests array that includes the new Bootstraptest
			var sampleBootstraptests = [sampleBootstraptest];

			// Set GET response
			$httpBackend.expectGET('bootstraptests').respond(sampleBootstraptests);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.bootstraptests).toEqualData(sampleBootstraptests);
		}));

		it('$scope.findOne() should create an array with one Bootstraptest object fetched from XHR using a bootstraptestId URL parameter', inject(function(Bootstraptests) {
			// Define a sample Bootstraptest object
			var sampleBootstraptest = new Bootstraptests({
				name: 'New Bootstraptest'
			});

			// Set the URL parameter
			$stateParams.bootstraptestId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/bootstraptests\/([0-9a-fA-F]{24})$/).respond(sampleBootstraptest);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.bootstraptest).toEqualData(sampleBootstraptest);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Bootstraptests) {
			// Create a sample Bootstraptest object
			var sampleBootstraptestPostData = new Bootstraptests({
				name: 'New Bootstraptest'
			});

			// Create a sample Bootstraptest response
			var sampleBootstraptestResponse = new Bootstraptests({
				_id: '525cf20451979dea2c000001',
				name: 'New Bootstraptest'
			});

			// Fixture mock form input values
			scope.name = 'New Bootstraptest';

			// Set POST response
			$httpBackend.expectPOST('bootstraptests', sampleBootstraptestPostData).respond(sampleBootstraptestResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Bootstraptest was created
			expect($location.path()).toBe('/bootstraptests/' + sampleBootstraptestResponse._id);
		}));

		it('$scope.update() should update a valid Bootstraptest', inject(function(Bootstraptests) {
			// Define a sample Bootstraptest put data
			var sampleBootstraptestPutData = new Bootstraptests({
				_id: '525cf20451979dea2c000001',
				name: 'New Bootstraptest'
			});

			// Mock Bootstraptest in scope
			scope.bootstraptest = sampleBootstraptestPutData;

			// Set PUT response
			$httpBackend.expectPUT(/bootstraptests\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/bootstraptests/' + sampleBootstraptestPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid bootstraptestId and remove the Bootstraptest from the scope', inject(function(Bootstraptests) {
			// Create new Bootstraptest object
			var sampleBootstraptest = new Bootstraptests({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Bootstraptests array and include the Bootstraptest
			scope.bootstraptests = [sampleBootstraptest];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/bootstraptests\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleBootstraptest);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.bootstraptests.length).toBe(0);
		}));
	});
}());