'use strict';

/**
 * @ngdoc function
 * @name africaSmsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the africaSmsApp
 */
angular.module('africaSmsApp')
  .controller('HistoryCtrl', function ($scope, EverythingFactory) {
    EverythingFactory.getHistory().then(function (data) {
      $scope.history = data;
    });
  });
