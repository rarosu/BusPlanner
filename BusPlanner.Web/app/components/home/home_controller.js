(function () {
    "use strict";

    angular
    .module('busplanner')
    .controller('HomeController', ['$resource', 'mapLoader', function ($resource, mapLoader) {
        var vm = this;

        vm.addStop = function (latlng) {
            console.log('add stop');
            console.log(latlng);
        };
    }]);
})();
