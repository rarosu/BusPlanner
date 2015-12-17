(function () {
    "use strict";

    angular
    .module('busplanner')
    .controller('EditStopsController', ['$scope', '$resource', 'mapLoader', 'mapIsReady', 'unitOfWorkService', 'stopRepositoryService', 'stopService', function ($scope, $resource, mapLoader, mapIsReady, unitOfWorkService, stopRepositoryService, stopService) {
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

        /*
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
        */

        /*
        vm.stops = [];
        editStopsUnitOfWorkService.getStops().then(function (stops) {
            vm.stops = stops;
        }, function (error) {
            // TODO: Handle failure to load events.
        });
        */

        // Load all stops from the server.
        var unitOfWork = unitOfWorkService.create(stopRepositoryService, stopService.getUtils());
        vm.stops = unitOfWork.getEntities();
        unitOfWork.getAll().then(function (stops) {
            console.log('successfully loaded stops:');
            console.log(vm.stops);
        }, function (error) {
            console.log(error);
        });

        vm.isDirty = false;
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
            var stop = stopService.create();
            stop.position = position;

            unitOfWork.add(stop);
            console.log(unitOfWork);
            console.log(vm.stops);

            vm.isDirty = unitOfWork.isDirty();
            vm.selectedStop = stop;
        };

        vm.removeStop = function (stop) {
            var index = vm.stops.indexOf(stop);
            if (index != -1) {
                if (vm.stops[index] == vm.selectedStop) {
                    vm.selectedStop = null;
                }

                unitOfWork.remove(stop);
                vm.isDirty = unitOfWork.isDirty();
            }
        }

        mapIsReady.ready().then(function (map) {
            vm.isMapReady = true;
            vm.map = map;
        });
    }]);
})();