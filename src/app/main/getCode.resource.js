(function() {
    'use strict';

    angular
        .module('flights2')
        .factory('GetCodeResource', GetCodeResource);

    /** @ngInject */
    function GetCodeResource($resource) {
        return $resource ('https\://accounts.google.com/o/oauth2/v2/auth?scope=email%20profile&response_type=code&redirect_uri=http\://ggarciam.com&client_id=401701333693-84frc0jkvfd089904nqfoduue51sng8e.apps.googleusercontent.com');
    }
})();
