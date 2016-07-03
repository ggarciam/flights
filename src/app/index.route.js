(function() {
  'use strict';

  angular
    .module('flights2')
    .config(routeConfig);

  function routeConfig($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .when('/flights', {
        templateUrl: 'app/flights/flights.html',
        controller: 'FlightsController',
        controllerAs: 'flights'
      })
      .otherwise({
        redirectTo: '/'
      });
  }

})();
