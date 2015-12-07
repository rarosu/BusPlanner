(function () {
    "use strict";

    angular.module('map')
    .directive('gmapMarkerClick', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            require: '^googleMapMarker',
            link: function (scope, element, attrs, controller) {
                var fn = $parse(attrs['gmapMarkerClick']);
                controller.gmapElement.then(function (gmapElement) {
                    gmapElement.element.addListener('click', function (e) {
                        fn(scope, { event: e });
                    });
                });
            }
        };
    }]);
})();