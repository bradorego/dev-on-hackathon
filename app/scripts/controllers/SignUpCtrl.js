'use strict';

/**
 * @ngdoc function
 * @name africaSmsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the africaSmsApp
 */
angular.module('africaSmsApp')
  .controller('SignUpCtrl', ['$scope', 'EverythingFactory', '$location', function ($scope, EverythingFactory, $location) {
    $scope.user = {
      email: '',
      password: ''
    };
    $scope.signUp = function (user) {
      EverythingFactory.signUp(user.email, user.password).then(function (data) {
        $scope.$root.user = data;
        $location.path('/lists');
      });
    };
  }]);
