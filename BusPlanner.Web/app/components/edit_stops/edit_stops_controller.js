(function () {
    "use strict";

    angular
    .module('busplanner')
    .controller('EditStopsController', ['$resource', 'mapLoader', function ($resource, mapLoader) {
        var vm = this;

        vm.mapConfig = {
            center: {
                lat: 15.0,
                lng: 45.0
            },
            zoom: 8
        }

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

        vm.addStop = function (position) {
            vm.stops.push({
                position: angular.copy(position),
                title: 'New stop'
            });
        };

        vm.removeStop = function (stop) {
            var index = vm.stops.indexOf(stop);
            if (index != -1) {
                vm.stops.splice(index, 1);
            }
        }
    }]);
})();