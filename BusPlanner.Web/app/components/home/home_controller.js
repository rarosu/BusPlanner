(function () {
    "use strict";

    angular
    .module('busplanner')
    .controller('HomeController', ['$resource', 'mapLoader', function ($resource, mapLoader) {
        var vm = this;

        vm.mapConfig = {
            center: { lat: 15.0, lng: 45.0 },
            zoom: 8
        };

        vm.stops = [{
                position: {
                    lat: 15.0,
                    lng: 45.0
                },
                title: 'Bus Stop 1'
            }, {
                position: {
                    lat: 15.0,
                    lng: 46.0
                },
                title: 'Bus Stop 2'
            }
        ];
    }]);
})();
