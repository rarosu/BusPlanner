(function () {
    "use strict";

    angular
    .module('app')
    .controller('EditStopsController', ['$resource', 'uiGmapGoogleMapApi', function ($resource, uiGmapGoogleMapApi) {
        var vm = this;

        var mapControl = {};
        var defaultLocation = { latitude: 60.4, longitude: 15.4 };
        vm.map = {
            center: defaultLocation,
            pan: true,
            zoom: 13,
            control: mapControl,
        };

        vm.stops = [];
        $resource('http://localhost:65107/api/stops').query(function (data) {
            for (var i = 0; i < data.length; i++) {
                vm.stops.push({
                    id: data[i].Id,
                    position: {
                        latitude: data[i].Latitude,
                        longitude: data[i].Longitude
                    },
                    userFriendlyName: data[i].UserFriendlyName
                });
            }

            if (mapControl.refresh != undefined) {
                mapControl.refresh();
            }
        });

        uiGmapGoogleMapApi.then(function (maps) {
            function setGeolocationCenter(location) {
                mapControl.refresh({ latitude: location.coords.latitude, longitude: location.coords.longitude });
            }

            navigator.geolocation.getCurrentPosition(setGeolocationCenter);
        });
    }]);
})();