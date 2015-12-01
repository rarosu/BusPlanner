(function () {
    "use strict";

    angular
    .module('busplanner')
    .controller('HomeController', ['$resource', 'mapLoader', function ($resource, mapLoader) {
        var vm = this;

        vm.somecontrollervariable = 'VALUE';
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
