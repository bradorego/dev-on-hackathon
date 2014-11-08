'use strict';

/**
 * @ngdoc function
 * @name africaSmsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the africaSmsApp
 */
angular.module('africaSmsApp')
  .controller('SignInCtrl', function ($scope) {
    $scope.user = {
      email: '',
      password: ''
    };
    $scope.signIn = function (user) {
      console.log(user);
    };
  });
