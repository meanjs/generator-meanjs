'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
  // Init module configuration options
  var applicationModuleName = '<%= slugifiedAppName %>';
  var applicationModuleVendorDependencies = ['ngResource',<% if (angularCookies) { %> 'ngCookies', <% } if (angularAnimate) { %> 'ngAnimate', <% } if (angularTouch) { %> 'ngTouch', <% } if (angularSanitize) { %> 'ngSanitize', <% } %> 'ui.router', 'ui.bootstrap', 'ui.utils'];

  // Add a new vertical module
  var registerModule = function(moduleName, dependencies) {
    // Create angular module
    angular.module(moduleName, dependencies || []);

    // Add the module to the AngularJS configuration file
    angular.module(applicationModuleName).requires.push(moduleName);
  };

  return {
    applicationModuleName: applicationModuleName,
    applicationModuleVendorDependencies: applicationModuleVendorDependencies,
    registerModule: registerModule
  };
})();