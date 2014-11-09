'use strict';

/**
 * @ngdoc overview
 * @name africaSmsApp
 * @description
 * # africaSmsApp
 *
 * Main module of the application.
 */
angular
  .module('africaSmsApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/signIn', {
        templateUrl: 'views/signIn.html',
        controller: 'SignInCtrl'
      })
      .when('/signUp', {
        templateUrl: 'views/signUp.html',
        controller: 'SignUpCtrl'
      })
      .when('/lists', {
        templateUrl: 'views/lists.html',
        controller: 'ListsCtrl'
      })
      .when('/lists/:id', {
        templateUrl: 'views/listView.html',
        controller: 'ListViewCtrl'
      })
      .when('/history', {
        templateUrl: 'views/history.html',
        controller: 'HistoryCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }])
  .run(['$location', 'EverythingFactory', '$rootScope', function ($location, EverythingFactory, $rootScope) {
    if (!EverythingFactory.getUser()._id) {
      $location.path('/signIn');
    }
    $rootScope.signOut = function () {
      window.location.reload();
    };
  }])
  .directive('phoneNumber', function () {
    return {
      require: 'ngModel',
      link: function (scope, elm, attrs, ctrl) {
        ctrl.$validators.phone = function (modelValue, viewValue) {
          if (ctrl.$isEmpty(modelValue)) {
            // consider empty models to be valid
            return true;
          }
          viewValue = viewValue.replace(/\D/g, '');
          if (viewValue.length === 10 || (viewValue.length === 11 && viewValue.charAt(0) === '1')) {
            return true;
          }
          // it is invalid
          return false;
        };
      }
    };
  });
