'use strict';
angular.module('africaSmsApp')
  .factory('EverythingFactory', ['$http', '$q', function ($http, $q) {
    var EverythingFactory = {},
      currUser = {},
      urlRoot = '/';
    EverythingFactory.signIn = function (email, password) {
      var d = $q.defer();
      $http.post(urlRoot + 'signIn', {
        'email': email,
        'password': password
      }).success(function (data) {
        EverythingFactory.setUser(data);
        d.resolve(data);
      }).error(function (data) {
        d.reject(data);
      });
      return d.promise;
    };
    EverythingFactory.setUser = function (user) {
      currUser = user;
      return currUser;
    };
    EverythingFactory.getUser = function () {
      return currUser;
    };
    EverythingFactory.addList = function (name) {
      var deferred = $q.defer();
      $http.post(urlRoot + 'users/' + currUser._id + '/lists', {
        'name': name
      }).success(function (data) {
        currUser = data;
        deferred.resolve(data);
      }).error(function (data) {
        deferred.reject(data);
      });
      return deferred.promise;
    };
    EverythingFactory.editList = function (id, name) {
      var deferred = $q.defer();
      $http.put(urlRoot + 'users/' + currUser._id + '/lists/' + id, {
        'name': name
      }).success(function (data) {
        deferred.resolve(data);
      }).error(function (data) {
        deferred.reject(data);
      });
      return deferred.promise;
    };
    EverythingFactory.removeList = function (id) {
      var deferred = $q.defer();
      $http.delete(urlRoot + 'users/' + currUser._id + '/lists/' + id)
        .success(function (data) {
          deferred.resolve(data);
        }).error(function (data) {
          deferred.reject(data);
        });
      return deferred.promise;
    };
    EverythingFactory.addNumberToList = function (id, number) {
      var deferred = $q.defer();
      $http.post(urlRoot + 'users/' + currUser._id + '/lists/' + id + '/' + number)
        .success(function (data) {
          deferred.resolve(data);
        }).error(function (data) {
          deferred.reject(data);
        });
      return deferred.promise;
    };
    EverythingFactory.removeNumberFromList = function (id, number) {
      var deferred = $q.defer();
      $http.delete(urlRoot + 'users/' + currUser._id + '/lists/' + id + '/' + number)
        .success(function (data) {
          deferred.resolve(data);
        }).error(function (data) {
          deferred.reject(data);
        });
      return deferred.promise;
    };
    EverythingFactory.getLists = function () {
      var d = $q.defer();
      $http.get(urlRoot + 'users/' + currUser._id + '/lists')
        .success(function (data) {
          d.resolve(data);
        })
        .error(function (data) {
          d.reject(data);
        });
      return d.promise;
    };
    EverythingFactory.getListById = function (id) {
      var d = $q.defer();
      $http.get(urlRoot + 'users/' + currUser._id + '/lists/' + id)
        .success(function (data) {
          d.resolve(data);
        })
        .error(function (data) {
          d.reject(data);
        });
      return d.promise;
    };
    EverythingFactory.getHistory = function () {
      var d = $q.defer();
      $http.get(urlRoot + 'users/' + currUser._id + '/history')
        .success(function (data) {
          d.resolve(data);
        })
        .error(function (data) {
          d.reject(data);
        });
      return d.promise;
    };
    EverythingFactory.sendMessage = function (list, message) {
      var d = $q.defer();
      $http.post(urlRoot + 'sendMessage', {
        'list': list,
        'userId': currUser._id,
        'message': message
      })
        .success(function (data) {
          d.resolve(data);
        })
        .error(function (data) {
          d.reject(data);
        });
      return d.promise;
    };
    return EverythingFactory;
  }]);
