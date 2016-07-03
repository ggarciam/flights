(function() {
  'use strict';

  angular
    .module('flights2')
    .config(config);
//    .config(config2);

  /** @ngInject */
  function config($logProvider, toastrConfig, $httpProvider, $locationProvider, localStorageServiceProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = true;

    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    $locationProvider.html5Mode(true);

    localStorageServiceProvider.setPrefix('flights');
  }

})();
