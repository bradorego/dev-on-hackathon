'use strict';

angular.module('africaSmsApp').directive('sendModal', function () {
  var dir = {};
  dir.templateUrl = '/views/_send_modal.html';
  dir.restrict = 'EA';
  dir.scope = {
    lists: '=',
    messageSent: '&onMessageSent',
    closeModal: '&'
  };
  dir.controller = function ($scope) {
    $scope.message = {
      'list': '',
      'text': ''
    };
  };

  return dir;
});
