(function () {
    "use strict";

    angular.module('map')
    .directive('googleMap', ['$q', 'mapLoader', 'mapIsReady', 'eventHandlerService', function ($q, mapLoader, mapIsReady, eventHandlerService) {
        return {
            restrict: 'E',
            transclude: true,
            templateUrl: 'shared/map/map_template.html',
            scope: {
                gmapElement: '@',
                containerId: '@',
                center: '=',
                zoom: '='
            },
            link: function (scope, element, attrs, controller, transcludeFn) {
                var deferred = $q.defer();

                // Put the map promise on the transcluded scope.
                var transclusionTarget = element[0].querySelector('[transclude-target]');
                transcludeFn(function (clone, transclusionScope) {
                    transclusionScope[scope.gmapElement] = deferred.promise;
                    angular.element(transclusionTarget).append(clone);
                });

                mapLoader.then(function (maps) {
                    // Create a map element.
                    var mapElement = element.children()[0];
                    var map = new google.maps.Map(mapElement, {
                        center: scope.center,
                        zoom: scope.zoom
                    });

                    // An idle event is received when the map is ready for use.
                    google.maps.event.addListenerOnce(map, 'idle', function () {
                        // Trigger a resize to make sure that new instances of the map are not rendered grey.
                        google.maps.event.trigger(map, 'resize');

                        // Create an event handler, that can register multiple callbacks to the same event.
                        var eventHandler = eventHandlerService.createEventHandler(map);

                        // The map is ready for use.
                        deferred.resolve({
                            map: map,
                            element: map,
                            eventHandler: eventHandler
                        });

                        mapIsReady.mapInitialized(map);
                        scope.$on('$destroy', function () {
                            mapIsReady.mapDestroyed();
                        });
                    });
                });
            }
        };
    }]);
})();