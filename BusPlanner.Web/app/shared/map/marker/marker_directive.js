(function () {
    "use strict";

    angular.module('map')
    .directive('googleMapMarker', [function () {
        return {
            restrict: 'E',
            transclude: true,
            replace: true,
            templateUrl: 'shared/map/marker/marker_template.html',
            scope: {
                position: '=',
                title: '@'
            },
            require: '^googleMap',
            link: function (scope, element, attrs, controller) {
                controller.mapPromise.then(function (map) {
                    var marker = new google.maps.Marker({
                        position: scope.position,
                        map: map,
                        title: scope.title
                    });
                });
            }
        };
    }]);
})();