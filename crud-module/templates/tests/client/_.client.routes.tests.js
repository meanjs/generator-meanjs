(function () {
  'use strict';

  describe('<%= humanizedPluralName %> Route Tests', function () {
    // Initialize global variables
    var $scope,
      <%= classifiedPluralName %>Service;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _<%= classifiedPluralName %>Service_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      <%= classifiedPluralName %>Service = _<%= classifiedPluralName %>Service_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('<%= slugifiedPluralName %>');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/<%= slugifiedPluralName %>');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('View Route', function () {
        var viewstate,
          <%= classifiedPluralName %>Controller,
          mock<%= classifiedSingularName %>;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('<%= slugifiedPluralName %>.view');
          $templateCache.put('modules/<%= slugifiedPluralName %>/client/views/view-<%= slugifiedSingularName %>.client.view.html', '');

          // create mock <%= humanizedSingularName %>
          mock<%= classifiedSingularName %> = new <%= classifiedPluralName %>Service({
            _id: '525a8422f6d0f87f0e407a33',
            name: '<%= humanizedSingularName %> Name'
          });

          // Initialize Controller
          <%= classifiedPluralName %>Controller = $controller('<%= classifiedPluralName %>Controller as vm', {
            $scope: $scope,
            <%= camelizedSingularName %>Resolve: mock<%= classifiedSingularName %>
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:<%= camelizedSingularName %>Id');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.<%= camelizedSingularName %>Resolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            <%= camelizedSingularName %>Id: 1
          })).toEqual('/<%= slugifiedPluralName %>/1');
        }));

        it('should attach an <%= humanizedSingularName %> to the controller scope', function () {
          expect($scope.vm.<%= camelizedSingularName %>._id).toBe(mock<%= classifiedSingularName %>._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/<%= slugifiedPluralName %>/client/views/view-<%= slugifiedSingularName %>.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          <%= classifiedPluralName %>Controller,
          mock<%= classifiedSingularName %>;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('<%= slugifiedPluralName %>.create');
          $templateCache.put('modules/<%= slugifiedPluralName %>/client/views/form-<%= slugifiedSingularName %>.client.view.html', '');

          // create mock <%= humanizedSingularName %>
          mock<%= classifiedSingularName %> = new <%= classifiedPluralName %>Service();

          // Initialize Controller
          <%= classifiedPluralName %>Controller = $controller('<%= classifiedPluralName %>Controller as vm', {
            $scope: $scope,
            <%= camelizedSingularName %>Resolve: mock<%= classifiedSingularName %>
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.<%= camelizedSingularName %>Resolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/<%= slugifiedPluralName %>/create');
        }));

        it('should attach an <%= humanizedSingularName %> to the controller scope', function () {
          expect($scope.vm.<%= camelizedSingularName %>._id).toBe(mock<%= classifiedSingularName %>._id);
          expect($scope.vm.<%= camelizedSingularName %>._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/<%= slugifiedPluralName %>/client/views/form-<%= slugifiedSingularName %>.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          <%= classifiedPluralName %>Controller,
          mock<%= classifiedSingularName %>;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('<%= slugifiedPluralName %>.edit');
          $templateCache.put('modules/<%= slugifiedPluralName %>/client/views/form-<%= slugifiedSingularName %>.client.view.html', '');

          // create mock <%= humanizedSingularName %>
          mock<%= classifiedSingularName %> = new <%= classifiedPluralName %>Service({
            _id: '525a8422f6d0f87f0e407a33',
            name: '<%= humanizedSingularName %> Name'
          });

          // Initialize Controller
          <%= classifiedPluralName %>Controller = $controller('<%= classifiedPluralName %>Controller as vm', {
            $scope: $scope,
            <%= camelizedSingularName %>Resolve: mock<%= classifiedSingularName %>
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:<%= camelizedSingularName %>Id/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.<%= camelizedSingularName %>Resolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            <%= camelizedSingularName %>Id: 1
          })).toEqual('/<%= slugifiedPluralName %>/1/edit');
        }));

        it('should attach an <%= humanizedSingularName %> to the controller scope', function () {
          expect($scope.vm.<%= camelizedSingularName %>._id).toBe(mock<%= classifiedSingularName %>._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/<%= slugifiedPluralName %>/client/views/form-<%= camelizedSingularName %>.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
