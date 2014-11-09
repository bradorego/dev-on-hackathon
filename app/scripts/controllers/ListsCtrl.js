'use strict';

/**
 * @ngdoc function
 * @name africaSmsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the africaSmsApp
 */
angular.module('africaSmsApp')
  .controller('ListsCtrl', ['$scope', '$location', 'EverythingFactory', function ($scope, $location, EverythingFactory) {
    EverythingFactory.getLists().then(function (data) {
      $scope.lists = data;
    });
    $scope.goToList = function (list) {
      $location.path('/lists/' + list.id);
    };
    $scope.createList = function () {
      var name = window.prompt('What is this list\'s name?');
      if (name) {
        ///create list and navigate to it
        EverythingFactory.addList(name).then(function (data) {
          $scope.lists = data.distributionLists;
        });
      }
    };
    $scope.isModalOpen = false;
    $scope.newMessage = function () {
      $scope.isModalOpen = true;
    };
    $scope.messageSent = function (message) {
      if (message.text) {
        EverythingFactory.sendMessage(message.list, message.text).then(function (data) {
          console.log(data);
          $scope.isModalOpen = false;
        });
      }
    };
    $scope.closeModal = function () {
      $scope.isModalOpen = false;
    };
  }]);
