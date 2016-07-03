(function () {
    'use strict';

    angular
        .module('flights2')
        .controller('MainController', MainController);

    /** @ngInject */
    function MainController($timeout, toastr, $injector) {
        var vm = this;

        var $log            = $injector.get("$log");
        var $http           = $injector.get("$http");
        var $window         = $injector.get("$window");
        var $routeParams    = $injector.get("$routeParams");
        var $filter         = $injector.get("$filter");
        var airportsService = $injector.get("airportsService");
        var localStorage    = $injector.get("localStorageService");

        vm.code = '';
        vm.tokenReq = {};
        vm.reqBody = {};
        vm.req = {};
        vm.reqString = '';
        vm.airports = airportsService.getAll();
        vm.origin = 'MAD';
        vm.destination = 'BER';
        vm.departure_date = new Date();
        vm.passengersNumber = 2;
        vm.passengers = [1, 2, 3, 4, 5, 6, 7];

        vm.token = localStorage.get('token');

        vm.totals = {
            passengers: vm.passengersNumber,
            flights: 0
        };

        vm.flights = {};

        vm.go = go;

        init();

        function init() {

            vm.code = $routeParams.code;

            if (!vm.code && !vm.token) {
                $window.location.href = 'https://accounts.google.com/o/oauth2/v2/auth?scope=email%20profile&response_type=code&redirect_uri=http\://localhost:3000&client_id=401701333693-84frc0jkvfd089904nqfoduue51sng8e.apps.googleusercontent.com';
            } else {
                if(!vm.token) {
                    vm.tokenReq = {
                        code: vm.code,
                        client_id: '401701333693-84frc0jkvfd089904nqfoduue51sng8e.apps.googleusercontent.com',
                        client_secret: '4cEHSfMAi9y1SrZN4OiUB54z',
                        redirect_uri: 'http://localhost:3000'
                    }

                    $http({
                        url: 'https://www.googleapis.com/oauth2/v4/token?grant_type=authorization_code',
                        method: 'POST',
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                        data: vm.tokenReq
                    })
                    .success(function (data) {

                        vm.token = data.access_token;
                        localStorage.set('token', vm.token);
                    });
                }
            }
        }

        function onlyWeekendsPredicate (date) {
            var day = date.getDay();
            return day === 0 || day === 6;
        }

        function go() {
            vm.req = {
                request: {
                    passengers: {
                        kind: 'qpxexpress#passengerCounts',
                        adultCount: vm.passengersNumber
                    },
                    slice: [
                        {
                            kind: 'qpxexpress#sliceInput',
                            origin: vm.origin.code,
                            destination: vm.destination.code,
                            date: $filter('date')(vm.departure_date,'yyyy-MM-dd')
                        }
                    ]
                }
            }

            var xhr = new XMLHttpRequest();
            xhr.open('POST', 'https://www.googleapis.com/qpxExpress/v1/trips/search?key=AIzaSyC--TkdunlR6q_w_zJmJfxD7he4rlY7LZk');
            xhr.setRequestHeader('Authorization', 'Bearer ' + vm.token);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify(vm.req));
            console.log(xhr);
            console.log(xhr.response);

            xhr.onload = function () {
                vm.flights = JSON.parse(xhr.responseText);
                console.log(vm.flights);


            }

            xhr.onerror = function () {
                console.log('There was an error!');
            };
        }
    }
})();
