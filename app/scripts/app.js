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
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/signIn', {
        templateUrl: 'views/signIn.html',
        controller: 'SignInCtrl'
      })
      .when('/lists', {
        templateUrl: 'views/lists.html',
        controller: 'ListsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
