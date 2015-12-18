(function () {
    "use strict";

    angular
    .module('busplanner')
    .controller('EditStopsController', ['$scope', 'mapLoader', 'mapIsReady', 'unitOfWorkService', 'stopRepositoryService', 'stopService', function ($scope, mapLoader, mapIsReady, unitOfWorkService, stopRepositoryService, stopService) {
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
        };

        vm.stops = [];
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
            stop.position = angular.copy(position);
            
            unitOfWork.add(stop);
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

        vm.save = function () {
            unitOfWork.save().then(function (results) {
                for (var i = 0; i < results.length; i++) {
                    if (!results[i].fulfilled) {
                        console.log(results[i].reason);
                    }
                }

                vm.isDirty = unitOfWork.isDirty();
            });
        };

        //////////////////////
        // Controller setup //
        //////////////////////

        // Load all stops from the server.
        var unitOfWork = unitOfWorkService.create(stopRepositoryService, stopService.getUtils());
        vm.stops = unitOfWork.getEntities();
        unitOfWork.getAll().then(function (stops) {

        }, function (error) {
            // TODO: Consolidate these errors into a message displayed to the user.
            console.log(error);
        });

        // Watch for any changes in the stops.
        $scope.$watch('vm.stops', function (newValue, oldValue) {
            vm.isDirty = unitOfWork.isDirty();
        }, true);
        
        // Mark the map as ready for the UI elements.
        mapIsReady.ready().then(function (map) {
            vm.isMapReady = true;
            vm.map = map;
        });
    }]);
})();