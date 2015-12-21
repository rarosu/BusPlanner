(function () {
    "use strict";

    angular
    .module('busplanner')
    .controller('HomeController', ['unitOfWorkService', 'stopRepositoryService', 'stopService', function (unitOfWorkService, stopRepositoryService, stopService) {
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
    }]);
})();
