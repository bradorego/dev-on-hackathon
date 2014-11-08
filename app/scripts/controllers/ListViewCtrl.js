'use strict';

/**
 * @ngdoc function
 * @name africaSmsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the africaSmsApp
 */
angular.module('africaSmsApp')
  .controller('ListViewCtrl', function ($scope) {
    $scope.list = {
      'id': 123,
      'name': 'Mothers',
      'numbers': [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
      'lastSent': 1288323623006
    };
    $scope.editName = function () {
      var newName = window.prompt('What is this list\'s name?', $scope.list.name);
      if (newName) {
        $scope.list.name = newName;
      }
    };
    $scope.addNumber = function (number) {
      $scope.list.numbers.push(number);
    };
    $scope.removeNumber = function (number) {
      if (window.confirm('Are you sure you want to delete this number?')) {
        var i = 0;
        for (i = 0; i < $scope.list.numbers.length; i++) {
          if ($scope.list.numbers[i] === number) {
            $scope.list.numbers.splice(i, 1);
          }
        }
      }
    };
    $scope.isModalOpen = false;
    $scope.showModal = function () {
      $scope.isModalOpen = true;
    };
    $scope.closeModal = function () {
      $scope.isModalOpen = false;
    };
    $scope.messageSent = function (message) {
      window.alert(message);
      $scope.isModalOpen = false;
    };
  });
