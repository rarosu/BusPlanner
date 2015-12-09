(function () {
    "use strict";

    angular
    .module('busplanner')
    .controller('EditStopsController', ['$scope', '$resource', 'mapLoader', 'mapIsReady', function ($scope, $resource, mapLoader, mapIsReady) {
        var vm = this;

        //////////////////////////
        // Controller variables //
        //////////////////////////

        vm.mapConfig = {
            center: {
                lat: 60.5,
                lng: 15.5
            },
            zoom: 14
        }

        vm.stops = [{
                position: {
                    lat: 60.4988799567414,
                    lng: 15.476053237915
                },
                title: 'Barbergsvägen'
            }, {
                position: {
                    lat: 60.5005273478001,
                    lng: 15.4825901985168
                },
                title: 'Borlänge Lövängsgatan'
            }
        ];

        vm.isMapReady = false;
        vm.map = null;
        vm.selectedStop = null;


        ////////////////////////
        // Controller methods //
        ////////////////////////

        vm.selectStop = function (stop) {
            vm.selectedStop = stop;
            $scope.$digest();
        };

        vm.addStopInCenter = function () {
            if (vm.isMapReady) {
                var center = vm.map.getCenter();
                var position = {
                    lat: center.lat(),
                    lng: center.lng()
                };
                vm.addStop(position);
            }
        };

        vm.addStop = function (position) {
            var stop = {
                position: angular.copy(position),
                title: 'New stop'
            };

            vm.stops.push(stop);
            vm.selectedStop = stop;
        };

        vm.removeStop = function (stop) {
            var index = vm.stops.indexOf(stop);
            if (index != -1) {
                if (vm.stops[index] == vm.selectedStop) {
                    vm.selectedStop = null;
                }

                vm.stops.splice(index, 1);
            }
        }

        mapIsReady.ready().then(function (map) {
            vm.isMapReady = true;
            vm.map = map;
        });
    }]);
})();