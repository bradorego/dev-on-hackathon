'use strict';

/**
 * @ngdoc function
 * @name africaSmsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the africaSmsApp
 */
angular.module('africaSmsApp')
  .controller('HistoryCtrl', ['$scope', 'EverythingFactory', function ($scope, EverythingFactory) {
    EverythingFactory.getHistory().then(function (data) {
      $scope.history = data;
    });
  }]);
