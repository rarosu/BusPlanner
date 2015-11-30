(function () {
    "use strict";

    angular
    .module('busplanner')
    .controller('HomeController', ['$resource', 'mapLoader', function ($resource, mapLoader) {
        var vm = this;

        vm.contextMenuPosition = { lat: 0, lng: 0};
        vm.contextMenuShow = function (latlng) {
            vm.contextMenuPosition = latlng;
            console.log('showing context menu');
            console.log(vm.contextMenuPosition);
        };

        vm.addStop = function () {
            console.log('add stop');
            console.log(vm.contextMenuPosition);
        };
    }]);
})();
