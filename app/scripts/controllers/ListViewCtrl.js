'use strict';

/**
 * @ngdoc function
 * @name africaSmsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the africaSmsApp
 */
angular.module('africaSmsApp')
  .controller('ListViewCtrl', ['$scope', '$routeParams', 'EverythingFactory', '$location', function ($scope, $routeParams, EverythingFactory, $location) {
    EverythingFactory.getListById($routeParams.id).then(function (data) {
      $scope.list = data;
    });
    $scope.deleteList = function () {
      if (window.confirm('Are you sure you want to delete this list? All numbers will be lost.')) {
        EverythingFactory.removeList($scope.list.id).then(function () {
          $location.path('/lists');
        });
      }
    };
    $scope.editName = function () {
      var newName = window.prompt('What is this list\'s name?', $scope.list.name);
      if (newName) {
        EverythingFactory.editList($scope.list.id, newName).then(function (data) {
          $scope.list.name = data;
        });
      }
    };
    $scope.addNumber = function (number) {
      if (number) {
        EverythingFactory.addNumberToList($scope.list.id, number).then(function (data) {
          $scope.list = data;
          $scope.number = '';
        });
      }
    };
    $scope.removeNumber = function (number) {
      if (window.confirm('Are you sure you want to delete this number?')) {
        EverythingFactory.removeNumberFromList($scope.list.id, number).then(function (data) {
          $scope.list = data;
        });
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
  }]);
