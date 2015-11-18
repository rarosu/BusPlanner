(function () {
    "use strict";

    angular
    .module('app')
    .controller('HomeController', ['uiGmapGoogleMapApi', function (uiGmapGoogleMapApi) {
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

        uiGmapGoogleMapApi.then(function (maps) {
            console.log(maps);
            console.log(mapControl);

            function setGeolocationCenter(location) {
                mapControl.refresh({ latitude: location.coords.latitude, longitude: location.coords.longitude });
            }

            navigator.geolocation.getCurrentPosition(setGeolocationCenter);
        });
    }]);
})();
