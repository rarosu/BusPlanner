﻿(function () {
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
                console.log('marker: ' + scope.title);

                // Create a new transclusion scope and add a marker promise to it.
                var transclusionScope = scope.$new();
                var transclusionTarget = element[0].querySelector('[transclude-target]');
                transclusionScope[scope.gmapElement] = $q.defer();
                transcludeFn(transclusionScope, function (clone) {
                    angular.element(transclusionTarget).append(clone);
                });

                scope.gmapTarget.promise.then(function (gmapElement) {
                    // Create a marker.
                    var marker = new google.maps.Marker({
                        position: scope.position,
                        map: gmapElement.map,
                        title: scope.title
                    });

                    transclusionScope[scope.gmapElement].resolve({
                        map: gmapElement.map,
                        element: marker
                    });
                });
            }
        };
    }]);
})();