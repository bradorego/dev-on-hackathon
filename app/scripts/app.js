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
      .otherwise({
        redirectTo: '/'
      });
  })
  .directive('sendModal', function () {
    var dir = {};
    dir.templateUrl = 'views/_send_modal.html';
    dir.restrict = 'EA';
    dir.scope = {
      list: '=',
      messageSent: '&onMessageSent',
      closeModal: '&'
    };
    dir.controller = function ($scope) {
      $scope.message = {
        'list': '',
        'text': ''
      };
      $scope.lists = [{
        'name': 'Mothers',
        'id': '123'
      }, {
        'name': 'West Village',
        'id': '654'
      }];
    };

    return dir;
  })
  .factory('EverythingFactory', function ($http, $q) {
    var EverythingFactory = {};
    console.log($http, $q);
    return EverythingFactory;
  });
