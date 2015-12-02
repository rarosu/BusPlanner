(function () {
    "use strict";

    angular
    .module('busplanner')
    .controller('HomeController', ['$resource', 'mapLoader', function ($resource, mapLoader) {
        var vm = this;

        vm.test = 'Test string from the controller.';

        vm.mapConfig = {
            center: { lat: 15.0, lng: 45.0 },
            zoom: 8
        };

        vm.stops = [
            {
                position: {
                    lat: 15.0,
                    lng: 45.0
                },
                title: 'Bus Stop 1'
            },
            {
                position: {
                    lat: 15.0,
                    lng: 46.0
                },
                title: 'Bus Stop 2'
            }
        ];

        vm.addStop = function (position) {
            console.log('add stop');
            console.log(position);
        };

        vm.removeStop = function (stop) {
            console.log('removing stop');
            console.log(stop);
        }
    }]);
})();
