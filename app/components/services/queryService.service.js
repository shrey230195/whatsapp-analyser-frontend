;(function() {


  'use strict';


angular.module('sachinStats')

.factory('dataFactory',["$log","$http", function($log, $http) {
  

  var dataFactory = {};

  

  dataFactory.getData = function() {

      return $http({

        method : 'GET',

        url : 'data/sachin.csv'

      });
    }
    

    return dataFactory;
  }]);



})();
