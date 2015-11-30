(function () {
    "use strict";

    angular
    .module('busplanner')
    .controller('HomeController', ['$resource', 'mapLoader', function ($resource, mapLoader) {
        var vm = this;

        vm.contextMenuPosition = { lat: 0, lng: 0};
        vm.stops = [
            {
                position: {
                    lat: 15.0,
                    lng: 35.0
                },
                title: 'Bus Stop 1'
            },
            {
                position: {
                    lat: 15.0,
                    lng: 36.0
                },
                title: 'Bus Stop 2'
            }
        ];

        vm.contextMenuShow = function (latlng) {
            vm.contextMenuPosition = latlng;
            console.log('showing context menu');
            console.log(vm.contextMenuPosition);
        };

        vm.addStop = function () {
            console.log('add stop');
            console.log(vm.contextMenuPosition);
        };

        vm.removeStop = function () {

        }
    }]);
})();
