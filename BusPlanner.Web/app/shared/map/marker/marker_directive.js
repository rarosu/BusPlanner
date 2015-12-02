(function () {
    "use strict";

    angular.module('map')
    .directive('googleMapMarker', ['$q', function ($q) {
        return {
            restrict: 'E',
            transclude: true,
            templateUrl: 'shared/map/marker/marker_template.html',
            scope: {
                gmapElement: '@',
                gmapTarget: '=',
                position: '=',
                title: '@'
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
                        title: scope.title
                    });

                    deferred.resolve({
                        map: gmapElement.map,
                        element: marker
                    });
                });
            }
        };
    }]);
})();