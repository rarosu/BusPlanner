(function () {
    "use strict";

    angular.module('map')
    .directive('googleMap', ['$q', 'mapLoader', function ($q, mapLoader) {
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
                // Create a new transclusion scope and add a map promise to it.
                var transclusionScope = scope.$new();
                var transclusionTarget = element[0].querySelector('[transclude-target]');
                transclusionScope[scope.gmapElement] = $q.defer();
                transclusionScope.vm = scope.$parent.vm;
                transcludeFn(transclusionScope, function (clone, scope) {
                    angular.element(transclusionTarget).append(clone);
                });

                console.log(transclusionScope);

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

                        // The map is ready for use.
                        transclusionScope[scope.gmapElement].resolve({
                            map: map,
                            element: map
                        });
                    });
                });
            }
        };
    }]);
})();