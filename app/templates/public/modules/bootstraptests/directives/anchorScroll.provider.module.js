'use strict';

/**
 * @ngdoc service
 * @name $anchorScroll
 * @kind function
 * @requires $window
 * @requires $location
 * @requires $rootScope
 *
 * @description
 * When called, it checks current value of `$location.hash()` and scrolls to the related element,
 * according to rules specified in
 * [Html5 spec](http://dev.w3.org/html5/spec/Overview.html#the-indicated-part-of-the-document).
 *
 * It also watches the `$location.hash()` and scrolls whenever it changes to match any anchor.
 * This can be disabled by calling `$anchorScrollProvider.disableAutoScrolling()`.
 *
 * @example
 <example module="anchorScrollExample">
 <file name="index.html">
 <div id="scrollArea" ng-controller="ScrollController">
 <a ng-click="gotoBottom()">Go to bottom</a>
 <a id="bottom"></a> You're at the bottom!
 </div>
 </file>
 <file name="script.js">
 angular.module('anchorScrollExample', [])
 .controller('ScrollController', ['$scope', '$location', '$anchorScroll',
 function ($scope, $location, $anchorScroll) {
             $scope.gotoBottom = function() {
               // set the location.hash to the id of
               // the element you wish to scroll to.
               $location.hash('bottom');

               // call $anchorScroll()
               $anchorScroll();
             };
           }]);
 </file>
 <file name="style.css">
 #scrollArea {
         height: 350px;
         overflow: auto;
       }

 #bottom {
         display: block;
         margin-top: 2000px;
       }
 </file>
 </example>
 */
