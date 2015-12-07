(function () {
    "use strict";

    angular.module('map')
    .directive('googleMapMarker', ['$q', '$rootScope', function ($q, $rootScope) {
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
            link: function (scope, element, attrs, controller, transcludeFn) {
                var deferred = $q.defer();

                // Put the marker promise on the transcluded scope.
                var transclusionTarget = element[0].querySelector('[transclude-target]');
                transcludeFn(function (clone, transclusionScope) {
                    transclusionScope[scope.gmapElement] = deferred.promise;
                    angular.element(transclusionTarget).append(clone);
                });

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

                    // TODO: Change title to a two-way binding, to allow updating the title as well?
                    //scope.$watch(scope.title, function (newValue, oldValue) {  
                    //});

                    // The marker is ready for use.
                    deferred.resolve({
                        map: gmapElement.map,
                        element: marker
                    });

                    scope.$on('$destroy', function () {
                        marker.setMap(null);
                    });
                });
            }
        };
    }]);
})();