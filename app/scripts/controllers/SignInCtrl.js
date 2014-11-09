'use strict';

/**
 * @ngdoc function
 * @name africaSmsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the africaSmsApp
 */
angular.module('africaSmsApp')
  .controller('SignInCtrl', ['$scope', '$location', 'EverythingFactory', function ($scope, $location, EverythingFactory) {
    $scope.user = {
      email: 'me@bradorego.com',
      password: 'TestWord'
    };
    $scope.signIn = function (user) {
      EverythingFactory.signIn(user.email, user.password).then(function (data) {
        console.log(data);
        $location.path('/lists');
      });
    };
  }]);
