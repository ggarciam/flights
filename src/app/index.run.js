(function() {
  'use strict';

  angular
    .module('flights2')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, $http, $httpParamSerializerJQLike) {

    $log.debug('runBlock end');

    $http.defaults.transformRequest.unshift($httpParamSerializerJQLike);
  }

})();
