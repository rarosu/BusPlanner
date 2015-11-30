(function () {
    "use strict";

    angular.module('map')
    .factory('mapScriptLoader', ['$q', function MapScriptLoader($q) {
        var isGoogleMapsLoaded = function () {
            return angular.isDefined(window.google) && angular.isDefined(window.google.maps);
        };

        return {
            load: function (params) {
                var deferred = $q.defer();
                if (isGoogleMapsLoaded()) {
                    deferred.resolve(window.google.maps);
                    return deferred.promise;
                }

                var callback = 'mapsOnGoogleMapsReady';
                if (window[callback] !== undefined) {
                    throw new Error("Name collision: mapsOnGoogleMapsReady is already defined.");
                }

                window[callback] = function () {
                    window.callback = undefined;
                    deferred.resolve(window.google.maps);
                };

                var url = 'https://maps.googleapis.com/maps/api/js?key=' + params.key + '&callback=' + callback;
                var script = document.createElement('script');
                script.type = 'text/javascript';
                script.src = url;
                document.body.appendChild(script);

                return deferred.promise;
            }
        };
    }]);
})();