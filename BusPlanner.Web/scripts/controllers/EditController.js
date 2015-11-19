(function () {
    "use strict";

    angular
    .module('app')
    .controller('EditController', ['$resource', 'uiGmapGoogleMapApi', function ($resource, uiGmapGoogleMapApi) {
        var vm = this;

        var mapControl = {};
        var defaultLocation = { latitude: 60.4, longitude: 15.4 };
        vm.map = {
            center: defaultLocation,
            pan: true,
            zoom: 13,
            refresh: false,
            control: mapControl,
            events: {},
            bounds: {}
        };

        vm.stops = [];
        $resource('http://localhost:65107/api/stops').query(function (data) {
            console.log(data);
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

            console.log(vm.stops);
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