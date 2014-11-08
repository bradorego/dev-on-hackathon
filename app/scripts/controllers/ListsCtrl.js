'use strict';

/**
 * @ngdoc function
 * @name africaSmsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the africaSmsApp
 */
angular.module('africaSmsApp')
  .controller('ListsCtrl', function ($scope, $location) {
    $scope.lists = [{
      'id': 123,
      'name': 'Mothers',
      'numbers': [1,2,3,4],
      'lastSent': 1288323623006
    }, {
      'id': 1234,
      'name': 'West Village',
      'numbers': [1,2,3,4,5,6],
      'lastSent': 1388323623006
    }];
    $scope.goToList = function (list) {
      $location.path('/lists/' + list.id);
    };
    $scope.createList = function () {
      var name = window.prompt('What is this list\'s name?');
      if (name) {
        ///create list and navigate to it
        $scope.lists.push({
          'id': 1,
          'name': name,
          'numbers': [],
          'lastSent': null
        });
      }
    };
    $scope.isModalOpen = false;
    $scope.newMessage = function () {
      $scope.isModalOpen = true;
    };
    $scope.messageSent = function (message) {
      window.alert(message);
      $scope.isModalOpen = false;
    };
    $scope.closeModal = function () {
      $scope.isModalOpen = false;
    };
  });
