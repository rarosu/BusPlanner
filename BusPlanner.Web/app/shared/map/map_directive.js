(function () {
    "use strict";

    angular.module('map')
    .directive('googleMap', ['mapLoader', function (mapLoader) {
        return {
            restrict: 'E',
            transclude: true,
            templateUrl: 'shared/map/map_template.html',
            scope: {
                containerId: '@',
                center: '=',
                zoom: '='
            },
            controller: ['$q', function ($q) {
                this.deferredMap = $q.defer();
                this.mapPromise = this.deferredMap.promise;
            }],
            link: function (scope, element, attrs, controller) {
                mapLoader.then(function (maps) {
                    console.log("Maps loaded");
                    
                    var mapElement = element.children()[0];
                    var map = new google.maps.Map(mapElement, {
                        center: scope.center,
                        zoom: scope.zoom
                    });

                    google.maps.event.addListenerOnce(map, 'idle', function () {
                        google.maps.event.trigger(map, 'resize');
                        controller.deferredMap.resolve(map);
                    });
                });
            }
        };
    }]);
})();