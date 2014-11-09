'use strict';

/**
 * @ngdoc function
 * @name africaSmsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the africaSmsApp
 */
angular.module('africaSmsApp')
  .controller('SignUpCtrl', ['$scope', function ($scope) {
    $scope.user = {
      email: '',
      password: ''
    };
    $scope.signUp = function (user) {
      console.log(user);
    };
  }]);
