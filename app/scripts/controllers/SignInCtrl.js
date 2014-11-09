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
      $scope.error = '';
      EverythingFactory.signIn(user.email, user.password).then(function (data) {
        if (data._id) {
          $scope.$root.user = data;
          $location.path('/lists');
        } else {
          if (data.code === 101) {
            $scope.error = 'User not found';
          } else if (data.code === 102) {
            $scope.error = 'Wrong Password';
          } else {
            $scope.error = 'Unknown error';
          }
        }
      });
    };
  }]);
