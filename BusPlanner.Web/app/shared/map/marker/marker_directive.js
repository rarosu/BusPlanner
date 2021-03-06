﻿(function () {
    "use strict";

    angular.module('map')
    .directive('googleMapMarker', ['$q', '$rootScope', 'eventHandlerService', function ($q, $rootScope, eventHandlerService) {
        return {
            restrict: 'E',
            transclude: true,
            templateUrl: 'shared/map/marker/marker_template.html',
            scope: {
                gmapElement: '@',
                gmapTarget: '=',
                position: '=',
                title: '@',
                draggable: '='
            },
            controller: function() {
                
            },
            link: function (scope, element, attrs, controller, transcludeFn) {
                var deferred = $q.defer();

                // Put the marker promise on the transcluded scope.
                var transclusionTarget = element[0].querySelector('[transclude-target]');
                transcludeFn(function (clone, transclusionScope) {
                    transclusionScope[scope.gmapElement] = deferred.promise;
                    angular.element(transclusionTarget).append(clone);
                });

                // Put a promise on the controller, to be used by attributes.
                controller.gmapElement = deferred.promise;

                scope.gmapTarget.then(function (gmapElement) {
                    // Create a marker.
                    var marker = new google.maps.Marker({
                        position: scope.position,
                        map: gmapElement.map,
                        title: scope.title,
                        draggable: scope.draggable || false
                    });

                    // Watch for changes in position.
                    scope.$watch('position', function (newValue, oldValue) {
                        marker.setPosition(newValue);
                    }, true);

                    // Watch for drag events on the marker.
                    if (scope.draggable) {
                        marker.addListener('dragend', function () {
                            scope.position.lat = marker.position.lat();
                            scope.position.lng = marker.position.lng();
                            $rootScope.$digest();
                        });
                    }

                    // Watch for changes in title.
                    scope.$watch('title', function (newValue, oldValue) {
                        marker.setTitle(newValue);
                    });

                    // Create an event handler, that can register multiple callbacks to the same event.
                    var eventHandler = eventHandlerService.createEventHandler(marker);

                    // The marker is ready for use.
                    deferred.resolve({
                        map: gmapElement.map,
                        element: marker,
                        eventHandler: eventHandler
                    });

                    scope.$on('$destroy', function () {
                        marker.setMap(null);
                    });
                });
            }
        };
    }]);
})();